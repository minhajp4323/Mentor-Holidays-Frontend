import { useEffect, useState } from "react";
import SideBar from "../components/Sidebar";
import adminInstance from "../../../Interceptors/AdminInterceptor";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material"; // Import Skeleton

function AllUser() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await adminInstance.get("/admin/user");
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    if (!localStorage.getItem("admintoken")) {
      navigate("/Admin/Login");
    } else {
      fetchUsers();
    }
  }, [navigate]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex w-full">
      <SideBar />
      <div className="flex-1 p-10">
        <h1 className="text-2xl font-bold mb-6">All Users</h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by username..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-3 text-base border border-gray-300 rounded-lg"
          />
        </div>
        {loading ? ( // Show skeleton while loading
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <tbody>
              {[...Array(5)].map((_, index) => ( // Create 5 skeleton rows
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
                  <td className="p-3">
                    <Skeleton variant="text" width="80%" height={20} />
                  </td>
                  <td className="p-3">
                    <Skeleton variant="text" width="80%" height={20} />
                  </td>
                  <td className="p-3">
                    <Skeleton variant="text" width="80%" height={20} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Username</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Email</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr
                  key={user._id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
                >
                  <td className="p-3 text-sm text-gray-700">{user.username}</td>
                  <td className="p-3 text-sm text-gray-700">{user.email}</td>
                  <td className="p-3 text-sm text-gray-700">{user.phonenumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AllUser;
