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
  });

  useEffect(() => {
    if (!localStorage.getItem("admintoken")) {
      navigate("/Admin/Login");
    }
    const fetchProperty = async () => {
      try {
        const response = await adminInstance.get(`/user/properties/${id}`);
        const { destination, duration, category, price, images, description } =
          response.data.data;
        setPackageData({
          destination,
          duration,
          category,
          price,
          images,
          description,
        });
      } catch (error) {
        toast.error("Error fetching property details");
      }
    };
    fetchProperty();
  }, [navigate, id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "images") {
      const files = e.target.files;
      const imageArray = [];
      for (let i = 0; i < files.length; i++) {
        imageArray.push(files[i]);
      }
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
    formData.append("category", PackageData.location);
    formData.append("price", PackageData.price);
    formData.append("images", PackageData.images);
    formData.append("description", PackageData.description);

    for (let i = 0; i < PackageData.images.length; i++) {
      formData.append("images", PackageData.images[i]);
    }

    try {
      const response = await adminInstance.put(
        `/admin/properties/${id}`,
        formData
      );
      toast.success("property editted");
      console.log(response);
      toast.success(response.data.message);
      setTimeout(() => navigate("/Admin/AdminProperties"), 2000);
    } catch (error) {
      toast.error("Error updating property");
      console.log(error);
    }
  };

  return (
    <div
      className="d-flex w-full"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div>
        <SideBar />
      </div>
      <div
        className="container mt-5"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          padding: "0 50px 0 50px",
        }}
      >
        <div style={{ border: 1, width: "100%" }}>
          <div
            style={{
              backgroundColor: "blue",
              color: "white",
              padding: 5,
              borderRadius: 5,
            }}
          >
            <h2 className="mb-0">Edit Package</h2>
          </div>
          <div className="card-body" style={{ color: "yellow" }}>
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

              <div className="mb-3">
                <label className="form-label">Location:</label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="location"
                  className="form-control"
                  value={PackageData.location}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price:
                </label>
                <input
                  onChange={handleChange}
                  type="number"
                  id="price"
                  className="form-control"
                  value={PackageData.price}
                  min="0"
                  required
                />
              </div>

              <div className="mb-3 d-flex justify-content-between">
                <div style={{ width: "48%" }}>
                  <label htmlFor="bedroom" className="form-label">
                    Bedroom:
                  </label>
                  <input
                    onChange={handleChange}
                    type="number"
                    id="bedroom"
                    className="form-control"
                    value={PackageData.bedroom}
                    min="0"
                    required
                  />
                </div>
                <div style={{ width: "48%" }}>
                  <label htmlFor="bathroom" className="form-label">
                    Bathroom:
                  </label>
                  <input
                    onChange={handleChange}
                    type="number"
                    id="bathroom"
                    className="form-control"
                    value={PackageData.bathroom}
                    min="0"
                    required
                  />
                </div>
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
                <label htmlFor="maxGuest" className="form-label">
                  Maximum no. of guest :
                </label>
                <input
                  onChange={handleChange}
                  type="number"
                  id="maxGuest"
                  className="form-control"
                  value={PackageData.maxGuest}
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
