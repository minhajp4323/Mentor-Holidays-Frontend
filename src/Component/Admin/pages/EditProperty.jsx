import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SideBar from "../components/Sidebar";
import { toast } from "react-toastify";
import adminInstance from "../../../Interceptors/AdminInterceptor";

function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [propertyData, setPropertyData] = useState({
    title: "",
    location: "",
    price: "",
    bedroom: "",
    bathroom: "",
    images: [],
    description: "",
    category: "",
    maxGuest: "",
  });

  useEffect(() => {
    if (!localStorage.getItem("admintoken")) {
      navigate("/Admin/Login");
    }
    const fetchProperty = async () => {
      try {
        const response = await adminInstance.get(`/user/properties/${id}`);
        setPropertyData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        toast.error("Error fetching property details");
      }
    };
    fetchProperty();
  }, [navigate, id]);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [id]: id === "images" ? Array.from(files) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(propertyData).forEach((key) =>
      key === "images"
        ? propertyData.images.forEach((file) => formData.append("images", file))
        : formData.append(key, propertyData[key])
    );

    try {
      const response = await adminInstance.put(
        `/admin/properties/${id}`,
        formData
      );
      toast.success(response.data.message);
      setTimeout(() => navigate("/Admin/AdminProperties"), 2000);
    } catch (error) {
      toast.error("Error updating property");
    }
  };

  return (
    <div className="flex justify-center w-full">
      <SideBar />
      <div className="container mt-5 flex flex-col items-center px-4">
        <div className="w-full border p-4">
          <h2 className="bg-blue-500 text-white p-2 rounded-md mb-4">
            Edit Property
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { id: "title", label: "Title", type: "text" },
              { id: "location", label: "Location", type: "text" },
              { id: "price", label: "Price", type: "number" },
              { id: "bedroom", label: "Bedroom", type: "number" },
              { id: "bathroom", label: "Bathroom", type: "number" },
              { id: "category", label: "Category", type: "text" },
              { id: "maxGuest", label: "Maximum no. of guests", type: "number" },
            ].map(({ id, label, type }) => (
              <div key={id}>
                <label htmlFor={id} className="form-label">
                  {label}:
                </label>
                <input
                  id={id}
                  type={type}
                  value={propertyData[id]}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            ))}
            <div>
              <label htmlFor="description" className="form-label">
                Description:
              </label>
              <textarea
                id="description"
                value={propertyData.description}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div>
              <label htmlFor="images" className="form-label">
                Images:
              </label>
              <input
                id="images"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="form-control"
                multiple
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Update Property
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProperty;
