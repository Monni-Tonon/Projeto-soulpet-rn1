const Cliente = require("../database/cliente");
const Pet = require("../database/pet");

const { Router } = require("express");

// Criar o grupo de rotas (/pets)
const router = Router();

// ============================ CRUD PETS INICIO ====================================
// GET (/pets) => Listagem de todos os pets
router.get("/pets", async(req,res)=>{
    const listaPets = await Pet.findAll();
    res.json(listaPets);
});
router.get("/pets/:id", async (req, res)=>{
    const pet = await Pet.findOne({ //findOne busca somente 1 resgitro
        where: {id: req.params.id}}); 
    if(pet){
        res.json(pet);
    }else{
        res.status(404).json({message: "Pet não encontrado!"})
    }
});

// POST (/pets) => inserindo pet novo
router.post("/pets", async (req, res) => {
    const { nome, raca, porte, dtNasc, clienteId } = req.body;
    console.log(nome, raca, porte, dtNasc, clienteId);
    try {
        //verificar se o cliente existe para vincular o pet
        const cliente = await Cliente.findByPk(clienteId);
        if(cliente) {   //se existe, cria o registro do pet
            const novoPet = await Pet.create({nome, raca, porte, dtNasc, clienteId});
                res.status(201).json(novoPet);
                    } 
                    else {
                        res.status(404).json({message: "Cliente nao encontrado."});
                        }   
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Um erro ocorreu ao incluir pet."})
                }
});

// PUT (/pets) => atualizar dados do pet. regra: nao é possivel trocar dono
router.put("/pets/:id", async (req, res) => {
    //dados que virao no corpo do json
    const { nome, raca, porte, dtNasc } = req.body;
    //checar a existencia do pet no sistema (select * from pets where id= req.params.id)
    const pet = await Pet.findByPk(req.params.id);
    
    //se pet é null, nao existe o pet com o id
    try {
        if(pet) {
            //atualiza
            //IMPORTANTE indicar qual pet atualizar!! COLOCAR A CONDIÇÃO where
            // 1º argumento: dados novos, 2º argumento: where(condicao de busca: id)
            await Pet.update({nome, raca, porte, dtNasc}, {where: {id: req.params.id}});
            res.json({message: "Pet atualizado."});
        } else {
            //retorna 404, caso id invalido
            res.status(404).json({message: "Pet não encontrado."})
        }
    } catch(err) {
        //retorna 500, caso erro inesperado
        console.log(err);
        res.status(500).json({message: "Um erro aconteceu ao tentar conectar com o servidor."})
    }
});

// DELETE (/pets => apagar registro do pet)
router.delete("/pets/:id", async (req, res) => {
    // checar se o pet existe antes de apagar
    const pet = await Pet.findByPk(req.params.id);

    if(pet) {       // se existe, pode apagar
        await pet.destroy();
        res.json({message: "Pet removido."})
    } else {
        res.status(404).json({message: "Pet nao encontrado."})
    }
});
// ============================ CRUD PETS FIM ====================================



module.exports = router;