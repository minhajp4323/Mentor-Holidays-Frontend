import { useEffect, useState } from "react";
import SideBar from "../../components/Sidebar";
import { toast } from "react-toastify";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import adminInstance from "../../../../Interceptors/AdminInterceptor";
import { useNavigate } from "react-router-dom";

function AddPackage() {
  const [PackageData, setPackageData] = useState({
    destination: "",
    duration: "",
    category: "",
    price: "",
    images: [],
    description: "",
  });

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

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("admintoken")) {
      navigate("/Admin/Login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("destination", PackageData.destination);
    formData.append("duration", PackageData.duration);
    formData.append("category", PackageData.category);
    formData.append("price", PackageData.price);

    formData.append("description", PackageData.description);

    for (let i = 0; i < PackageData.images.length; i++) {
      formData.append("images", PackageData.images[i]);
    }

    try {
      await adminInstance.post("/admin/package", formData);
      toast.success("Package added successfully");

      // Reset form inputs
      setPackageData({
        destination: "",
        duration: "",
        category: "",
        price: "",
        images: [],
        description: "",
      });
    } catch (error) {
      toast.error("Error adding Package");
    }
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div
      className="d-flex w-full"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <SideBar />
      <Paper
        elevation={3}
        style={{
          padding: "10px",
          marginTop: isSmallScreen ? "10px" : "20px",
          width: "90%",
        }}
      >
        <Box textAlign="center" mt={1}>
          <Typography variant="h4" component="h2">
            Add a Package
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="destination"
                id="destination"
                value={PackageData.destination}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="duration"
                id="duration"
                value={PackageData.duration}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="category"
                id="category"
                value={PackageData.category}
                onChange={handleChange}
                required
                // inputProps={{ min: "0" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="price"
                id="price"
                type="number"
                value={PackageData.price}
                onChange={handleChange}
                required
                inputProps={{ min: "0" }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                id="description"
                multiline
                rows={4}
                value={PackageData.description}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <input
                accept="image/*"
                id="images"
                type="file"
                multiple
                onChange={handleChange}
                style={{ display: "none" }}
              />
              <label htmlFor="images">
                <Button variant="contained" component="span" fullWidth>
                  Upload Images
                </Button>
              </label>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Add Package
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}

export default AddPackage;
