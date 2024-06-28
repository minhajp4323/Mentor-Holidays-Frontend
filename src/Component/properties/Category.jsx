import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Header from "../navbar/Navbar";
import Footer from "../Admin/components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Category() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const userId = localStorage.getItem("userid");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3333/api/user/properties");
        setProperties(response.data.data);

        // Extract unique categories from properties
        const uniqueCategories = ["All", ...new Set(response.data.data.map((property) => property.category))];
        setCategories(uniqueCategories);

        const storedWishlist = localStorage.getItem("wishlist");
        if (storedWishlist) {
          setWishlist(JSON.parse(storedWishlist));
        } else if (userId) {
          const wishlistResponse = await axios.get(`http://localhost:3333/api/user/${userId}/wishlist`);
          const wishlistIds = wishlistResponse.data.data.map((property) => property._id);
          setWishlist(wishlistIds);
          localStorage.setItem("wishlist", JSON.stringify(wishlistIds));
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  const handleWishlistClick = async (propertyId) => {
    if (!userId) {
      toast.error("Please log in to add to the wishlist");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      return;
    }

    try {
      let updateWishlist = [...wishlist];
      if (updateWishlist.includes(propertyId)) {
        updateWishlist = updateWishlist.filter((wishId) => wishId !== propertyId);
        await axios.delete(`http://localhost:3333/api/user/wishlist/${userId}`, {
          data: { propertyId },
        });
        localStorage.setItem("wishlist", JSON.stringify(updateWishlist));
        toast.error("Removed from Wishlist");
      } else {
        updateWishlist.push(propertyId);
        await axios.post(`http://localhost:3333/api/user/wishlist/${userId}`, {
          propertyId,
        });
        toast.success("Property added to wishlist");
      }

      setWishlist(updateWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updateWishlist));
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast.error("Error updating wishlist");
    }
  };

  const filteredProperties = selectedCategory === "All"
    ? properties
    : properties.filter((property) => property.category === selectedCategory);

  return (
    <>
      <Header />
      <h1 style={{ textAlign: "center", paddingTop: "20px" }}>{selectedCategory}</h1>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "1rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="homeMain">
        {loading
          ? Array(5)
              .fill()
              .map((_, index) => (
                <Card key={index} style={{ margin: 20, width: "18rem" }}>
                  <Skeleton height={200} />
                  <Card.Body>
                    <Skeleton count={3} />
                    <Skeleton width="60%" />
                  </Card.Body>
                </Card>
              ))
          : filteredProperties.map((items) => (
              <Card key={items._id} style={{ margin: 20, width: "18rem", position: "relative" }}>
                <i
                  className={`fas fa-heart ${wishlist.includes(items._id) ? "wishlist-active" : ""}`}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    color: wishlist.includes(items._id) ? "red" : "black",
                    cursor: "pointer",
                    fontSize: "1.5rem",
                  }}
                  onClick={() => handleWishlistClick(items._id)}
                />
                <Card.Img variant="top" src={items.images[0]} style={{ height: "200px", objectFit: "cover" }} />
                <Card.Body>
                  <Card.Title>{items.title}</Card.Title>
                  <Card.Text>₹{items.price}/-</Card.Text>
                  <Card.Text>{items.category}</Card.Text>
                  <Card.Text>
                    <i className="fas fa-map-marker-alt" /> {items.location}
                  </Card.Text>
                  <Button variant="primary" onClick={() => navigate(`/viewproperty/${items._id}`)}>
                    View details
                  </Button>
                </Card.Body>
              </Card>
            ))}
      </div>
      <Footer />
    </>
  );
}

export default Category;
