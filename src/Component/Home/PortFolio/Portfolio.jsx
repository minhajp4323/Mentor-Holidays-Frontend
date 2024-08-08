import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Card,
  CardMedia,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./Portfolio.module.css";

const PortFolio = () => {
  const portfolioImages = [
    "/path/to/image1.jpg", // Replace with actual image paths
    "/path/to/image2.jpg",
    "/path/to/image3.jpg",
    "/path/to/image4.jpg",
  ];

  return (
    <>
      <div className={styles.container}>
        <div>
          <Typography variant="h2" className={styles.title}>
            Our Portfolio
          </Typography>
          <Typography variant="h6" className={styles.subtitle}>
            10 Years of travel moments with our 200000+ happy Customers
          </Typography>

          <Grid container spacing={3} className={styles.portfolioGrid}>
            {portfolioImages.map((image, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={image}
                    alt={`Portfolio image ${index + 1}`}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>

        <div className={styles.footer}>
          <Typography variant="body2">www.mentorholidays.com</Typography>
        </div>
      </div>
    </>
  );
};

export default PortFolio;
