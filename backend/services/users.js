const db = require('../db')

async function getAllUsers(){
    try{
        const result = await db.query(
            "SELECT id, nome, email, cpf FROM users"
        )
        return result.rows
    }
    catch (err){
        console.error("Erro ao buscar usuários:", error)
    }
}

async function getUserById(userId){
    try{
        const user = await db.query("SELECT nome, email, cpf FROM users WHERE id = $1", [userId])
        return user.rows[0]
    }
    catch( err){
        console.error("Erro ao encontrar usuário", error)
    } 
}

async function postNewUser(nome, email, cpf){
    try{
        
        const result = await db.query(
            "INSERT INTO users (nome, email, cpf) VALUES ($1, $2, $3) RETURNING *",
            [nome, email, cpf]
        );
        return result

    }
    catch(err){
        console.error("Erro ao criar novo usuário:", err)
    }
}

async function deleteUserById(userId) {
    try {
        const result = await db.query("DELETE FROM users WHERE id = $1 RETURNING *", [userId]);

        if (result.rowCount === 0) {
            console.log("Nenhum usuário encontrado com esse ID.");
            return null; 
        }

        console.log("Usuário deletado com sucesso:", result.rows[0]);
        return result.rows[0];
    } catch (err) {
        console.error("Erro ao deletar usuário:", err);
        return null; 
    }
}

async function patchUserById(nome, email, cpf, id){
    try{
        const result = await db.query("UPDATE users SET nome = $1, email = $2, cpf = $3 WHERE id = $4", [nome, email, cpf, id])
        return result
    }
    catch(err){
        console.error("Erro ao atualizar usuário:", err);
    }
}



module.exports = {
    getAllUsers,
    getUserById,
    postNewUser,
    deleteUserById,
    patchUserById
}