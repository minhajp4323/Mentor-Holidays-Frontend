import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import adminInstance from "../../../../Interceptors/AdminInterceptor";
import SideBar from "../../components/Sidebar";

function EditPackage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [PackageData, setPackageData] = useState({
    title: "",
    location: "",
    price: "",
    bedroom: "",
    bathroom: "",
    images: [],
    description: "",
    category: "",
    maxGuest: 0,
  });

  useEffect(() => {
    if (!localStorage.getItem("admintoken")) {
      navigate("/Admin/Login");
    }

    const fetchProperty = async () => {
      try {
        const response = await adminInstance.get(`/user/properties/${id}`);
        const {
          title,
          location,
          price,
          bedroom,
          bathroom,
          images,
          description,
          category,
          maxGuest,
        } = response.data.data;
        setPackageData({
          title,
          location,
          price,
          bedroom,
          bathroom,
          images,
          description,
          category,
          maxGuest,
        });
      } catch (error) {
        toast.error("Error fetching property details");
      }
    };

    fetchProperty();
  }, [navigate, id]);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "images") {
      const imageArray = Array.from(files);
      setPackageData((prevData) => ({
        ...prevData,
        images: imageArray,
      }));
    } else {
      setPackageData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", PackageData.title);
    formData.append("location", PackageData.location);
    formData.append("price", PackageData.price);
    formData.append("bedroom", PackageData.bedroom);
    formData.append("bathroom", PackageData.bathroom);
    formData.append("description", PackageData.description);
    formData.append("category", PackageData.category);
    formData.append("maxGuest", PackageData.maxGuest);

    for (let i = 0; i < PackageData.images.length; i++) {
      formData.append("images", PackageData.images[i]);
    }

    try {
      const response = await adminInstance.put(
        `/admin/properties/${id}`,
        formData
      );
      toast.success("Property edited successfully");
      setTimeout(() => navigate("/Admin/AdminProperties"), 2000);
    } catch (error) {
      toast.error("Error updating property");
    }
  };

  return (
    <div className="flex w-full justify-center">
      <div>
        <SideBar />
      </div>
      <div className="container mt-5 flex justify-evenly px-12">
        <div className="border w-full">
          <div className="bg-blue-600 text-white p-2 rounded-md">
            <h2 className="mb-0">Edit Package</h2>
          </div>
          <div className="card-body text-yellow-500">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title:
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="title"
                  className="form-control"
                  value={PackageData.title}
                  required
                />
              </div>
              {/* Add other fields similarly */}

              <div className="mb-3">
                <label htmlFor="images" className="form-label">
                  Images:
                </label>
                <input
                  onChange={handleChange}
                  accept="image/*"
                  type="file"
                  id="images"
                  className="form-control"
                  multiple
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Update Property
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPackage;
