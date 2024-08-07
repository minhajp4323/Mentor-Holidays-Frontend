import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";

const socialLinks = [
  {
    icon: "facebook-f",
    href: "https://www.facebook.com/profile.php?id=100063877939367",
  },
  {
    icon: "google",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=mentorholidays@gmail.com&su=Inquiry&body=Hello, I would like to know more about...",
  },
  { icon: "instagram", href: "https://www.instagram.com/mentorholidays/" },
  { icon: "whatsapp", href: "https://wa.me/9072107041" },
];

const topPackages1 = ["GOA", "BANGALORE", "KOCHI", "CHENNAI", "HYDERABAD"];

const topPackages2 = ["MALAYSIA", "MALDIVES", "THAILAND", "BANGKOK"];

export default function Footer() {
  return (
    <MDBFooter
      bgColor="primary"
      className="text-white text-center text-lg-left"
      style={{ paddingTop: "3%", backgroundColor: "#1d9a5b", margin: "0px" }} // Slightly lighter shade
    >
      {socialLinks.map((link, index) => (
        <MDBBtn
          key={index}
          outline
          color="light"
          floating
          className="ml-5 mr-5"
          href={link.href}
          role="button"
        >
          <MDBIcon fab icon={link.icon} />
        </MDBBtn>
      ))}

      <MDBContainer className="p-4">
        <MDBRow>
          <MDBCol lg="6" md="12" className="mb-4 mb-md-0">
            <section className="mb-4"></section>
            <h5 className="text-uppercase"></h5>

            <p>
              Mentor Holidays stands out as a trusted partner for wanderlust
              enthusiasts looking to explore the world. Embark on your next
              adventure with Mentor Holidays and let their expertise elevate
              your travel experience.
            </p>
          </MDBCol>

          <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
            <h5 className="text-uppercase">Top Packages</h5>

            <ul className="list-unstyled mb-0">
              {topPackages1.map((packageName, index) => (
                <li key={index}>
                  <a href="#!" className="text-white">
                    {packageName}
                  </a>
                </li>
              ))}
            </ul>
          </MDBCol>

          <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-0">Top Packages</h5>

            <ul className="list-unstyled">
              {topPackages2.map((packageName, index) => (
                <li key={index}>
                  <a href="#!" className="text-white">
                    {packageName}
                  </a>
                </li>
              ))}
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <div className="text-center p-3" style={{ backgroundColor: "#243056" }}>
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <a className="text-white" href="">
          mentorholidays.com
        </a>
      </div>
    </MDBFooter>
  );
}
