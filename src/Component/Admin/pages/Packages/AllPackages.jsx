import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Typography } from "@mui/material";
import SideBar from "../../components/Sidebar";
import adminInstance from "../../../../Interceptors/AdminInterceptor";

function AdminPackages() {
  const navigate = useNavigate();
  const [packages, setPackage] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);

  // Fetch data function defined in the component scope
  const fetchData = async () => {
    try {
      const response = await adminInstance.get("/admin/package");
      setPackage(response.data.data);
    } catch (error) {
      console.error("Error fetching packages", error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("admintoken")) {
      navigate("/Admin/Login");
    }

    fetchData(); // Call fetchData here on mount
  }, [navigate]);

  const handleDelete = async () => {
    if (selectedPackageId) {
      try {
        await adminInstance.delete(`/admin/package/${selectedPackageId}`);
        // Fetch data again to refresh the package list
        await fetchData();
      } catch (error) {
        console.error("Error deleting package", error);
      }
      setOpen(false); // Close modal after deletion
      setSelectedPackageId(null); // Reset selected ID
    }
  };

  const handleOpen = (id) => {
    setSelectedPackageId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPackageId(null); // Reset selected ID on close
  };

  return (
    <div className="flex w-full">
      <SideBar />
      <div className="container mx-auto p-8">
        <div className="mb-6 flex justify-center">
          <button
            className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate("/Admin/Package")}
          >
            + Add New Package
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <div className="bg-white shadow rounded-lg overflow-hidden" key={pkg._id}>
              <img
                className="w-full h-48 object-cover"
                src={pkg.images[0]}
                alt={pkg.destination}
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">
                  {pkg.destination} - {pkg.duration} day
                </h2>
                <p className="text-gray-700 mb-2">₹{pkg.price}/-</p>
                <p className="text-gray-600">{pkg.category}</p>
              </div>
              <div className="flex justify-between px-4 py-2">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => navigate(`/Admin/editPackage/${pkg._id}`)}
                >
                  <i className="fas fa-edit" />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleOpen(pkg._id)}
                >
                  <i className="fas fa-trash-alt" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Confirmation Modal */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div className="flex items-center justify-center h-full">
            <div className="bg-white p-6 rounded shadow-lg">
              <Typography id="modal-title" variant="h6" component="h2">
                Confirm Deletion
              </Typography>
              <Typography id="modal-description" sx={{ mt: 2 }}>
                Are you sure you want to delete this package?
              </Typography>
              <div className="flex justify-end mt-4">
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleDelete} color="secondary" style={{ marginLeft: '10px' }}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default AdminPackages;
