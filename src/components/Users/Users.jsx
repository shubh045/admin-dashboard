// css and icons import
import { RiDeleteBin7Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

const Users = ({ user, handleChange }) => {

  
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
        <button className="delete">
          <RiDeleteBin7Line />
        </button>
      </td>
    </tr>
  );
};

export default Users;
