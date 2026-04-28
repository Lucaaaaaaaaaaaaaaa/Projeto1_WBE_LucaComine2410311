// index.js
import Produto from './src/Produto.js';
import Usuario from './src/Usuario.js';
import Pedido from './src/Pedido.js';
import { closeDB } from './src/database.js';

// Função principal
async function main() {
    console.log("Iniciando aplicação de exemplo...");

    let novoUsuario, novoProduto, novoPedido;

    try {
        // Cria usuário
        console.log("\n1. Criando um novo usuário...");
        novoUsuario = new Usuario({
            nome: "Cliente Teste",
            email: "cliente@teste.com",
            senha: "senhaSegura123"
        });
        await novoUsuario.save();
        console.log("Usuário salvo com sucesso! ID:", novoUsuario._id);

        // Cria produto
        console.log("\n2. Criando um novo produto...");
        novoProduto = new Produto({
            nome: "Notebook Super Potente",
            preco: "4999.90",
            estoque: "15",
            categoria: "Eletrônicos"
        });
        await novoProduto.save();
        console.log("Produto salvo com sucesso! ID:", novoProduto._id);

        // Cria pedido
        console.log("\n3. Criando um novo pedido...");
        novoPedido = new Pedido({
            usuarioId: novoUsuario._id,
            produtos: [
                {
                    produtoId: novoProduto._id,
                    quantidade: 1,
                    precoUnitario: novoProduto.preco
                }
            ],
            total: novoProduto.preco
        });
        await novoPedido.save();
        console.log("Pedido salvo com sucesso! ID:", novoPedido._id);

        // Busca dados
        console.log("\n4. Verificando dados salvos...");
        const usuarioSalvo = await Usuario.findById(novoUsuario._id);
        const pedidoSalvo = await Pedido.findById(novoPedido._id);
        console.log("Usuário encontrado:", usuarioSalvo.nome);
        console.log("Status do Pedido encontrado:", pedidoSalvo.status);

    } catch (error) {
        console.error("\n--- OCORREU UM ERRO NA APLICAÇÃO ---");
        console.error(error.message);
        process.exit(1); // Sair com código de erro
    } finally {
        // Limpa dados
        console.log("\nLimpando dados de teste...");
        if (novoUsuario) await Usuario.delete(novoUsuario._id);
        if (novoProduto) await Produto.delete(novoProduto._id);
        if (novoPedido) await Pedido.delete(novoPedido._id);

        await closeDB();
        console.log("\nConexão com o banco de dados fechada.");
        process.exit(0); // Sair com sucesso
    }
}

main();
