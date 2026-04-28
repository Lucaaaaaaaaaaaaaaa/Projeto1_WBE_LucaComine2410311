# Projeto 1: Biblioteca de Acesso a Banco de Dados em Node.js

Este é o meu projeto para a disciplina de Desenvolvimento Web Back End. O objetivo foi construir uma pequena biblioteca (um conjunto de classes) para gerenciar a persistência de dados em um banco de dados, utilizando Node.js.

**Autor:** Luca Comine
**RA:** 2410311

A temática que escolhi para desenvolver o projeto foi a de um **E-commerce**, implementando as entidades principais: `Usuario`, `Produto` e `Pedido`. Fiz o projeto sozinho, aplicando os conceitos vistos em aula.

## Conceito do Projeto

A biblioteca foi construída sobre uma ideia similar ao padrão **Active Record**, onde as próprias classes de modelo (`Produto`, `Usuario` e `Pedido`) são responsáveis por suas operações de banco de dados (criar, ler, atualizar e deletar - CRUD).

As principais funcionalidades implementadas, conforme solicitado nos critérios de avaliação, são:
*   Uma classe `BaseModel` que contém a lógica genérica de acesso ao banco.
*   Modelos específicos (`Produto`, `Usuario`, `Pedido`) que herdam da classe base.
*   Validação de campos obrigatórios na criação dos objetos.
*   Tratamento de exceções e armazenamento de erros em um arquivo de log (`logs/errors.log`).
