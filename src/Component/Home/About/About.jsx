import React, { useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import img1 from "../../../assets/homeCatergoryDtl/About.1.jpg";
import img2 from "../../../assets/homeCatergoryDtl/About.3.jpg";
import img3 from "../../../assets/homeCatergoryDtl/About.2.jpg";

const aboutSections = [
  {
    title: "Who we are??",
    subtitle: "Mentor Holidays",
    content: `
      Established in 2014, Mentor Holidays has been dedicated to making
      travel dreams come true. With a passion for adventure and a commitment
      to providing exceptional service, we offer a comprehensive range of
      travel solutions to cater to all your needs. Whether you're looking to
      explore exotic destinations, relax at luxurious resorts, or secure
      seamless ticketing for your journeys, we are here to make your travel
      experiences unforgettable.
    `,
  },
  {
    title: "Why Choose Us?",
    content: `
      <h4>Experience and Expertise</h4>
      With a decade of experience in the travel industry, our team of
      experts is well-equipped to handle all your travel needs. We stay
      updated with the latest trends and developments to provide you with
      the best services. <br/><br/>
      <h4>Customer-Centric Approach</h4>
      At Mentor Holidays, our customers are at the heart of everything we
      do. We strive to understand your preferences and requirements,
      ensuring that every trip is tailored to your expectations. <br/><br/>
      <h4>Seamless and Convenient</h4>
      We believe that travel should be stress-free and enjoyable. Our
      streamlined processes and user-friendly services make planning and
      booking your trips a breeze.
    `,
  },
  {
    title: "Our Mission",
    content: `
     Our mission is to inspire and enable people to explore the world, discover new cultures, and create unforgettable memories. We are committed to providing exceptional travel experiences that exceed our clients' expectations. <br/> <br/>
     At Mentor Holidays, we believe in the transformative power of travel. Our goal is to make travel accessible, enriching, and enjoyable for everyone, whether it's a weekend getaway or a month-long expedition. We create personalized travel experiences to cater to each traveler's unique interests. <br/><br/>
     We promote sustainable tourism by partnering with eco-friendly resorts and encouraging responsible travel practices. Our team is dedicated to preserving the beauty and integrity of the destinations we offer.<br/><br/>
     Innovation is at the heart of our mission. We continuously seek out new travel opportunities and leverage the latest technology to provide seamless and efficient services, from easy online booking to 24/7 customer support.<br/><br/>
     Beyond arranging trips, we aim to build a community of travelers who share a love for exploration. Through our travel blogs, social media platforms, and customer feedback channels, we create a space for travelers to connect, share experiences, and inspire each other.
    `,
  },
];

const aboutImages = [
  { src: img1, alt: "About Image 1" },
  { src: img2, alt: "About Image 2" },
  { src: img3, alt: "About Image 3" },
];

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      {aboutSections.map((section, index) => (
        <Box
          key={index}
          sx={{
            background: "linear-gradient(100deg, #1f3c88, #0c164f)",
            padding: "40px 20px",
            color: "white",
            borderRadius: "8px",
            margin: "8px",
            textAlign: "center",
            animation: "fadeIn 2s ease-out",
          }}
        >
          <Typography
            variant={index === 0 ? "h4" : "h3"}
            component={index === 0 ? "h3" : "h1"}
            gutterBottom
            sx={{ fontWeight: index === 0 ? 300 : "bold" }}
          >
            {section.title}
          </Typography>
          {section.subtitle && (
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              {section.subtitle}
            </Typography>
          )}
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.6,
              maxWidth: "800px",
              margin: "0 auto",
            }}
            dangerouslySetInnerHTML={{ __html: section.content }}
          />
        </Box>
      ))}

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
          {aboutImages.map((image, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 350}
            >
              <Box
                component="img"
                src={image.src}
                alt={image.alt}
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
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default React.memo(About);
