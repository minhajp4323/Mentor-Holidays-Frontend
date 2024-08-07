import {
  MDBCard,
  MDBCardBody,
  MDBCarousel,
  MDBCarouselItem,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
} from "mdb-react-ui-kit";

export default function Testimonial() {
  const testiData = [
    {
      name: "Reena Naushad",
      photo:
        "https://img.freepik.com/premium-photo/male-female-profile-avatar-user-avatars-gender-icons_1020867-74940.jpg",
      position: "Asst.Prof Unity Womens College",
      saying: `Thank You Haris.. For all genuine Care and
                                apprehensions towards all my girls. Looking forward
                                to another wonderful trip. In shah allah,`,
    },
    {
      name: "Basila KP",
      photo:
        "https://static.vecteezy.com/system/resources/previews/001/993/889/non_2x/beautiful-latin-woman-avatar-character-icon-free-vector.jpg",
      position: "Devaki Amma College",
      saying: `It was really an amazing experience with team MENTOR HOLIDAYS. They just stole our heart.. There is no need of writing or saying more and more.. All are rooted on our mind.. Big thanks to each and everyone of your team,`,
    },
    {
      name: "Janeesha",
      photo:
        "https://www.svgrepo.com/show/382099/female-avatar-girl-face-woman-user-2.svg",
      position: "Asst.Prof PSMO College Thirurangadi",
      saying: `We returned from Mysore, Kuttees loved the room. Thank you for the timely help,`,
    },
  ];

  return (
    <MDBContainer fluid className="py-5 gradient-custom">
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="12">
          <div className="text-center mb-4 pb-2">
            <MDBIcon fas icon="quote-left" size="6x" className="text-blue" />
          </div>
          <MDBCard>
            <MDBCardBody className="px-4 py-5">
              <MDBCarousel showIndicators showControls dark>
                {testiData.map((data, index) => (
                  <MDBCarouselItem
                    key={index}
                    className={index === 0 ? "active" : ""}
                  >
                    <MDBRow className="d-flex justify-content-center">
                      <MDBCol lg="10" xl="8">
                        <MDBRow>
                          <MDBCol
                            lg="4"
                            className="d-flex justify-content-center"
                          >
                            <img
                              src={data.photo}
                              className="rounded-circle shadow-1 mb-4 mb-lg-0"
                              alt="avatar"
                              width="150"
                              height="150"
                            />
                          </MDBCol>
                          <MDBCol
                            md="9"
                            lg="7"
                            xl="8"
                            className="text-center text-lg-start mx-auto mx-lg-0"
                          >
                            <h4 className="mb-4">
                              {data.name} - {data.position}
                            </h4>
                            <p className="mb-0 pb-3">{data.saying}</p>
                          </MDBCol>
                        </MDBRow>
                      </MDBCol>
                    </MDBRow>
                  </MDBCarouselItem>
                ))}
              </MDBCarousel>
            </MDBCardBody>
          </MDBCard>
          <div className="text-center mt-4 pt-2">
            <MDBIcon fas icon="quote-right" size="3x" className="text-blue" />
          </div>
        </MDBCol>
      </MDBRow>
      <style>{`
          .carousel-indicators {
            bottom: 0; /* Adjust as needed */
            z-index: 1; /* Ensure it's below the text */
          }
          .carousel-inner {
            padding-bottom: 50px; /* Adjust to create space for indicators */
          }
        `}</style>
    </MDBContainer>
  );
}
