import { Button, Grid, TextField, Box } from "@mui/material";
import "./Searchbar.css";

function Searchbar() {
  return (
    <>
      <div style={{ padding: "30px 0px 0 0" }}>
        <h1>Where to?</h1>
      </div>
      <Box className="mainSearch contentWrapper">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              variant="outlined"
              label="Search places, hotel, and more"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth variant="outlined" type="date"  />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField fullWidth  variant="outlined" type="number" label="No. of guest" />
          </Grid>
          <Grid item xs={12} sm={3} sx={{ display: 'flex' }}>
            <Button variant="contained" color="primary" fullWidth sx={{ width: '100%' }}>
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Searchbar;
