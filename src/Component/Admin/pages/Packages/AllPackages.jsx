import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/Sidebar";
import adminInstance from "../../../../Interceptors/AdminInterceptor";

function AdminPackages() {
  const navigate = useNavigate();

  let [packagess, setPackage] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminInstance.get("/admin/package");
        setPackage(response.data.data);
        
      } catch (error) {
        console.error("Error fetching properties", error);
      }
    };

    if (!localStorage.getItem("admintoken")) {
      navigate("/Admin/Login");
    }

    fetchData();
  }, [navigate]);

  // const handleDelete = async (id) => {
  //   if (window.confirm("Are you sure you want to delete this property?")) {
  //     try {
  //       await adminInstance.delete(`/admin/properties/${id}`);
  //       setPackage(packages.filter((pkg) => pkg._id !== id));
  //     } catch (error) {
  //       console.error("Error deleting property", error);
  //     }
  //   }
  // };

  return (
    <div className="flex w-full">
      <SideBar />
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {packagess.map((packages) => (
            <div
              className="bg-white shadow rounded-lg overflow-hidden"
              key={packages._id}
            >
              <img
                className="w-full h-48 object-cover"
                src={packages.images[0]}
                alt={packages.destination}
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">
                  {packages.destination} - {packages.duration} day
                </h2>
                <p className="text-gray-700 mb-2">₹{packages.price}/-</p>
                <p className="text-gray-600">{packages.category}</p>
                {/* <p className="text-gray-500 mt-2 flex items-center">
                  <i className="fas fa-map-marker-alt mr-2" />
                  {packages.location}
                </p> */}
              </div>
              <div className="flex justify-between px-4 py-2">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() =>
                    navigate(`/Admin/editPackage/${packages._id}`)
                  }
                >
                  <i className="fas fa-edit" />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  // onClick={() => handleDelete(packages._id)}
                >
                  <i className="fas fa-trash-alt" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPackages;
