// src/lib/logger.js
import fs from 'fs/promises';
import path from 'path';

const logFilePath = path.join(process.cwd(), 'logs', 'errors.log');

async function logError(error) {
    const timestamp = new Date().toISOString();
    const errorMessage = `${timestamp} - ERRO: ${error.stack || error}\n\n`;

    try {
        await fs.appendFile(logFilePath, errorMessage);
    } catch (writeError) {
        console.error("Falha crítica ao tentar escrever no arquivo de log:", writeError);
        console.error("Erro original:", errorMessage);
    }
}

export { logError };
