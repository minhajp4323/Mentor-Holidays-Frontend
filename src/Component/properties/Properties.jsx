import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Header from "../navbar/Navbar";
import Footer from "../Admin/components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  TextField, // Import TextField from Material-UI
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

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
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const userId = localStorage.getItem("userid");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3333/api/user/properties"
        );
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
          const wishlistResponse = await axios.get(
            `http://localhost:3333/api/user/${userId}/wishlist`
          );
          const wishlistIds = wishlistResponse.data.data.map(
            (property) => property._id
          );
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
        updateWishlist = updateWishlist.filter(
          (wishId) => wishId !== propertyId
        );
        await axios.delete(
          `http://localhost:3333/api/user/wishlist/${userId}`,
          {
            data: { propertyId },
          }
        );
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setSelectedCategories(typeof value === "string" ? value.split(",") : value);
  };

  const filteredProperties = properties
    .filter((property) => {
      const titleCheck = property.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const propertyCheck = property.category
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const categoryCheck = property.category
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return propertyCheck || titleCheck || categoryCheck;
    })
    .filter(
      (property) =>
        selectedCategories.includes("All") ||
        selectedCategories.includes(property.category)
    );

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
                    <Checkbox
                      checked={selectedCategories.indexOf(category) > -1}
                    />
                    <ListItemText primary={category} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {loading
            ? Array(5)
                .fill()
                .map((_, index) => (
                  <div key={index} className="col-md-4 mb-4">
                    <Card>
                      <Skeleton height={200} />
                      <Card.Body>
                        <Skeleton count={3} />
                      </Card.Body>
                    </Card>
                  </div>
                ))
            : filteredProperties.map((item) => (
                <div key={item._id} className="col-md-3 mb-3">
                  <Card>
                    <Card.Img
                      variant="top"
                      src={item.images[0]}
                      style={{ height: "250px", objectFit: "cover" }}
                    />
                    <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>₹{item.price}/-</Card.Text>
                      <Card.Text>{item.category}</Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => navigate(`/viewproperty/${item._id}`)}
                      >
                        View details
                      </Button>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">
                        <i className="fas fa-map-marker-alt" /> {item.location}
                      </small>
                      <i
                        className={`fas fa-heart ${
                          wishlist.includes(item._id) ? "text-danger" : ""
                        } float-end`}
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
