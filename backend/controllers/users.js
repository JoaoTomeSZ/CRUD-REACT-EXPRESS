const { getAllUsers, getUserById, postNewUser, deleteUserById, patchUserById } = require("../services/users")
const express = require("express")
const app = express()
const db = require("../db")

app.use(express.json())

async function getUsers(req, res) {
    try{
        const users = await getAllUsers()
        res.send(users)
    } catch{
        res.sendStatus(500).json({message: "Usuários não encontrados!"})
    }
}

async function getUser(req, res){
    try{
        
        const userId = req.params.id
        const user = await getUserById(userId)
        if(!user){
            return res.tatus(404).json({message: "Usuário não encontrado"})
        }
        
        res.send(user)
    }
    catch (err){
        res.status(422).json({message: "Usuário não encontrado ou inexistente!"})
    }
}

async function postUser(req, res) {
    try{
        const { nome, email, cpf } = req.body

        const userExists = await db.query("SELECT * FROM users WHERE email = $1 OR cpf = $2", [email ,cpf])

        if(userExists.rows.length > 0){
            return res.status(409).json({ message: "Usuário já cadastrado com este e-mail ou CPF" });
            
        }

        if(!nome || !email || !cpf){
            return res.status(400).json({ message: "Todos os campos são obrigatórios" });       
        }
        if(cpf.length !== 11){
            return res.status(400).json({ message: "Quantidade de caracteres inválida no CPF" }); 
        }
        postNewUser(nome, email, cpf)
        res.send("Usuário criado com sucesso!")
        res.status(200)
        
    } catch(err){
        res.status(500).json({message: "Não foi possivel criar novo usuário"})
    }
}

async function deleteUser(req, res) {
    try {
        const userId = req.params.id;

        if (!userId || isNaN(Number(userId))) {
            return res.status(400).json({ message: "ID inválido" });
        }

        const deletedUser = await deleteUserById(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        return res.status(200).json({ message: "Usuário deletado com sucesso!", user: deletedUser });

    } catch (err) {
        console.error("Erro ao deletar usuário:", err);
        return res.status(500).json({ message: "Não foi possível deletar o usuário" });
    }
}

async function patchUser(req, res){
    try{
        const {nome, email, cpf} = req.body
        const userId = req.params.id

        patchUserById(nome, email, cpf, userId)

        return res.status(200).json({ message: "Usuário atualizado com sucesso!"});
    }
    catch(err){
        console.error("Erro ao atualizar usuário:", err);
        return res.status(500).json({ message: "Não foi possível atualizar o usuário" });
    }
}

module.exports = {
    getUsers,
    getUser,
    postUser,
    deleteUser,
    patchUser
}