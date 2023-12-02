// hooks import
import { useState, useEffect } from "react";

// functions and components import
import { getUsers } from "../../utils/getUsers";
import Users from "../Users/Users";

// css and icons import
import { RiDeleteBin7Line } from "react-icons/ri";
import "./Home.css";
import Pagination from "../Pagination/Pagination";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(false);
  const [searchUsers, setSearchUsers] = useState([]);
  const [countSelected, setCountSelected] = useState(0);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
    setLoading(false);
  };

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

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allselect") {
      if (!search) {
        const tempUser = users.map((user) => ({ ...user, isChecked: checked }));
        setUsers(tempUser);
      }
      if (search) {
        const tempUser = searchUsers.map((user) => ({
          ...user,
          isChecked: checked,
        }));
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

  useEffect(() => {
    fetchUsers();
  }, []);

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

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = users.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(users.length / recordsPerPage);
  const currentSearchRecords = searchUsers.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nSearchPages = Math.ceil(searchUsers.length / recordsPerPage);

  return (
    <main>
      <section className="search-section">
        <input type="text" placeholder="Search..." onKeyDown={handleSearch} />
        <button className="delete-bulk">
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
                      ? !users.some((user) => user.isChecked !== true)
                      : !searchUsers.some((user) => user?.isChecked !== true)
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
                <Users user={user} key={user.id} handleChange={handleChange} />
              ))}
            {search &&
              currentSearchRecords.map((user) => (
                <Users user={user} key={user.id} handleChange={handleChange} />
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
          {/* <button>Delete Selected</button> */}
        </footer>
      )}
    </main>
  );
};

export default Home;
