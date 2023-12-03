// using hooks
import { useState } from "react";

// css and icons import
import { RiDeleteBin7Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

const Users = ({
  user,
  handleChange,
  users,
  setUsers,
  allUsers,
  setAllUsers,
}) => {
  const [edit, setEdit] = useState(false);
  const [newItem, setNewItem] = useState({id: "", name: "", email: "", role: "" });

  const deleteOne = (id) => {
    const userToDelete = users.filter((user) => user.id === id);
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);

    if (allUsers) {
      const allUpdatedUsers = allUsers.filter(
        (user) => user !== userToDelete[0]
      );
      setAllUsers(allUpdatedUsers);
    }
  };

  const editHandler = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (id) => {
  
    users.map((user) => {
      if (user.id === id) {
        setEdit(true);
        setNewItem({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        });
      }
    });
  };

  const handleUpdateUser = (id, newValue) => {
    const updatedUser = users.find(user => user.id === id)
    if (!newValue.name || !newValue.email || !newValue.role) return;
    setUsers((prev) => prev.map((user) => (user.id === id ? newValue : user)));

    if(allUsers){
      setAllUsers(prev => prev.map(user => (user.id === updatedUser.id ? newValue : user)))
    }
    setEdit(false);
  };

  return (
    <tr className={user.isChecked ? "active-row" : ""}>
      <td>
        <input
          type="checkbox"
          name={user.id}
          checked={user?.isChecked || false}
          onChange={handleChange}
        />
      </td>
      <td>
        {!edit ? (
          user.name
        ) : (
          <input
            type="text"
            name="name"
            value={newItem.name}
            onChange={editHandler}
            className="edit-input"
          ></input>
        )}
      </td>
      <td>
        {!edit ? (
          user.email
        ) : (
          <input
            type="email"
            name="email"
            value={newItem.email}
            onChange={editHandler}
            className="edit-input"
          ></input>
        )}
      </td>
      <td>
        {!edit ? (
          user.role
        ) : (
          <input
            type="text"
            name="role"
            value={newItem.role}
            onChange={editHandler}
            className="edit-input"
          ></input>
        )}
      </td>
      <td>
        {!edit ? (
          <>
            <button className="edit" onClick={() => handleEdit(user.id)}>
              <FaRegEdit />
            </button>
            <button className="delete" onClick={() => deleteOne(user.id)}>
              <RiDeleteBin7Line />
            </button>
          </>
        ) : (
          <>
            <button
              className="save"
              onClick={() => handleUpdateUser(user.id, newItem)}
            >
              Save
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default Users;
