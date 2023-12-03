
// css and icons import
import { RiDeleteBin7Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

const Users = ({ user, handleChange, users, setUsers, allUsers, setAllUsers }) => {

  const deleteOne = (id) => {
    const userToDelete = users.filter(user => user.id === id)
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);

    const allUpdatedUsers = allUsers.filter(user => user !== userToDelete[0])
    setAllUsers(allUpdatedUsers);
  }
  
  return (
    <tr>
      <td>
        <input type="checkbox" name={user.id} checked={user?.isChecked || false} onChange={handleChange} />
      </td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        <button className="edit">
          <FaRegEdit />
        </button>
        <button className="delete" onClick={() => deleteOne(user.id)}>
          <RiDeleteBin7Line />
        </button>
      </td>
    </tr>
  );
};

export default Users;
