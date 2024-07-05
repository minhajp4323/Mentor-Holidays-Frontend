import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation
import Card from "react-bootstrap/Card";
import Header from "../navbar/Navbar";
import Footer from "../Admin/components/Footer";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import userInstance from "../../Interceptors/UserInterceptors"
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Carousel from "react-material-ui-carousel"; // Import Carousel
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./properties.module.css"; // Import the CSS Module

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function Properties() {
  const location = useLocation(); // Get the location object
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(new URLSearchParams(location.search).get('search') || ""); // Set initial search term from URL
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [hoveredProperty, setHoveredProperty] = useState(null); // State to track hovered property
  const userId = localStorage.getItem("userid");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userInstance.get("/user/properties");
        setProperties(response.data.data);

        const uniqueCategories = [
          "All",
          ...new Set(response.data.data.map((property) => property.category)),
        ];
        setCategories(uniqueCategories);

        const storedWishlist = localStorage.getItem("wishlist");
        if (storedWishlist) {
          setWishlist(JSON.parse(storedWishlist));
        } else if (userId) {
          const wishlistResponse = await userInstance.get(`/user/${userId}/wishlist`);
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

  useEffect(() => {
    if (location.state && location.state.selectedCategory) {
      setSelectedCategories([location.state.selectedCategory]);
    }
  }, [location.state]);

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
        await userInstance.delete(`/user/wishlist/${userId}`, {
          data: { propertyId },
        });
        localStorage.setItem("wishlist", JSON.stringify(updateWishlist));
        toast.error("Removed from Wishlist");
      } else {
        updateWishlist.push(propertyId);
        await userInstance.post(`/user/wishlist/${userId}`, {
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setSelectedCategories(typeof value === "string" ? value.split(",") : value);
  };

  const handleMouseEnter = (propertyId) => {
    setHoveredProperty(propertyId);
  };

  const handleMouseLeave = () => {
    setHoveredProperty(null);
  };

  const filteredProperties = properties
    .filter((property) => {
      const titleCheck = property.title.toLowerCase().includes(searchTerm.toLowerCase());
      const propertyCheck = property.category.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryCheck = property.category.toLowerCase().includes(searchTerm.toLowerCase());
      return propertyCheck || titleCheck || categoryCheck;
    })
    .filter((property) => selectedCategories.includes("All") || selectedCategories.includes(property.category));

  return (
    <>
      <Header />
      <div className="container">
        <h1 className="text-center mt-4 mb-4">All Properties</h1>
        <div className="row justify-content-center">
          <div className="col-md-6 mb-3">
            <TextField
              fullWidth
              variant="outlined"
              label="Search properties..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <FormControl fullWidth>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                multiple
                value={selectedCategories}
                onChange={handleCategoryChange}
                input={<OutlinedInput label="Category" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    <Checkbox checked={selectedCategories.indexOf(category) > -1} />
                    <ListItemText primary={category} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <div className="container ">
        <div className="row">
          {loading
            ? Array(5)
                .fill()
                .map((_, index) => (
                  <div key={index} className="col-md-3 mb-4">
                    <Card>
                      <Skeleton height={200} />
                      <Card.Body>
                        <Skeleton count={3} />
                      </Card.Body>
                    </Card>
                  </div>
                ))
            : filteredProperties.map((item) => (
                <div
                  key={item._id}
                  className="col-md-3 mb-3 "
                  style={{ padding: "5px" }}
                >
                  <Card
                    className={styles.card} // Apply the CSS Module class
                    onMouseEnter={() => handleMouseEnter(item._id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Carousel
                      animation="slide"
                      autoPlay={false}
                      indicators={false}
                      navButtonsAlwaysVisible={hoveredProperty === item._id}
                    >
                      {item.images.map((image, index) => (
                        <Card.Img
                          key={index}
                          variant="top"
                          src={image}
                          style={{ height: "250px", objectFit: "cover" }}
                          onClick={() => navigate(`/viewproperty/${item._id}`)}
                        />
                      ))}
                    </Carousel>
                    <Card.Body onClick={() => navigate(`/viewproperty/${item._id}`)}>
                      <Card.Title style={{ fontSize: "1rem" }}>
                        <strong>{item.title}</strong>
                      </Card.Title>
                      <Card.Text style={{ margin: "0px" }}>
                        ₹{item.price}/-
                      </Card.Text>
                      <Card.Text style={{ margin: "0px" }}>
                        {item.category}
                      </Card.Text>
                      <Card.Text style={{ margin: "0px" }}>
                        Maximum Guest: {item.maxGuest}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">
                        <i className="fas fa-map-marker-alt" /> {item.location}
                      </small>
                      <i
                        className={`fas fa-heart ${wishlist.includes(item._id) ? "text-danger" : ""} float-end`}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleWishlistClick(item._id)}
                      />
                    </Card.Footer>
                  </Card>
                </div>
              ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Properties;
