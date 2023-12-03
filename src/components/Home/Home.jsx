// hooks import
import { useState, useEffect } from "react";

// functions and components import
import { getUsers, getLocalItems } from "../../utils/getUsers";
import Users from "../Users/Users";
import Pagination from "../Pagination/Pagination";

// css and icons import
import { RiDeleteBin7Line } from "react-icons/ri";
import "./Home.css";

const Home = () => {
  // loading management
  const [loading, setLoading] = useState(true);

  // handle search states
  const [search, setSearch] = useState(false);
  const [searchUsers, setSearchUsers] = useState(getLocalItems(search));

  // pagination and store user data states
  const [countSelected, setCountSelected] = useState(0);
  const [users, setUsers] = useState(getLocalItems(search));
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  // fetch user from given api
  const fetchUsers = async () => {
    const data = await getUsers();
    // if (!users) setUsers(data);
    setUsers(data);
    setLoading(false);
  };

  // handle search function
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const usersFound = users.filter(
        (user) =>
          user.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          user.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
          user.role.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSearchUsers(usersFound);
      setSearch(true);
      setCurrentPage(1);
    }

    if (e.key === "Backspace" && e.target.value.length === 1) {
      setSearch(false);
      setCurrentPage(1);
    }
  };

  // delete multiple users
  const removeMultipleUsers = () => {
    if (!search) {
      const updatedUsers = users.filter((user) => !user.isChecked);
      setUsers(updatedUsers);
    }

    if (search) {
      const usersToRemove = searchUsers.filter((user) => user.isChecked);
      const updatedUsers = searchUsers.filter((user) => !user.isChecked);

      setSearchUsers(updatedUsers);

      //   for(let i=0;i<users.length;i++){
      //     for(let j=0;j<usersToRemove.length;j++){
      //         if(users[i].id === usersToRemove[j].id){
      //             users[i].isChecked = !users[i].isChecked;
      //         }
      //     }
      //   }
      const allUpdatedUsers = users.filter(
        (user) =>
          !JSON.parse(
            JSON.stringify(usersToRemove).includes(JSON.stringify(user.id))
          )
      );
      setUsers(allUpdatedUsers);
    }
  };

  const removeAll = () => {
    if (
      window.confirm(
        "This action will delete all elements of table. Are you sure to delete?"
      ) === true
    ) {
      setUsers([]);
      setSearchUsers([]);
    }
  };

  // fetch data once
  useEffect(() => {
    fetchUsers();
  }, []);

  // store in local storage
  useEffect(() => {
    if (!search) {
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.removeItem("searchusers");
    }

    if (search)
      localStorage.setItem("searchusers", JSON.stringify(searchUsers));
  }, [users, searchUsers, search]);

  // count number of items selected
  useEffect(() => {
    setCountSelected(0);
    if (!search) {
      for (let i = 0; i < users.length; i++) {
        if (users[i].isChecked) {
          setCountSelected((prevCount) => prevCount + 1);
        }
      }
    }

    if (search) {
      setCountSelected(0);
      for (let i = 0; i < searchUsers.length; i++) {
        if (searchUsers[i].isChecked) {
          setCountSelected((prevCount) => prevCount + 1);
        }
      }
    }
  }, [search, users, searchUsers]);

  // pagination variables
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = users.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(
    users.length > 0
      ? users.length / recordsPerPage
      : (users.length + 1) / recordsPerPage
  );
  const currentSearchRecords = searchUsers.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nSearchPages = Math.ceil(
    searchUsers.length > 0
      ? searchUsers.length / recordsPerPage
      : (searchUsers.length + 1) / recordsPerPage
  );

  // function to handle checkboxes
  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allselect") {
      // if searching is not performed
      if (!search) {
        const tempUser = users.map((user) =>
          currentRecords.includes(user) ? { ...user, isChecked: checked } : user
        );
        setUsers(tempUser);
      }

      // if showing search results
      if (search) {
        const tempUser = searchUsers.map((user) =>
          currentSearchRecords.includes(user)
            ? { ...user, isChecked: checked }
            : user
        );
        setSearchUsers(tempUser);
      }
    } else {
      if (!search) {
        const tempUser = users.map((user) =>
          user.id.toString() === name ? { ...user, isChecked: checked } : user
        );
        setUsers(tempUser);
      }

      if (search) {
        const tempUser = searchUsers.map((user) =>
          user.id.toString() === name ? { ...user, isChecked: checked } : user
        );
        setSearchUsers(tempUser);
      }
    }
  };

  return (
    <main>
      <section className="search-section">
        <input type="text" placeholder="Search..." onKeyDown={handleSearch} />
        <button className="delete-bulk" onClick={removeAll}>
          <RiDeleteBin7Line />
        </button>
      </section>

      <section className="table-section">
        <table>
          <thead>
            <tr>
              <th colSpan="1">
                <input
                  type="checkbox"
                  name="allselect"
                  checked={
                    !search
                      ? !currentRecords.some((user) => user.isChecked !== true)
                      : !currentSearchRecords.some(
                          (user) => user?.isChecked !== true
                        )
                  }
                  onChange={handleChange}
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {!search &&
              currentRecords.map((user) => (
                <Users
                  user={user}
                  users={users}
                  setUsers={setUsers}
                  key={user.id}
                  handleChange={handleChange}
                />
              ))}
            {search &&
              currentSearchRecords.map((user) => (
                <Users
                  user={user}
                  users={searchUsers}
                  setUsers={setSearchUsers}
                  allUsers={users}
                  setAllUsers={setUsers}
                  key={user.id}
                  handleChange={handleChange}
                />
              ))}
          </tbody>
        </table>
      </section>
      {!loading && (
        <footer>
          <div className="footer-nav">
            <p>
              {countSelected} of {!search ? users.length : searchUsers.length}{" "}
              row(s) selected.
            </p>
            <Pagination
              nPages={nPages}
              nSearchPages={nSearchPages}
              search={search}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
          {countSelected > 0 && (
            <button className="del-selected" onClick={removeMultipleUsers}>
              Delete Selected
            </button>
          )}
        </footer>
      )}
    </main>
  );
};

export default Home;
