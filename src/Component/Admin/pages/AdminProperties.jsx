import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Container,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "../components/Sidebar";
import adminInstance from "../../../Interceptors/AdminInterceptor";

function AdminProperties() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);

  const fetchData = async () => {
    try {
      const response = await adminInstance.get("/admin/properties");
      setProperties(response.data.data);
    } catch (error) {
      console.error("Error fetching properties", error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("admintoken")) {
      navigate("/Admin/Login"); 
    }

    fetchData();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await adminInstance.delete(`/admin/properties/${id}`);
        setProperties(properties.filter((property) => property._id !== id));
      } catch (error) {
        console.error("Error deleting property", error);
      }
    }
  };

  return (
    <div className="d-flex w-full">
      <SideBar />
      <Container style={{ padding: "50px" }}>
        <Grid container spacing={4}>
          {properties.map((property) => (
            <Grid item xs={12} sm={6} md={4} key={property._id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200px"
                  image={property.images[0]}
                  alt={property.title}
                />
                <CardContent>
                  <Typography variant="h6">{property.title}</Typography>
                  <Typography variant="body2">₹{property.price}/-</Typography>
                  <Typography variant="body2">{property.category}</Typography>
                  <Typography variant="body2">
                    <Box component="span" mr={1}>
                      <i className="fas fa-map-marker-alt" />
                    </Box>
                    {property.location}
                  </Typography>
                </CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  px={2}
                  pb={2}
                >
                  <IconButton
                    color="primary"
                    onClick={() =>
                      navigate(`/Admin/EditProperty/${property._id}`)
                    }
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(property._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default AdminProperties;
