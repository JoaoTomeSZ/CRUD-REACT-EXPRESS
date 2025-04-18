import { useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import "./AddUser.css"

function AddUserModal({ CloseModal}) {
  const [nome, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");

  const [users, setUsers] = useState([]);



  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!nome.trim() || !email.trim() || !cpf.trim()) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    if (cpf.length !== 11) {
      alert("CPF Deve conter 11 números!");
    }

    try {
      const result = await axios.post(
        "http://localhost:5500/usuarios/",
        { nome, email, cpf },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("Usuário criado com sucesso!");

    } catch (err) {
      console.error("Erro ao criar usuário: ", err);
      alert("Usuário ja existe");
    }
  };

  const addShadow= () => {
    document.querySelector("")
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="title">
        <h2>Adicionar usuário</h2>
        </div>
        
        <div>
          <label>
            <input
              placeholder="Nome:"
              type="text"
              value={nome}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            <input
              placeholder="Email:"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            <input
              placeholder="Cpf:"
              type="text"
              value={cpf}
              onChange={(event) => setCpf(event.target.value)}
              required
            />
          </label>
        </div>
        <div className="user-add-buttons">
        <button type="submit" className="add-btn" onClick={addShadow}>
          <FaPlus />
          Criar
        </button>
        <button type="button" className="close-btn" onClick={CloseModal}>
        <IoCloseSharp />
        Fechar
      </button>
        </div>
        
      </form>
      
    </>
  );
}

export default AddUserModal;
