import { useState } from "react";
import Card from "react-bootstrap/Card";
import { Covers } from "../../assets/StaysDetails";
import styles from "./CardComponent.module.css";

const CardComponent = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredCard(id);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div className={styles.cardWrap}>
      <div className={styles.cardRow}>
        {Covers.map((item) => (
          <div
            key={item.id}
            className={styles.cardContainer}
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={handleMouseLeave}
          >
            <Card
              className={styles.card}
              style={{
                boxShadow:
                  hoveredCard === item.id
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
                src={item.image}
                style={{
                  height: "280px",
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                  transition: "opacity 0.3s ease-in-out",
                  opacity: hoveredCard === item.id ? 0.9 : 1,
                }}
              />
              <div className={styles.cardInfo}>
                <h3>{item.category}</h3>
              </div>
              <div className={styles.cardBg} />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardComponent;
