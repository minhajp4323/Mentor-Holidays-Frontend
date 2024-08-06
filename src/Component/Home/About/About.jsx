import { useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import img1 from "../../../assets/homeCatergoryDtl/About.1.jpg";
import img2 from "../../../assets/homeCatergoryDtl/About.3.jpg";
import img3 from "../../../assets/homeCatergoryDtl/About.2.jpg";

import Header from "../../navbar/Navbar";
import Footer from "../../Admin/components/Footer";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <Header />
      <Box
        sx={{
          background: "linear-gradient(100deg, #1f3c88, #0c164f)",
          padding: "40px 20px",
          color: "white",
          borderRadius: "8px",
          margin: "8px",
          textAlign: "center",
          animation: "fadeIn 0.8s ease-out",
        }}
      >
        <Typography
          variant="h4"
          component="h3"
          gutterBottom
          sx={{ fontWeight: 300 }}
        >
          Who we are??
        </Typography>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          World Best Travel Group
        </Typography>
        <Typography
          variant="body1"
          sx={{
            lineHeight: 1.6,
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          Mentor Holidays is a premier travel company dedicated to crafting
          unforgettable journeys and experiences for groups and colleges. We
          specialize in offering a diverse range of travel services, including
          meticulously planned tour packages, luxurious resort bookings, and
          convenient train ticket reservations. Our mission is to provide
          seamless and enriching travel experiences, ensuring every trip is
          memorable and hassle-free.
        </Typography>
      </Box>

      <Box
        sx={{
          background: "linear-gradient(100deg, #1f3c88, #0c064f)",
          borderRadius: "8px",
          margin: "8px",
          padding: "20px",
          animation: "fadeIn 0.8s ease-out",
        }}
      >
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4} data-aos="fade-up">
            <Box
              component="img"
              src={img1}
              alt="About Image 1"
              sx={{
                width: "100%",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} data-aos="fade-up" data-aos-delay="350">
            <Box
              component="img"
              src={img2}
              alt="About Image 2"
              sx={{
                width: "100%",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} data-aos="fade-up" data-aos-delay="700">
            <Box
              component="img"
              src={img3}
              alt="About Image 3"
              sx={{
                width: "100%",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default About;
