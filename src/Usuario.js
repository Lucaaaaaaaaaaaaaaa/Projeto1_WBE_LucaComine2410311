// src/Usuario.js
import BaseModel from './BaseModel.js';

class Usuario extends BaseModel {
    static collectionName = 'usuarios';

    // Construtor
    constructor({ nome, email, senha, endereco }) {
        super('usuarios'); 

        if (!nome || !email || !senha) {
            throw new Error("Campos 'nome', 'email' e 'senha' são obrigatórios.");
        }

        this.nome = nome;
        this.email = email;
        this.senha = senha; 
        this.endereco = endereco;
        this.criadoEm = new Date();
    }
}

export default Usuario;