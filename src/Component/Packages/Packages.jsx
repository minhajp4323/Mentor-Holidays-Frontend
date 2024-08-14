import { useState } from "react";
// import { useNavigate } from "react-router-dom";
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
import userInstance from "../../Interceptors/UserInterceptors";

function Packages() {
//   const navigate = useNavigate();
  const [packages, setPackage] = useState([]);

  const fetchData = async () => {
    try {
      const response = await userInstance.get("/admin/package");
      setPackage(response.data.data);
    } catch (error) {
      console.error("Error fetching properties", error);
    }
  };
  fetchData();


 

  //   const handleDelete = async (id) => {
  //     if (window.confirm("Are you sure you want to delete this property?")) {
  //       try {
  //         await adminInstance.delete(`/admin/properties/${id}`);
  //         setPackage(packages.filter((package) => package._id !== id));
  //       } catch (error) {
  //         console.error("Error deleting property", error);
  //       }
  //     }
  //   };

  return (
    <div className="d-flex w-full">
      <Container style={{ padding: "50px" }}>
        <Grid container spacing={4}>
          {packages.map((packages) => (
            <Grid item xs={12} sm={6} md={4} key={packages._id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200px"
                  image={packages.images[0]}
                  alt={packages.destination}
                />
                <CardContent>
                  <Typography variant="body2">
                    {packages.destination} - {packages.duration} day
                  </Typography>
                  <Typography variant="body2">₹{packages.price}/-</Typography>
                  <Typography variant="body2">{packages.category}</Typography>
                  {/* <Typography variant="body2">
                    <Box component="span" mr={1}>
                      <i className="fas fa-map-marker-alt" />
                    </Box>
                    {packages.location}
                  </Typography> */}
                </CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  px={2}
                  pb={2}
                >
                  <IconButton
                    color="primary"
                    // onClick={() =>
                    //   navigate(`/Admin/EditProperty/${packages._id}`)
                    // }
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    // onClick={() => handleDelete(packages._id)}
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

export default Packages;
