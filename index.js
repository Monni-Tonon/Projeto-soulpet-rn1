// importacoes principais e variaveisd do ambinete
// vai disponibilizar o uso de variavies de ambiente
require("dotenv").config();
const express = require("express");

// Config do App
const app = express();
app.use(express.json());    // posibilitar transitar dados usando JSON

// Config do BD
const {connection, authenticate} = require("./database/database");
authenticate(connection);   // efetivar a conexao
const Cliente = require("./database/cliente");  // Configurar o model da aplicação
const Endereco = require("./database/endereco");

// Definição de rotas
// listar todos os clientes
app.get("/clientes", async (req, res) => {
    // SELECT * FROM clientes;
    const listClientes = await Cliente.findAll(); // array de objs
    res.json(listClientes);
});

// buscar cliente por id -> clientes/3
app.get("/clientes/:id", async (req, res) => {
    // equiv a SELECT * FROM clientes where id=3;
    const cliente = await Cliente.findOne({
        where: {id: req.params.id},         // busca pelo id 
        include: [Endereco],                // pra trazer junto os dados de endereco
    }); 

        if(cliente) {
            res.json(cliente);
        } else {
            res.status(404).json({message: "Usuario nao encontrado."})
        }
});

    // 1. inserção dos clientes
app.post("/clientes", async (req, res) => {
    // 1.1. coletar informacoes do req.body
    const { nome, email, telefone, endereco } = req.body; // espero receber na insercao do body essas infos
        console.log(nome, email, telefone, endereco);
    // 1.2. chamar Model.create
    try {
        const novoCliente = await Cliente.create({nome, email, telefone, endereco}, {include: [Endereco]}); // obj dentro dos () de create - ouseja, criando o obj cliente com seus parametros
        // o include inclui o outro model q eu quero inserir juntamente com Cliente.
        res.status(201).json(novoCliente);
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Um erro ocorreu."})
    }    
});

// Escuta de eventos (listen)
app.listen(3000, () => {
    connection.sync({force: true})  // gera as tabelas a partir do model. Force = apaga tudo e recria as tabelas
    console.log("Servidor rodando em http://localhost:3000")
});



