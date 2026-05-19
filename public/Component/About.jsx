import React from "react";

const About = ({ styles }) => {
  return (
    <div>

    
      <div style={local.hero}>
        <div style={local.overlay}></div>
        <h1 style={local.heroText}>About YazhBakes</h1>
      </div>

      <div style={styles.container}>

       
        <div style={local.splitSection}>
          <img
            src="https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800"
            style={local.image}
          />
          <div style={{ maxWidth: "500px" }}>
            <h2>Our Journey</h2>
            <p>
              YazhBakes started in 2000 as a small home bakery in Coimbatore.
              With passion and dedication, it became a trusted local brand.
              We expanded into custom cakes, wedding cakes, and event orders.
              Our focus on quality and creativity helped us grow steadily.
              Today, we are known for delivering happiness through baking.
            </p>
          </div>
        </div>

      
        <div style={local.cardRow}>
          <div style={local.card}>
            <h3>🌟 Vision</h3>
            <p>To be the most loved bakery brand known for quality and creativity.</p>
          </div>
          <div style={local.card}>
            <h3>🎯 Mission</h3>
            <p>Deliver fresh, high-quality baked goods with excellent service.</p>
          </div>
        </div>

        
        <h2 style={{ marginTop: "40px", textAlign: "center" }}>Our Creations</h2>
        <div style={local.gallery}>
          {[
            "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800",
            "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=800",
            "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800",
            "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=800"
          ].map((img, i) => (
            <div key={i} style={local.imgWrapper}>
              <img
                src={img}
                style={local.galleryImg}
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/300")
                }
              />
            </div>
          ))}
        </div>


        <div style={styles.sectionBox}>
          <h2 style={{ textAlign: "center" }}>Achievements</h2>

          <div style={local.achieveWrap}>
            <ul style={local.achieveList}>
              <li>🏆 Best Bakery Award (2012)</li>
              <li>🎂 10,000+ Customers Served</li>
              <li>💍 500+ Wedding Cakes</li>
              <li>🚚 City-wide Delivery</li>
              <li>⭐ 4.8 Customer Rating</li>
            </ul>
          </div>
        </div>

        
        <h2 style={{ marginTop: "40px", textAlign: "center" }}>
          Our Growth Journey
        </h2>

        <div style={local.flow}>
          {[
            ["2000", "Started Home Bakery"],
            ["2005", "First Shop"],
            ["2010", "Wedding Cakes"],
            ["2015", "Expansion"],
            ["2020", "Online Delivery"],
            ["2024", "Top Brand"]
          ].map((item, i) => (
            <React.Fragment key={i}>
              <div style={local.flowBox}>
                <h4>{item[0]}</h4>
                <p>{item[1]}</p>
              </div>

              {i !== 5 && <div style={local.arrow}>➜</div>}
            </React.Fragment>
          ))}
        </div>

      </div>
    </div>
  );
};

export default About;



const local = {
  hero: {
    height: "250px",
    background:
      "url('https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200') center/cover",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)"
  },

  heroText: {
    color: "#fff",
    fontSize: "36px",
    zIndex: 1
  },

  splitSection: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: "30px",
    marginBottom: "40px"
  },

  image: {
    width: "320px",
    height: "220px",
    objectFit: "cover",
    borderRadius: "10px"
  },

  cardRow: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap"
  },

  card: {
    background: "#333",
    color: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "280px",
    textAlign: "center"
  },

  gallery: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "20px"
  },

  imgWrapper: {
    width: "100%",
    height: "180px",
    overflow: "hidden",
    borderRadius: "10px"
  },

  galleryImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },

  achieveWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px"
  },

  achieveList: {
    listStyle: "none",
    padding: 0,
    textAlign: "center",
    lineHeight: "2"
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
    minWidth: "120px",
    textAlign: "center"
  },

  arrow: {
    fontSize: "20px",
    color: "#ff4d6d"
  }
};