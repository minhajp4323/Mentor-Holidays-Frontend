import { useEffect, useState } from "react";
import SideBar from "../components/Sidebar";
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
import adminInstance from "../../../Interceptors/AdminInterceptor";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

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
    setPropertyData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
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
      await adminInstance.post("/admin/properties", formData);
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

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const onDrop = (acceptedFiles) => {
    setPropertyData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...acceptedFiles],
    }));
  };

  const handleImageRemove = (index) => {
    setPropertyData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index),
    }));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div className="d-flex w-full" style={{ display: "flex", justifyContent: "center" }}>
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
            Add a Property
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                id="title"
                value={propertyData.title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Location"
                id="location"
                value={propertyData.location}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Price"
                id="price"
                type="number"
                value={propertyData.price}
                onChange={handleChange}
                required
                inputProps={{ min: "0" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Bedroom"
                id="bedroom"
                type="number"
                value={propertyData.bedroom}
                onChange={handleChange}
                required
                inputProps={{ min: "0" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Bathroom"
                id="bathroom"
                type="number"
                value={propertyData.bathroom}
                onChange={handleChange}
                required
                inputProps={{ min: "0" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Category"
                id="category"
                value={propertyData.category}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Max Guest"
                id="maxGuest"
                value={propertyData.maxGuest}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    label="Description"
                    id="description"
                    multiline
                    rows={4}
                    value={propertyData.description}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={4}>
                  <div
                    {...getRootProps()}
                    style={{
                      border: '2px dashed #3f51b5',
                      padding: '20px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      height: '100%',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <p>Drop the files here ...</p>
                    ) : (
                      <p>Drag 'n' drop some images here, or click to select images</p>
                    )}
                  </div>
                </Grid>
              </Grid>
            </Grid>

            {/* Display selected images outside the drop zone */}
            {propertyData.images.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="h6" component="h3">
                  Selected Images:
                </Typography>
                <Box
                  display="flex"
                  flexWrap="wrap"
                  justifyContent="center"
                  mt={2}
                >
                  {propertyData.images.map((file, index) => (
                    <Box
                      key={index}
                      m={1}
                      width="100px"
                      height="100px"
                      position="relative"
                      onClick={() => handleImageRemove(index)}
                      style={{ cursor: 'pointer' }} // Add a pointer cursor to indicate clickability
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '4px',
                          objectFit: 'cover',
                        }}
                      />
                      {/* Add a remove indicator */}
                      <Box
                        position="absolute"
                        top="0"
                        right="0"
                        bgcolor="rgba(255, 0, 0, 0.5)"
                        color="white"
                        p={0.5}
                        borderRadius="50%"
                        fontSize="0.8rem"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        &times;
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Grid>
            )}

            <Grid item xs={6}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Add Property
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}

export default AddProduct;
