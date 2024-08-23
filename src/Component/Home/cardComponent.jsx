import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Skeleton from "@mui/material/Skeleton";
import styles from "./CardComponent.module.css";
import userInstance from "../../Interceptors/UserInterceptors";


const CardComponent = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userInstance.get("/user/properties");
        setProperties(response.data.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false); 
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 14000); 
    return () => clearInterval(intervalId);
  }, []);

  const handleMouseEnter = (id) => {
    setHoveredCard(id);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const handleCardClick = (category) => {
    navigate("/properties", { state: { selectedCategory: category } });
  };
  
  // Extract unique categories and limit to 4
  const uniqueCategories = [...new Set(properties.map((property) => property.category))].slice(0, 4);

  return (
    <div className={styles.cardWrap}>
      <div className={styles.cardRow}>
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={styles.cardContainer}>
              <Card className={styles.card}>
                <Skeleton variant="rectangular" width="220px" height={280} animation="wave" />
                <div className={styles.cardInfo}>
                  <Skeleton variant="text" width="80%" height={40} animation="wave" />
                </div>
              </Card>
            </div>
          ))
        ) : (
          // Render actual data when loaded
          uniqueCategories.map((category) => {
            const property = properties.find((property) => property.category === category);
            return (
              <div
                key={property._id}
                className={styles.cardContainer}
                onMouseEnter={() => handleMouseEnter(property._id)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleCardClick(property.category)}
              >
                <Card
                  className={styles.card}
                  style={{
                    boxShadow:
                      hoveredCard === property._id
                        ? `rgba(255, 255, 255, 0.2) 10px 10px 10px 1px,
                           rgba(255, 255, 255, 1) 0px 0px 0px 0px,
                           rgba(0, 0, 0, 0.66) 5px 5px 10px 1px,
                           inset #333 0 0 0 5px,
                           inset white 0 0 0 6px`
                        : `rgba(0, 5, 0, 0.66) 5px 5px 10px 1px,
                           inset #333 0 0 0 5px`,
                    transition: "box-shadow 0.2s ease-in-out",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={property.images[0]}
                    style={{
                      height: "280px",
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "10px",
                      transition: "opacity 0.3s ease-in-out",
                      opacity: hoveredCard === property._id ? 0.9 : 1,
                    }}
                  />
                  <div className={styles.cardInfo}>
                    <h5>{property.category}</h5>
                  </div>
                  <div className={styles.cardBg} />
                </Card>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CardComponent;
