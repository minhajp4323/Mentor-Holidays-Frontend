import { useEffect, useState } from "react";
import SideBar from "../components/Sidebar";
import "./AllUser.css";
import adminInstance from "../../../Interceptors/AdminInterceptor";
import { useNavigate } from "react-router-dom";

function AllUser() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await adminInstance.get("/admin/user");
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    if (!localStorage.getItem("admintoken")) {
      navigate("/Admin/Login");
    }

    fetchUsers();
  }, [navigate]);

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
              <th scope="col">
                <h3>Username</h3>
              </th>
              <th scope="col">
                <h3>Email</h3>
              </th>
              <th scope="col">
                <h3>Phone Number</h3>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={user._id}
                className={index % 2 === 0 ? "even-row" : "odd-row"}
              >
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
