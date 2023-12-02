// css and icons import
import { RiDeleteBin7Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

const Users = ({ name, email, role }) => {
  return (
    <tr>
      <td>
        <input type="checkbox" id="" />
      </td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{role}</td>
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
