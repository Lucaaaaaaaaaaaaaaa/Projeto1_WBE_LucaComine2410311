// src/BaseModel.js
import connectDB from './database.js';
import { logError } from './logger.js';
import { ObjectId } from 'mongodb';

class BaseModel {
    // Construtor
    constructor(collectionName) {
        if (!collectionName) {
            throw new Error("O nome da coleção é obrigatório.");
        }
        this.collectionName = collectionName;
    }

    // Obtém a coleção
    async getCollection() {
        const db = await connectDB();
        this.collection = db.collection(this.collectionName);
    }

    // Insere ou atualiza
    async save() {
        try {
            await this.getCollection();
            const data = { ...this };
            delete data.collection; // Remove propriedades internas
            delete data.collectionName;

            if (this._id) {
                // Atualiza
                const id = new ObjectId(this._id);
                delete data._id;
                const result = await this.collection.updateOne({ _id: id }, { $set: data });
                return result;
            } else {
                // Insere
                const result = await this.collection.insertOne(data);
                this._id = result.insertedId; // Atribui o novo ID ao objeto
                return result;
            }
        } catch (error) {
            await logError(error);
            throw new Error(`Erro ao salvar no banco de dados: ${error.message}`);
        }
    }

    // Obtém a coleção (estático)
    static async _getCollection() {
        const db = await connectDB();
        if (!this.collectionName) {
            throw new Error("A classe modelo precisa definir a propriedade estática 'collectionName'.");
        }
        return db.collection(this.collectionName);
    }

    // Executor de operações
    static async _executeDbOperation(operation, errorMessage) {
        try {
            const collection = await this._getCollection();
            return await operation(collection);
        } catch (error) {
            await logError(error);
            throw new Error(`${errorMessage}: ${error.message}`);
        }
    }

    // Busca por ID
    static async findById(id) {
        return this._executeDbOperation(
            (collection) => collection.findOne({ _id: new ObjectId(id) }),
            'Erro ao buscar por ID'
        );
    }

    // Busca todos
    static async findAll(query = {}) {
        return this._executeDbOperation(
            (collection) => collection.find(query).toArray(),
            'Erro ao buscar documentos'
        );
    }

    // Deleta por ID
    static async delete(id) {
        return this._executeDbOperation(
            (collection) => collection.deleteOne({ _id: new ObjectId(id) }),
            'Erro ao deletar documento'
        );
    }
}

export default BaseModel;
