# Projeto 1: Biblioteca de Acesso a Banco de Dados em Node.js

Este é o meu projeto para a disciplina de Desenvolvimento Web Back End. O objetivo foi construir uma pequena biblioteca (um conjunto de classes) para gerenciar a persistência de dados em um banco de dados, utilizando Node.js.

**Autor:** Luca Comine
**RA:** 2410311

A temática que escolhi para desenvolver o projeto foi a de um **E-commerce**, implementando as entidades principais: `Usuario`, `Produto` e `Pedido`. Fiz o projeto sozinho, aplicando os conceitos vistos em aula.

## Conceito do Projeto

A biblioteca foi construída sobre uma ideia similar ao padrão **Active Record**, onde as próprias classes de modelo (`Produto`, `Usuario`, etc.) são responsáveis por suas operações de banco de dados (criar, ler, atualizar e deletar - CRUD).

As principais funcionalidades implementadas, conforme solicitado nos critérios de avaliação, são:
*   Uma classe `BaseModel` que contém a lógica genérica de acesso ao banco.
*   Modelos específicos (`Produto`, `Usuario`, `Pedido`) que herdam da classe base.
*   Validação de campos obrigatórios na criação dos objetos.
*   Tratamento de exceções e armazenamento de erros em um arquivo de log (`logs/errors.log`).

## Estrutura de Pastas

```
/
|-- /src
|   |-- BaseModel.js      # Classe base com a lógica CRUD
|   |-- database.js       # Gerenciador de conexão com o MongoDB
|   |-- logger.js         # Serviço para registrar erros
|   |-- Pedido.js         # Modelo de Pedido
|   |-- Produto.js        # Modelo de Produto
|   |-- Usuario.js        # Modelo de Usuário
|-- /logs
|   |-- errors.log        # Arquivo de log de erros
|-- index.js              # Script de demonstração
|-- package.json
```

## Como Usar

### Pré-requisitos
*   **Node.js** (v18 ou superior)
*   **MongoDB** rodando localmente na porta padrão (`mongodb://127.0.0.1:27017`)

### Instalação

1.  Clone este repositório:
    ```bash
    git clone https://github.com/Lucaaaaaaaaaaaaaaa/Projeto1_WBE_LucaComine2410311.git
    ```
2.  Navegue até a pasta do projeto:
    ```bash
    cd Projeto1_WBE_LucaComine2410311
    ```
3.  Instale as dependências:
    ```bash
    npm install
    ```

### Executando a Demonstração

O arquivo `index.js` contém um script simples que demonstra o uso da biblioteca. Ele irá:
1.  Criar um novo `Usuario`.
2.  Criar um novo `Produto`.
3.  Criar um `Pedido` associando o usuário e o produto.
4.  Exibir os dados salvos no console.
5.  Limpar todos os dados de teste criados no banco.

Para executar, rode um dos seguintes comandos no seu terminal:
```bash
npm start
```
ou
```bash
node index.js
```