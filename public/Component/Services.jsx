import React from "react";

const Services = ({ styles }) => {
  return (
    <div>

   
      <div style={local.hero}>
        <div style={local.overlay}></div>
        <div style={local.heroContent}>
          <h1>Our Services</h1>
          <p>
            From custom cakes to large events, YazhBakes delivers happiness
            through premium baking crafted with love and perfection.
          </p>
        </div>
      </div>

      <div style={styles.container}>

      
        <h2>What We Offer</h2>

        <div style={local.cardGrid}>
          {[
            ["Custom Cakes", "Personalized cake designs", "Any theme or occasion", "Fresh ingredients always used"],
            ["Wedding Cakes", "Elegant multi-tier cakes", "Designed for celebrations", "Premium finishing & taste"],
            ["Cupcakes", "Soft & creamy cupcakes", "Multiple flavors available", "Perfect for small events"],
            ["Cookies", "Crunchy & soft cookies", "Chocolate & nut varieties", "Freshly baked daily"],
            ["Party Orders", "Bulk cake orders available", "Perfect for events", "On-time delivery guaranteed"],
            ["Delivery Service", "Fast doorstep delivery", "Safe packaging ensured", "City-wide coverage"],
            ["Birthday Cakes", "Custom birthday themes", "Kids & adult designs", "Fresh & creamy layers"],
            ["Dessert Boxes", "Mixed dessert collections", "Perfect gift option", "Premium quality sweets"]
          ].map((item, i) => (
            <div key={i} style={local.card}>
              <h3>{item[0]}</h3>
              <p>{item[1]}</p>
              <p>{item[2]}</p>
              <p>{item[3]}</p>
            </div>
          ))}
        </div>

       
        <h2 style={{ marginTop: "50px" }}>Our Process</h2>

        <div style={local.flow}>
          {[
            ["1", "Order Placement"],
            ["2", "Design Selection"],
            ["3", "Preparation"],
            ["4", "Baking Process"],
            ["5", "Quality Check"],
            ["6", "Delivery"]
          ].map((step, i) => (
            <React.Fragment key={i}>
              <div style={local.flowBox}>
                <h3>{step[0]}</h3>
                <p>{step[1]}</p>
              </div>

              {i !== 5 && <div style={local.arrow}>➜</div>}
            </React.Fragment>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Services;



const local = {
  
  hero: {
    height: "260px",
    background:
      "url('https://images.unsplash.com/photo-1559628233-100c798642d4?q=80&w=1200') center/cover",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    color: "#fff",
    textAlign: "center"
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)"
  },

  heroContent: {
    zIndex: 1,
    maxWidth: "600px"
  },

  
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "20px"
  },

  card: {
    background: "#333",
    color: "#fff",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    minHeight: "180px"
  },

 
  flow: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    marginTop: "20px"
  },

  flowBox: {
    background: "#222",
    color: "#fff",
    padding: "15px",
    borderRadius: "10px",
    minWidth: "140px",
    textAlign: "center"
  },

  arrow: {
    fontSize: "20px",
    color: "#ff4d6d"
  }
};