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


const rotasClientes = require("./routes/clientes");
const rotasPets = require("./routes/pets");

app.use(rotasClientes);
app.use(rotasPets);

// Escuta de eventos (listen)
app.listen(3000, () => {
    connection.sync()   //({force: true}) => gera as tabelas a partir do model. Force = apaga tudo e recria as tabelas
    console.log("Servidor rodando em http://localhost:3000")
});



