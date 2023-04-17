// importacoes principais e variaveisd do ambinete
// vai disponibilizar o uso de variavies de ambiente
require("dotenv").config();
const express = require("express");

// Config do App
const app = express();
app.use(express.json());    // posibilitar transitar dados usando JSON

// Config do BD
const {connection, authenticate} = require("./database/database");
authenticate(connection);

// Definição de rotas

// Escuta de eventos (listen)
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000")
});



