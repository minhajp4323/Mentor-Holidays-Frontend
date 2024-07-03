import { useEffect, useState } from "react";
import SideBar from "../components/Sidebar";
import axios from "axios";
import "./AllUser.css"; // Import the CSS file

function AllUser() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3333/api/admin/user");
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="d-flex w-full">
      <SideBar />
      <div className="container" style={{ padding: "50px" }}>
        <h1>All Users</h1>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search by username..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <table className="table custom-table">
          <thead>
            <tr>
              <th scope="col"><h3>Username</h3></th>
              <th scope="col"><h3>Email</h3></th>
              <th scope="col"><h3>Phone Number</h3></th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phonenumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllUser;
