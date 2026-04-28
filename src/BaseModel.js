// src/BaseModel.js
import connectDB from './database.js';
import { logError } from './logger.js';
import { ObjectId } from 'mongodb';

class BaseModel {
    constructor(collectionName) {
        if (!collectionName) {
            throw new Error("O nome da coleção é obrigatório.");
        }
        this.collectionName = collectionName;
        this.getCollection();
    }

    async getCollection() {
        const db = await connectDB();
        this.collection = db.collection(this.collectionName);
    }

    // Insert ou Update
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

    // Find by ID
    static async findById(id) {
        try {
            const db = await connectDB();
            const collection = db.collection(this.collectionName);
            const result = await collection.findOne({ _id: new ObjectId(id) });
            return result;
        } catch (error) {
            await logError(error);
            throw new Error(`Erro ao buscar por ID: ${error.message}`);
        }
    }

    // Find
    static async findAll(query = {}) {
        try {
            const db = await connectDB();
            const collection = db.collection(this.collectionName);
            const results = await collection.find(query).toArray();
            return results;
        } catch (error) {
            await logError(error);
            throw new Error(`Erro ao buscar documentos: ${error.message}`);
        }
    }

    // Delete
    static async delete(id) {
        try {
            const db = await connectDB();
            const collection = db.collection(this.collectionName);
            const result = await collection.deleteOne({ _id: new ObjectId(id) });
            return result;
        } catch (error) {
            await logError(error);
            throw new Error(`Erro ao deletar documento: ${error.message}`);
        }
    }
}

export default BaseModel;
