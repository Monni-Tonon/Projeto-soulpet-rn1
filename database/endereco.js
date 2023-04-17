// DataTypes serve para definir qual  o tipo da coluna
const { DataTypes } = require("sequelize");
const { connection } = require("./database");

const Endereco = connection.define("endereco", {      // serve de base para gerar a tabela automaticamente
    uf: { 
        type: DataTypes.STRING(2),
        allowNull: false   // o mesmo que NOT NULL
    },
    cidade: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    cep: {
        type: DataTypes.STRING(9),
        allowNull: false
    },
    rua: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    numero: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
}); 

module.exports = Endereco;