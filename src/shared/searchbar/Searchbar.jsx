import { Button, Grid, TextField, Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Searchbar.css";

function Searchbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/properties?search=${searchTerm}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div style={{ padding: "30px 0px 0 0" }}>
        <h1>Where to?</h1>
      </div>
      <Box className="mainSearch contentWrapper">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={10}>
            <TextField
              fullWidth
              variant="outlined"
              label="Search places, hotel, and more"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress} // Add onKeyPress event handler
            />
          </Grid>

          <Grid item xs={12} sm={2} sx={{ display: "flex" }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ width: "100%" }}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Searchbar;
