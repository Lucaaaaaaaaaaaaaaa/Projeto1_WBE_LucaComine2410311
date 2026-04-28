// src/Produto.js
import BaseModel from './BaseModel.js';

class Produto extends BaseModel {
    static collectionName = 'produtos';

    // Construtor
    constructor({ nome, preco, descricao, estoque, categoria }) {
        super('produtos'); // Passa o nome da coleção para a classe pai

        if (!nome || !preco) {
            throw new Error("Campos 'nome' e 'preco' são obrigatórios.");
        }

        this.nome = nome;
        this.preco = parseFloat(preco);
        this.descricao = descricao;
        this.estoque = parseInt(estoque, 10) || 0;
        this.categoria = categoria;
        this.criadoEm = new Date();
    }
}

export default Produto;
