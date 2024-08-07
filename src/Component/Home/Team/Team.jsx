import { Box, Typography, Grid, Avatar } from "@mui/material";
import Header from "../../navbar/Navbar";
import Haris from "../../../assets/Team/Haris.jpg";
import Minhaj from "../../../assets/Team/Minhaj.jpg";
import Rashid from "../../../assets/Team/Rashid.jpg";
import Anvar from "../../../assets/Team/Anvar.jpg";
import Naushad from "../../../assets/Team/Naushad.jpg";
import Adil from "../../../assets/Team/Adil.jpg";
import Ashif from "../../../assets/Team/Ashif.jpg";
import Baheej from "../../../assets/Team/Baheej.jpg";
import Danish from "../../../assets/Team/Danish.jpg";
import Mubarish from "../../../assets/Team/Mubarish.jpg";
import Rishan from "../../../assets/Team/Rishan.jpg";
import Swalih from "../../../assets/Team/Swalih.jpg";
import mentorLogo from "../../../assets/Mentor Long Logo White.png";

const teamMembers = [
  {
    name: "Anvar Sadhiq",
    role: "Manager",
    image: Anvar,
  },
  {
    name: "Mohd Swalih",
    role: "Operations Manager",
    image: Swalih,
  },
  {
    name: "Mohd Rashid",
    role: "Sales Manager",
    image: Rashid,
  },
  {
    name: "Noushad P.K",
    role: "Marketing Manager",
    image: Naushad,
  },
  {
    name: "Rishan P.K",
    role: "Marketing Manager",
    image: Rishan,
  },
  {
    name: "Mohd Danish",
    role: "Mentor",
    image: Danish,
  },
  {
    name: "Adil A",
    role: "Mentor",
    image: Adil,
  },
  {
    name: "Mubarish E",
    role: "Mentor",
    image: Mubarish,
  },
  {
    name: "Ashif P",
    role: "Global Visa, Hajj & Umrah Dept",
    image: Ashif,
  },
  {
    name: "Baheej P",
    role: "Air and Ticketing Dept",
    image: Baheej,
  },
  {
    name: "Minhaj P",
    role: "Resort, Hotel & Cruise Booking Dept",
    image: Minhaj,
  },
];

const Team = () => {
  return (
    <>
      <Header />
      <div>
        {/* Founder Section */}
        <Box
          sx={{
            background: "linear-gradient(100deg, #1f3c88, #0c164f)",
            color: "white",
            padding: "2rem",
            borderRadius: "8px",
            textAlign: "center",
            margin: "8px",
            animation: "fadeIn 0.8s ease-out",
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            <strong>Founder</strong>
          </Typography>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    // boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
                  },
                  padding: "1rem",
                  borderRadius: "8px",
                  animation: "fadeIn 0.8s ease-out",
                }}
              >
                <Avatar
                  alt="Muhammed Haris"
                  src={Haris}
                  sx={{
                    width: 220,
                    height: 220,
                    margin: "auto",
                    boxShadow: "0px 4px 20px rgba(1, 1, 10, 03)",
                  }}
                />
              </Box>
              <Typography
                variant="h6"
                component="h2"
                sx={{ marginTop: "1rem" }}
              >
                Muhammed Haris
              </Typography>
              <Typography variant="body1">Managing Director</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body1" sx={{ textAlign: "left" }}>
                ` Hello, I`m Muhammed Haris. As the Managing Director of Mentor
                Holidays, I am a seasoned professional with a proven track
                record of success in the travel industry. With over 10 years of
                experience in managing and growing travel businesses, I bring a
                wealth of knowledge and expertise to my role. My strategic
                vision and strong leadership skills have been instrumental in
                driving Mentor Holidays to new heights of success. I am
                committed to delivering exceptional service and creating
                unforgettable experiences for our clients. I am dedicated to
                ensuring that Mentor Holidays remains a leader in the industry.
                I am passionate about travel and committed to providing our
                customers with the highest quality of services. I look forward
                to continuing to lead Mentor Holidays to even greater success in
                the future.`
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            background: "linear-gradient(40deg, #1f3c88, #0c164f)",
            color: "white",
            padding: "2rem",
            borderRadius: "8px",
            textAlign: "center",
            margin: "8px",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Our Team
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      //   boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
                    },
                    padding: "1rem",
                    borderRadius: "8px",
                    animation: "fadeIn 0.8s ease-out",
                  }}
                >
                  <Avatar
                    alt={member.name}
                    src={member.image}
                    sx={{
                      width: 200,
                      height: 200,
                      margin: "auto",
                      boxShadow: "0px 4px 20px rgba(1, 1, 10, 03)",
                    }}
                  />
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{ marginTop: "1rem" }}
                  >
                    {member.name}
                  </Typography>
                  <Typography variant="body1">{member.role}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          <div className="d flex justify-center" style={{ height: "4vh" }}>
            <img src={mentorLogo} alt="wq" />
          </div>
        </Box>
      </div>
    </>
  );
};

// Keyframes for fade-in animation

export default Team;
