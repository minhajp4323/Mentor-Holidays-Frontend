import { useState } from "react";
import SideBar from "../components/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";

function AddProduct() {
  const [ propertyData, setPropertyData ] = useState({
    title: "",
    location: "",
    price: "",
    images: [],
    description: "",
    category: "",
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
    formData.append("category", propertyData.category);

    for (let i = 0; i < propertyData.images.length; i++) {
      formData.append("images", propertyData.images[i]);
    }

    await axios.post("http://localhost:3333/api/admin/properties", formData);

    toast.success("success");

    //to refill inputs
    setPropertyData({
      title: "",
      location: "",
      price: "",
      images: [],
      description: "",
      category: "",
    });
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
        className="container mt-5 "
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
          <div className="card-body" style={{ color: "yelow" }}>
            <form
               onSubmit={handleSubmit}
            >
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
                  // ref={priceRef}
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
                  // ref={priceRef}
                  className="form-control"
                  value={propertyData.price}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="Images" className="form-label">
                  Image:
                </label>
                <input
                  onChange={handleChange}
                  accept="image/*"
                  type="file"
                  id="images"
                  // ref={imageUrlRef}
                  className="form-control"
                  required multiple
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
                  // ref={categoryRef}
                  className="form-control"
                  value={propertyData.category}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
