// modelo para gerar tabela de clientes no MySQL
// mapeamento: cada propriedade vira uma coluna da tabela

// DataTypes serve para definir qual  o tipo da coluna
const { DataTypes } = require("sequelize");
const { connection } = require("./database");

const Cliente = connection.define("cliente", {      // serve de base para gerar a tabela automaticamente
    nome: { //configurar a coluna 'nome'
        // nome VARCHAR NOT NULL
        type: DataTypes.STRING(130),
        allowNull: false   // o mesmo que NOT NULL
    },
    email: {
        // email VARCHAR UNIQUE NOT NULL
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telefone: {
        // telefone VARCHAR NOT NULL
        type: DataTypes.STRING,
        allowNull: false
    }
    
}); 

// Associação 1:1 (one-to-one)
const Endereco = require("./endereco"); // importa endereço

Cliente.hasOne(Endereco); // cliente tem um endereco
Endereco.belongsTo(Cliente); // endereco pertence a um cliente


module.exports = Cliente;




// const cliente = {
//     nome: "Paul Chess",             //
//     email: "paul@mail.com",         //  VARCHAR
//     telefone: "(88) 9-9999-9999",   //
// };