import { useState } from "react";
import SideBar from "../components/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";

function AddProduct() {
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

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "images") {
      const files = e.target.files;
      const imageArray = [];
      for (let i = 0; i < files.length; i++) {
        imageArray.push(files[i]);
      }
      setPropertyData((prevData) => ({
        ...prevData,
        images: imageArray,
      }));
    } else {
      setPropertyData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", propertyData.title);
    formData.append("price", propertyData.price);
    formData.append("location", propertyData.location);
    formData.append("bedroom", propertyData.bedroom);
    formData.append("bathroom", propertyData.bathroom);
    formData.append("category", propertyData.category);
    formData.append("description", propertyData.description);
    formData.append("maxGuest", propertyData.maxGuest);

    for (let i = 0; i < propertyData.images.length; i++) {
      formData.append("images", propertyData.images[i]);
    }

    try {
      await axios.post("http://localhost:3333/api/admin/properties", formData);
      toast.success("Property added successfully");

      // Reset form inputs
      setPropertyData({
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
    } catch (error) {
      toast.error("Error adding property");
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
            <h2 className="mb-0">Add a Property</h2>
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
                  value={propertyData.title}
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
                  value={propertyData.location}
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
                  value={propertyData.price}
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
                    value={propertyData.bedroom}
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
                    value={propertyData.bathroom}
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
                  value={propertyData.description}
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
                  value={propertyData.category}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="maxGuest" className="form-label">
                maxGuest:
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="maxGuest"
                  className="form-control"
                  value={propertyData.maxGuest}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Add Property
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
