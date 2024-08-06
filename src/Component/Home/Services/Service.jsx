import React from "react";
import { Box, Typography, List, ListItem, ListItemText, Container } from "@mui/material";
import Header from "../../navbar/Navbar";
import { GiSpookyHouse } from "react-icons/gi";

const Services = () => {
  return (
    <>
      <Header />
      <div
        style={{
          background: "linear-gradient(to bottom right, #0c164f, #1f3c88)",
          minHeight: "100vh",
          color: "white",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "transparent", // Remove background color to allow gradient to show
            color: "white",
            py: 4,
            mx: 0, // Remove default horizontal margins
            maxWidth: "100%", // Ensure the container uses full width
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            sx={{ mb: 2, textAlign: "center" }}
          >
            Our Services
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              width: "100%",
              maxWidth: 1200,
            }}
          >
            <Box
              sx={{
                flex: 1,
                m: 1,
                minWidth: 280,
                maxWidth: 400,
                p: 2,
                borderRadius: 2,
                textAlign: "left",
                backgroundImage: "linear-gradient(to bottom right, #1f3c88, #0c164f)",
                color: "white",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <GiSpookyHouse style={{ fontSize: "5rem" }} />
              </Box>
              <Typography
                variant="h4"
                component="h3"
                sx={{ mb: 2, textAlign: "center" }}
              >
                PACKAGES
              </Typography>
              <List sx={{ padding: 0 }}>
                <ListItem sx={{ pl: 3, position: "relative", py: 1 }}>
                  <ListItemText primary="Domestic Tour Packages" />
                  <Box
                    sx={{
                      content: '""',
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "0.8em",
                      height: "0.8em",
                      borderRadius: "50%",
                      border: "2px solid white",
                    }}
                  />
                </ListItem>
                <ListItem sx={{ pl: 3, position: "relative", py: 1 }}>
                  <ListItemText primary="International Tour Packages" />
                  <Box
                    sx={{
                      content: '""',
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "0.8em",
                      height: "0.8em",
                      borderRadius: "50%",
                      border: "2px solid white",
                    }}
                  />
                </ListItem>
                <ListItem sx={{ pl: 3, position: "relative", py: 1 }}>
                  <ListItemText primary="Students Group Packages" />
                  <Box
                    sx={{
                      content: '""',
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "0.8em",
                      height: "0.8em",
                      borderRadius: "50%",
                      border: "2px solid white",
                    }}
                  />
                </ListItem>
                <ListItem sx={{ pl: 3, position: "relative", py: 1 }}>
                  <ListItemText primary="Corporate Tour Packages" />
                  <Box
                    sx={{
                      content: '""',
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "0.8em",
                      height: "0.8em",
                      borderRadius: "50%",
                      border: "2px solid white",
                    }}
                  />
                </ListItem>
                <ListItem sx={{ pl: 3, position: "relative", py: 1 }}>
                  <ListItemText primary="LTC Tour Packages" />
                  <Box
                    sx={{
                      content: '""',
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "0.8em",
                      height: "0.8em",
                      borderRadius: "50%",
                      border: "2px solid white",
                    }}
                  />
                </ListItem>
                <ListItem sx={{ pl: 3, position: "relative", py: 1 }}>
                  <ListItemText primary="Honeymoon Packages" />
                  <Box
                    sx={{
                      content: '""',
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "0.8em",
                      height: "0.8em",
                      borderRadius: "50%",
                      border: "2px solid white",
                    }}
                  />
                </ListItem>
              </List>
            </Box>
            <Box
              sx={{
                flex: 1,
                m: 1,
                minWidth: 280,
                maxWidth: 400,
                p: 2,
                borderRadius: 2,
                textAlign: "left",
                backgroundImage: "linear-gradient(to bottom right, #1f3c88, #0c164f)",
                color: "white",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <GiSpookyHouse style={{ fontSize: "5rem" }} />
              </Box>
              <Typography
                variant="h4"
                component="h3"
                sx={{ mb: 2, textAlign: "center" }}
              >
                STAYCATION
              </Typography>
              <List sx={{ padding: 0 }}>
                <ListItem sx={{ pl: 3, position: "relative", py: 1 }}>
                  <ListItemText primary="Resort Booking" />
                  <Box
                    sx={{
                      content: '""',
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "0.8em",
                      height: "0.8em",
                      borderRadius: "50%",
                      border: "2px solid white",
                    }}
                  />
                </ListItem>
                <ListItem sx={{ pl: 3, position: "relative", py: 1 }}>
                  <ListItemText primary="Hotel Booking" />
                  <Box
                    sx={{
                      content: '""',
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "0.8em",
                      height: "0.8em",
                      borderRadius: "50%",
                      border: "2px solid white",
                    }}
                  />
                </ListItem>
                <ListItem sx={{ pl: 3, position: "relative", py: 1 }}>
                  <ListItemText primary="Houseboat Booking" />
                  <Box
                    sx={{
                      content: '""',
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "0.8em",
                      height: "0.8em",
                      borderRadius: "50%",
                      border: "2px solid white",
                    }}
                  />
                </ListItem>
                <ListItem sx={{ pl: 3, position: "relative", py: 1 }}>
                  <ListItemText primary="Cruise Booking" />
                  <Box
                    sx={{
                      content: '""',
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "0.8em",
                      height: "0.8em",
                      borderRadius: "50%",
                      border: "2px solid white",
                    }}
                  />
                </ListItem>
                <ListItem sx={{ pl: 3, position: "relative", py: 1 }}>
                  <ListItemText primary="Camp Booking" />
                  <Box
                    sx={{
                      content: '""',
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "0.8em",
                      height: "0.8em",
                      borderRadius: "50%",
                      border: "2px solid white",
                    }}
                  />
                </ListItem>
              </List>
            </Box>
          </Box>
          <Typography variant="body1" sx={{ mt: 2 }}>
            www.mentorholidays.com
          </Typography>
        </Container>
      </div>
    </>
  );
};

export default Services;
