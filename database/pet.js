const { DataTypes } = require("sequelize");
const { connection } = require("./database"); // as chaves representam a conection q vem de database
// const Cliente = require("./cliente"); esta declarado no fim do doc

//preciso da conexao do sequelize pra fazer o model
const Pet = connection.define("pet", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    raca: {
        type: DataTypes.STRING,
        allowNull: false
    },
    porte: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dtNasc: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
});

// Associação 1:n
const Cliente = require("./cliente");

Cliente.hasMany(Pet);   // um cliente tem varios pets
Pet.belongsTo(Cliente); // um pet pertence a um cliente


module.exports = Pet;