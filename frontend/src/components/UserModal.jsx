import React, { use, useEffect, useState } from 'react'
import axios from 'axios';
import { IoCloseSharp } from "react-icons/io5";
import { FaTrashAlt, FaCheckDouble } from "react-icons/fa";
import "./UserModal.css"

function UserModal({user, onClose, onDeleted}){

  const [newName, setNewName] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newCpf, setNewCpf] = useState("")

  if(!user) return null;

  const handleDelete = async () => {

    if (!window.confirm("Queres mesmo apagar este utilizador?")) return;

    console.log("id: ", user.id)
    try{
      await axios.delete(`http://localhost:5500/usuarios/${user.id}`)
      onDeleted(user.id)
    }
    catch (err) {
      console.error("Erro ao apagar: ", err)
    }
  }

  const handleUpdateUser = async () => { 

    try {
      const response = await axios.patch(`http://localhost:5500/usuarios/${user.id}`, {
        nome: newName,
        email: newEmail,
        cpf: newCpf
      });
      
      console.log(user.nome, user.email, user.cpf)
      alert("Usuário atualizado com sucesso!");
      console.log("Dados atualizados:", response.data);
    } catch (err) {

     if(err.response && err.response.stats === 400){
         alert("Já existe um usuario com esse Email ou CPF.")
      }
      console.error("Erro ao atualizar:", err);
      alert("Erro ao atualizar usuário!");
    }
  };

  useEffect(() => {
    if(user){
      setNewName(user.nome)
      setNewEmail(user.email)
      setNewCpf(user.cpf)
    }
  }, [user])
  

  return(
    <>
      <div className="container">
        <div className="content">
          <h2>Editar usuário</h2>
          <input className='edit-input' type="text" placeholder={user.nome} value={newName} onChange={(event) => setNewName(event.target.value)}/>
          <input className='edit-input' type="email" placeholder={user.email} value={newEmail} onChange={(event) => setNewEmail(event.target.value)}/>
          <input className='edit-input' type="text" placeholder={user.cpf} value={newCpf} onChange={(event) => setNewCpf(event.target.value)}/>
          <div className="buttons">
          <button className='confirm-edit' onClick={handleUpdateUser}><FaCheckDouble/></button>
          <button className='delete-user'  onClick={handleDelete}><FaTrashAlt /></button>
          <button  className='close-edit-btn' onClick={onClose} ><IoCloseSharp /> Fechar</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserModal