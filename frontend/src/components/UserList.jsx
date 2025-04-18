import { PiNotePencilBold } from "react-icons/pi";
import "./UserList.css"

function UserList({ user, onClickDelete, onClickCloseCreateModal  }){
    
    return(
        <tr>
        <td>{user.id}</td>
      <td>{user.nome}</td>
      <td>{user.email}</td>
      <td>{user.cpf}</td>
      <td className="button-td">
        <button className="edit-button" onClick={() => {onClickDelete(user) 
          onClickCloseCreateModal()}}><PiNotePencilBold /></button>
      </td>
    </tr>
    )
}

export default UserList