import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Button, Skeleton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "../components/Sidebar";
import adminInstance from "../../../Interceptors/AdminInterceptor";

function AdminProperties() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading

  const fetchData = async () => {
    try {
      const response = await adminInstance.get("/admin/properties");
      setProperties(response.data.data);
    } catch (error) {
      console.error("Error fetching properties", error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("admintoken")) {
      navigate("/Admin/Login");
    }

    fetchData();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await adminInstance.delete(`/admin/properties/${id}`);
        setProperties(properties.filter((property) => property._id !== id));
      } catch (error) {
        console.error("Error deleting property", error);
      }
    }
  };

  return (
    <div className="flex w-full">
      <SideBar />
      <div className="container mx-auto p-12">
        <div className="mb-6 flex justify-center">
          <button
            className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate("/Admin/AddProduct")}
          >
            + Add New Properties
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {loading ? (
            // Show skeletons while loading
            Array.from(new Array(8)).map((_, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <Skeleton variant="rectangular" height={192} />
                <div className="p-4">
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" width="60%" />
                </div>
              </div>
            ))
          ) : (
            properties.map((property) => (
              <div key={property._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  className="w-full h-48 object-cover"
                  src={property.images[0]}
                  alt={property.title}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{property.title}</h3>
                  <p className="text-gray-700">₹{property.price}/-</p>
                  <p className="text-gray-600">{property.category}</p>
                  <p className="text-gray-600 flex items-center">
                    <i className="fas fa-map-marker-alt mr-2"></i>
                    {property.location}
                  </p>
                </div>
                <div className="flex justify-between p-4">
                  <IconButton
                    className="text-blue-500"
                    onClick={() => navigate(`/Admin/EditProperty/${property._id}`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    className="text-red-500"
                    onClick={() => handleDelete(property._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminProperties;
