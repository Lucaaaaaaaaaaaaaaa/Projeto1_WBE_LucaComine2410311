// src/config/database.js
import { MongoClient } from 'mongodb';

const uri = "mongodb://127.0.0.1:27017"; // URI de conexão local
const client = new MongoClient(uri);

let db;

async function connectDB() {
    if (db) return db;
    try {
        await client.connect();
        db = client.db('ecommerce_db');
        console.log("Conectado ao MongoDB com sucesso!");
        return db;
    } catch (error) {
        console.error("Não foi possível conectar ao MongoDB.", error);
        process.exit(1); 
    }
}

export async function closeDB() {
    return client.close();
}

export default connectDB;
