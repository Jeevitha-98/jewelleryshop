import React, { useState } from "react";

const Contact = ({ styles }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields");
      return;
    }

    setSubmitted(true);

   
    setForm({
      name: "",
      email: "",
      message: ""
    });
  };

  return (
    <div>
     
      <div style={localStyles.banner}>
        <div style={localStyles.overlay}></div>
        <h1 style={localStyles.bannerText}>Contact Us</h1>
        <p style={localStyles.bannerSub}>
          We’d love to hear from you! Whether it’s an order, inquiry, or feedback,
          feel free to reach out and we’ll respond as soon as possible.
        </p>
      </div>

     
      <div style={localStyles.mainContainer}>
        
       
        <div style={localStyles.left}>
          <h2>Get in Touch</h2>

          <div style={localStyles.infoBox}>
            <h4>📍 Address</h4>
            <p>YazhBakes, Coimbatore, Tamil Nadu</p>
          </div>

          <div style={localStyles.infoBox}>
            <h4>📞 Phone</h4>
            <p>+91 98765 43210</p>
          </div>

          <div style={localStyles.infoBox}>
            <h4>📧 Email</h4>
            <p>yazhbakes@gmail.com</p>
          </div>

          <div style={localStyles.infoBox}>
            <h4>🕒 Working Hours</h4>
            <p>Mon - Sun: 9:00 AM - 9:00 PM</p>
          </div>
        </div>

       
        <div style={localStyles.right}>
          <h2>Send a Message</h2>

          <form onSubmit={handleSubmit} style={localStyles.form}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              style={localStyles.input}
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              style={localStyles.input}
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              style={localStyles.textarea}
            ></textarea>

            <button type="submit" style={localStyles.button}>
              Send Message
            </button>
          </form>

          {submitted && (
            <p style={{ color: "green", marginTop: "10px" }}>
              ✅ Message sent successfully!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};


const localStyles = {
  banner: {
    height: "250px",
    background:
      "url('https://images.unsplash.com/photo-1517686469429-8bdb88b9f907') center/cover",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    textAlign: "center",
    padding: "20px"
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)"
  },

  bannerText: {
    color: "#fff",
    zIndex: 1
  },

  bannerSub: {
    color: "#fff",
    zIndex: 1,
    maxWidth: "600px"
  },

  mainContainer: {
    display: "flex",
    flexWrap: "wrap",
    padding: "40px",
    gap: "40px",
    justifyContent: "center"
  },

  left: {
    flex: "1",
    minWidth: "300px",
    maxWidth: "400px"
  },

  right: {
    flex: "1",
    minWidth: "300px",
    maxWidth: "400px"
  },

  infoBox: {
    background: "#222",
    color: "#fff",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "15px"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },

  textarea: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    minHeight: "100px"
  },

  button: {
    padding: "12px",
    background: "#ff4d6d",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  }
};

export default Contact;