Anotações internas:

- biblioteca que permite a manipulação do BD via js: sequelize
ORM => Object - relational mapper
	- gerar automaticamente as tabelas do banco
	- permite inserir dados
	- permite atualizar dados
	- permite deletar dados
	- consultar/filtar dados

// GET (/clientes) => Listagem de todos os clientes
// POST (/clientes) => Inserir cliente novo
// PUT (/clientes) => Atualizar cliente existente
// DELETE (/clientes) => Apagar cliente existente
U => UPDATE
	* checar se existe primeiro
	* checar se as relações existem também

C => CREATE
	* checar a validade dos dados

D => DELETE
	* checar se existe primeiro

R => READ
	* nenhum requisito