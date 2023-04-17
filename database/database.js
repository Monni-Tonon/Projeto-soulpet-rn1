// database.js = arq de conexao com o BD
// lê as variaveis de ambiente e conecta com o banco (MySQL, nosso exemplo)

const { Sequelize } = require ("sequelize");

// criar obj de conexao - possibilita  node conversar com o banco
const connection = new Sequelize(
    process.env.DB_NAME,            // nome reservado para o database          
    process.env.DB_USER,            // usuario reservado para a conexao           
    process.env.DB_PASS,            //                                           
    {
        host: process.env.DB_HOST,  // endereço (banco local)
        dialect: 'mysql'            // banco utilizado
    }
);

// Função para etabelecer a conexao usando o obj
async function authenticate(connection) {
    try{
        await connection.authenticate();     // tenta estabelecer conexao com o bd/usa infos passada acima
            console.log("Conexao estabelecida com sucesso");
    } catch (err) {                         // err -> obj q guarda detalhes sobre o erro que aconteceu
            console.log("Erro inesperado aconteceu", err);
    }
    
}

module.exports = {connection, authenticate};