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

  useEffect(() => {
    fetchUsers();
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = users.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(users.length / recordsPerPage);
  const currentSearchRecords = searchUsers.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nSearchPages = Math.ceil(searchUsers.length / recordsPerPage);

  console.log(currentSearchRecords);

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
                <input type="checkbox" id="" />
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
                  name={user.name}
                  email={user.email}
                  role={user.role}
                  key={user.id}
                />
              ))}
            {search &&
              currentSearchRecords.map((user) => (
                <Users
                  name={user.name}
                  email={user.email}
                  role={user.role}
                  key={user.id}
                />
              ))}
          </tbody>
        </table>
      </section>
      {!loading && (
        <footer>
          <div className="footer-nav">
            <p>0 of 46 row(s) selected.</p>
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
