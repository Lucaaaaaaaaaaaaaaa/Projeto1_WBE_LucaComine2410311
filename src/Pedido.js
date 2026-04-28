// src/Pedido.js
import BaseModel from './BaseModel.js';
import { ObjectId } from 'mongodb';

class Pedido extends BaseModel {
    static collectionName = 'pedidos';

    // Construtor
    constructor({ usuarioId, produtos, status, total }) {
        super('pedidos');

        if (!usuarioId || !produtos || !Array.isArray(produtos) || produtos.length === 0) {
            throw new Error("Campos 'usuarioId' e 'produtos' (uma lista não vazia) são obrigatórios.");
        }

        this.usuarioId = new ObjectId(usuarioId);
        this.produtos = produtos.map(p => ({
            produtoId: new ObjectId(p.produtoId),
            quantidade: p.quantidade,
            precoUnitario: p.precoUnitario
        }));
        this.status = status || 'pendente';
        this.total = total;
        this.dataPedido = new Date();
    }
}

export default Pedido;