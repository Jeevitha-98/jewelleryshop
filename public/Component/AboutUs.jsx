import React from "react";

const About = ({ styles }) => {
  return (
    <div style={styles.container}>
      <h1>About YazhBakes</h1>

      {/* STORY */}
      <div style={styles.sectionBox}>
        <h2>Our Journey (2000 - Present)</h2>
        <p>
          YazhBakes started in 2000 as a small home bakery in Coimbatore.
          With passion and dedication, it quickly became a local favorite.
          We focused on quality ingredients and unique taste.
          Over time, we expanded into custom cakes for all occasions.
          By 2010, we became known for wedding cake designs.
          Our creativity helped us stand out in the market.
          We adopted modern baking methods while keeping tradition alive.
          Customer satisfaction has always been our priority.
          Today, we serve thousands of happy customers.
          We continue to grow with innovation and love for baking.
        </p>
      </div>

      {/* VISION & MISSION */}
      <div style={styles.flexRow}>
        <div style={styles.infoCard}>
          <h3>Vision</h3>
          <p>
            To be the most loved bakery brand known for quality and creativity.
          </p>
        </div>

        <div style={styles.infoCard}>
          <h3>Mission</h3>
          <p>
            To deliver fresh, high-quality baked goods with excellent service.
          </p>
        </div>
      </div>

      {/* ACHIEVEMENTS */}
      <div style={styles.sectionBox}>
        <h2>Achievements</h2>
        <ul style={styles.list}>
          <li>🏆 Best Bakery Award (2012)</li>
          <li>🎂 10,000+ Customers Served</li>
          <li>💍 500+ Wedding Cakes</li>
          <li>🚚 City-wide Delivery</li>
          <li>⭐ 4.8 Customer Rating</li>
        </ul>
      </div>

      {/* TIMELINE */}
      <div style={styles.sectionBox}>
        <h2>Timeline</h2>
        <ul style={styles.timeline}>
          <li>2000 - Started home bakery</li>
          <li>2005 - Opened first shop</li>
          <li>2010 - Wedding cakes introduced</li>
          <li>2015 - Expanded services</li>
          <li>2020 - Online delivery launched</li>
          <li>2024 - Leading local bakery brand</li>
        </ul>
      </div>
    </div>
  );
};

export default About;