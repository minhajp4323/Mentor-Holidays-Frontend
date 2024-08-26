import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import adminInstance from "../../../../Interceptors/AdminInterceptor";
import SideBar from "../../components/Sidebar";

function EditPackage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [PackageData, setPackageData] = useState({
    destination: "",
    duration: "",
    price: "",
    images: [],
    description: "",
    category: "",
  });

  useEffect(() => {
    if (!localStorage.getItem("admintoken")) {
      navigate("/Admin/Login");
    }

    const fetchProperty = async () => {
      try {
        const response = await adminInstance.get(`/user/properties/${id}`);
        const { destination, duration, price, images, description, category } =
          response.data.data;
        setPackageData({
          destination,
          duration,
          price,
          images,
          description,
          category,
        });
        console.log(response, "response")
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
    formData.append("destination", PackageData.destination);
    formData.append("duration", PackageData.duration);
    formData.append("price", PackageData.price);
    formData.append("description", PackageData.description);
    formData.append("category", PackageData.category);

    for (let i = 0; i < PackageData.images.length; i++) {
      formData.append("images", PackageData.images[i]);
    }

    try {
      const response = await adminInstance.put(
        `/admin/properties/${id}`,
        formData
      );

      console.log(response);
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
                <label htmlFor="destination" className="form-label">
                  Destination:
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="destination"
                  className="form-control"
                  value={PackageData.destination}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="duration" className="form-label">
                  Duration:
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="duration"
                  className="form-control"
                  value={PackageData.duration}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price:
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="price"
                  className="form-control"
                  value={PackageData.price}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category:
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="category"
                  className="form-control"
                  value={PackageData.category}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description:
                </label>
                <textarea
                  onChange={handleChange}
                  id="description"
                  className="form-control"
                  value={PackageData.description}
                  required
                />
              </div>
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
