const Cliente = require("../database/cliente.js");
const Endereco = require("../database/endereco");

const { Router } = require("express");

//Criar o grupo de rotas(/clientes)
const router = Router();

//Definição das rotas - paradigma REST

// ============================ CRUD CLIENTES INICIO ====================================
// listar todos os clientes
router.get("/clientes", async (req, res) => {
    // SELECT * FROM clientes;
    const listClientes = await Cliente.findAll(); // array de objs
    res.json(listClientes);
});

// buscar cliente por id -> clientes/3
router.get("/clientes/:id", async (req, res) => {
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
router.post("/clientes", async (req, res) => {
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

// 2.PUT (/clientes) => atualizar cliente existente
router.put("/clientes/:id", async (req, res) => {
    const { nome, email, telefone, endereco } = req.body;
    const { id } = req.params; 

    try {
        const cliente = await Cliente.findOne({ where: { id } }) 
        if(cliente) {
            // 2.1. checa a atualizacao do endereço
            if(endereco) {
                //2.1.1. qd o clienteId de Endereco for = id do cliente fornecido em /clientes/:id
                await Endereco.update(endereco, { where: { clienteId: id }});
            }
            // dps de verificar se tem endereco, verifica se ha atualizacao nas demais informacoes
            await cliente.update( { nome, email, telefone } ); //, { where: { id } } ); << esse where eu coloco se for usar o Cliente com "C".
            // resposta e qual cliente editado
            res.status(200).json({message: "Cliente editado."});
        } else {
            //resposta se nao encontrar o cliente
            res.status(404).json({message: "Cliente nao encontrado."});
        }
    } catch (err) {
        // não consegue consultar o bd por algum motivo
        res.status(500).json({message: "Um erro aconteceu."});
    }  
});

// 3. DEL (/clientes/) => deletar o cliente
router.delete("/clientes/:id", async (req, res) => {
    const { id } = req.params;
    try  {
        const cliente = await Cliente.findOne({where: {id}});
        if(cliente) {
            await Endereco.destroy({ where: {clienteId: id} })
            await cliente.destroy();
            res.status(200).json({message: "Cliente removido."})
        } else {
            res.status(404).json({message: "Cliente nao encontrado."});
        }
    } catch(err) {
        console.error(err);
        res.status(500).json({message: "Um erro aconteceu."});
    }
});
// ============================ CRUD CLIENTES FIM ====================================

module.exports = router;