import { useEffect, useState } from "react";
import SideBar from "../components/Sidebar";
import axios from "axios";
// import { toast } from "react-toastify";

function AllUser() {
  const [users, setUsers] = useState([]);

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

  return (
    <div className="d-flex w-full">
      <SideBar />
      <div className="container mt-5" style={{ padding: "50px" }}>
        <h1>All Users</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col"><h3>Username</h3></th>
              <th scope="col"><h3>Email</h3></th>
              <th scope="col"><h3>Phone Number</h3></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
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
