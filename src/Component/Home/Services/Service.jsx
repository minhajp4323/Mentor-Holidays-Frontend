import {
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Container,
} from "@mui/material";
import { GiSpookyHouse } from "react-icons/gi";
import { FaPassport, FaTicketAlt } from "react-icons/fa";
import { MdOutlineCardTravel } from "react-icons/md";


const servicesData = [
  {
    // icon: <GiSpookyHouse style={{ fontSize: "5rem" }} />,
    icon: <MdOutlineCardTravel style={{ fontSize: "5rem" }} />,
    
    title: "PACKAGES",
    items: [
      "Domestic Holiday Packages",
      "International Holiday Packages",
      "Adventure & Wildlife",
      "Pilgrimage Packages",
      "Honeymoon Packages",
    ],
  },
  {
    icon: <GiSpookyHouse style={{ fontSize: "5rem" }} />,
    title: "STAYCATION",
    items: [
      "Family Stays",
      "Luxury Resorts",
      "Weekend Getaways",
      "Boutique Hotels",
      "Heritage Hotels",
    ],
  },
  {
    icon: <FaPassport style={{ fontSize: "5rem" }} />,
    title: "GLOBAL SERVICE",
    items: [
      "Global Visa Service",
      "Hajj & Umrah Service",
      "Passport Service",
      "Document Attestation",
      "Travel Insurances",
    ],
  },
  {
    icon: <FaTicketAlt style={{ fontSize: "5rem" }} />,
    title: "TICKETS",
    items: [
      "Air Tickets",
      "Train Tickets",
      "Tatkal Tickets",
      "Bus Tickets",
      "Sightseeing Tickets",
    ],
  },
];

const Services = () => {
  return (
    <>
      <div
        style={{
          background: "linear-gradient(to top right, #3f7acf, #164282)",
          minHeight: "100vh",
          color: "white",
        }}
      >
        <Container
          sx={{
            py: 4,
            maxWidth: "100%",
            paddingLeft: { xs: 2, sm: 3, md: 5, lg: 8 },
            paddingRight: { xs: 2, sm: 3, md: 5, lg: 8 },
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            sx={{ mb: 4, textAlign: "center" }}
          >
            <strong>Our Services</strong>
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {servicesData.map((service, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    textAlign: "left",
                    backgroundImage:
                      "linear-gradient(to bottom right, #1f3c88, #0c164f)",
                    color: "white",
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{ display: "flex", justifyContent: "center", pt: 2 }}
                  >
                    {service.icon}
                  </Box>
                  <Typography
                    variant="h4"
                    component="h3"
                    sx={{ mb: 2, mt: 2, textAlign: "center" }}
                  >
                    <strong>{service.title}</strong>
                  </Typography>
                  <List sx={{ pl: 3 }}>
                    {service.items.map((item, itemIndex) => (
                      <ListItem
                        key={itemIndex}
                        sx={{ pl: 4, position: "relative", py: 1.5 }}
                      >
                        <ListItemText primary={item} />
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
                    ))}
                  </List>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default Services;
