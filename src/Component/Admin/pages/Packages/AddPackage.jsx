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
import { useDropzone } from "react-dropzone"; // Import useDropzone
import adminInstance from "../../../../Interceptors/AdminInterceptor";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

function AddPackage() {
  const [PackageData, setPackageData] = useState({
    destination: "",
    duration: "",
    category: "",
    price: "",
    images: [],
    description: "",
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPackageData((prevData) => ({
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
    setLoading(true); 

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
    } finally {
      setLoading(false); 
    }
  };

  const onDrop = (acceptedFiles) => {
    setPackageData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...acceptedFiles],
    }));
  };

  const handleImageRemove = (index) => {
    setPackageData((prevData) => {
      const newImages = prevData.images.filter((_, i) => i !== index);
      return {
        ...prevData,
        images: newImages,
      };
    });
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Set up the dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

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
                label="Destination"
                id="destination"
                value={PackageData.destination}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Duration"
                id="duration"
                value={PackageData.duration}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Category"
                id="category"
                value={PackageData.category}
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
            <Grid item xs={12}>
              <div {...getRootProps({ className: "dropzone" })} style={{ border: "2px dashed #ccc", padding: "20px", textAlign: "center" }}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the images here ...</p>
                ) : (
                  <p>Drag 'n' drop some images here, or click to select files</p>
                )}
              </div>
              <Box display="flex" flexWrap="wrap" mt={2}>
                {PackageData.images.map((file, index) => (
                  <Box
                    key={index}
                    position="relative"
                    m={1}
                    border="1px solid #ccc"
                    borderRadius="4px"
                    overflow="hidden"
                    width={100}
                    height={100}
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`preview-${index}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <Button
                      onClick={() => handleImageRemove(index)}
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: 'red',
                        color: 'white',
                      }}
                    >
                      X
                    </Button>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading} 
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Add Package"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}

export default AddPackage;
