import { use, useEffect, useState } from "react";
import axios from "axios";
import Modal from "./UserModal";
import UserList from "./UserList";
import UserModal from "./UserModal";
import { FaPlus } from "react-icons/fa";
import AddUserModal from "./AddUserModal";
import { GrUpdate } from "react-icons/gr";

const UsersPage = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userSelected, setUserSelected] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5500/usuarios")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados: ", error);
      });
  }, []);

  const refreshUsers = () => {
    axios.get("http://localhost:5500/usuarios")
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar dados: ", error);
      });
  };

  useEffect(() => {
    refreshUsers();
  }, []);

  const openModal = (user) => {
    setUserSelected(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setUserSelected(null);
  };

  const openCreateModal = () => {
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleDeletedUser = (userId) => {
    setData(data.filter((u) => u.id !== userId));
    closeModal();
  };

  return (
    <div className="tab-container">
       
       <div className="title-container">
       <h1>Usuários:</h1>
      <div className="tab-title-buttons">
      <button className="update-button" onClick={refreshUsers}>
                <GrUpdate />
              </button>
              <button className="open-create-button" onClick={() => {openCreateModal() 
                closeModal()}}>
                <FaPlus /> Add
              </button>
              
      </div>
       </div>
      
      <table>
        <thead>
          <tr>
            <th className="tab-title">Id</th>
            <th className="tab-title">Nome</th>
            <th className="tab-title">Email</th>
            <th className="tab-title">CPF</th>
            <th className="tab-title">Editar</th>
          </tr>
          
        </thead>
        <tbody >
          
                {data.map((usuario) => (
            <UserList
              key={usuario.id}
              user={usuario}
              onClickDelete={openModal}
              onClickCloseCreateModal={closeCreateModal}
            />
          ))}
           
          
        </tbody>
      </table>

      {openModal && userSelected && (
        <UserModal
          user={userSelected}
          onClose={closeModal}
          onDeleted={handleDeletedUser}
        />
      )}

      {showCreateModal && openModal && (
        <AddUserModal CloseModal={closeCreateModal} />
      )}
    </div>
  );
};

export default UsersPage;
