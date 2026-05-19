import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";

const servicesList = ["Cake", "Cupcake", "Cookies", "Brownie", "Custom Cake"];

const Profile1 = () => {
  const { state, dispatch } = useContext(AppContext) || {};

  const [user, setUser] = useState({
    name: "",
    email: "",
    location: "",
    address: "",
    city: "",
    pincode: ""
  });

  const [saved, setSaved] = useState(false);
  const [orders, setOrders] = useState([]);
  const [showServices, setShowServices] = useState(false);


  useEffect(() => {
    const savedUser = localStorage.getItem("userProfile");
    const savedOrders = localStorage.getItem("orders");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setSaved(true);
    }

    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

 
  const handleCreateAccount = () => {
    if (
      !user.name ||
      !user.email ||
      !user.location ||
      !user.address ||
      !user.city ||
      !user.pincode
    ) {
      alert("Please fill all details including address");
      return;
    }

    localStorage.setItem("userProfile", JSON.stringify(user));
    setSaved(true);
    alert("Account Created Successfully!");
  };

 
  const handleClearProfile = () => {
    localStorage.removeItem("userProfile");
    localStorage.removeItem("orders");
    setUser({
      name: "",
      email: "",
      location: "",
      address: "",
      city: "",
      pincode: ""
    });
    setOrders([]);
    setSaved(false);
  };

  
  const handleSelectService = (service) => {
    const updatedOrders = [...orders, service];
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setShowServices(false);
    dispatch?.({ type: "INCREMENT" });
  };

 
  const handleReset = () => {
    setOrders([]);
    localStorage.removeItem("orders");
    dispatch?.({ type: "RESET" });
  };

  return (
    <div>
     
      <div style={styles.banner}>
        <div style={styles.overlay}></div>
        <h1 style={styles.bannerText}>My Profile</h1>
      </div>

   
      <div style={styles.mainContainer}>

        
        <div style={styles.left}>
          <h2>{saved ? "Your Account" : "Create Account"}</h2>

          <input name="name" placeholder="Name" value={user.name} onChange={handleChange} style={styles.input} />
          <input name="email" placeholder="Email" value={user.email} onChange={handleChange} style={styles.input} />
          <input name="location" placeholder="Location" value={user.location} onChange={handleChange} style={styles.input} />

          <input name="address" placeholder="Street Address" value={user.address} onChange={handleChange} style={styles.input} />
          <input name="city" placeholder="City" value={user.city} onChange={handleChange} style={styles.input} />
          <input name="pincode" placeholder="Pincode" value={user.pincode} onChange={handleChange} style={styles.input} />

          {!saved ? (
            <button style={styles.createBtn} onClick={handleCreateAccount}>
              Create Account
            </button>
          ) : (
            <button style={styles.deleteBtn} onClick={handleClearProfile}>
              Delete Account
            </button>
          )}
        </div>

        <div style={styles.right}>
         
          {saved && (
            <div style={styles.addressBox}>
              <h3>Delivery Address</h3>
              <p>{user.name}</p>
              <p>{user.address}</p>
              <p>{user.city} - {user.pincode}</p>
            </div>
          )}

        
          <button
            style={styles.addBtn}
            onClick={() => setShowServices(true)}
          >
            Add Order
          </button>

         
          {showServices && (
            <div style={styles.serviceBox}>
              <h3 style={styles.serviceTitle}>Choose a Service</h3>

              {servicesList.map((service, index) => (
                <button
                  key={index}
                  style={styles.serviceBtn}
                  onClick={() => handleSelectService(service)}
                  onMouseOver={(e) => {
                    e.target.style.background = "#333";
                    e.target.style.color = "#fff";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = "#f4f4f4";
                    e.target.style.color = "#333";
                  }}
                >
                  {service} ➜
                </button>
              ))}
            </div>
          )}

        
          <div style={styles.orderBox}>
            <h3>Total Orders</h3>
            <p style={styles.orderCount}>{orders.length}</p>
          </div>

         
          <ul style={styles.orderList}>
            {orders.map((order, index) => (
              <li key={index} style={styles.orderItem}>
                🍰 {order}
              </li>
            ))}
          </ul>

          <button style={styles.resetBtn} onClick={handleReset}>
            Reset Orders
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  banner: {
    height: "220px",
    background: "url('https://images.unsplash.com/photo-1495147466023-ac5c588e2e94') center/cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)"
  },
  bannerText: { color: "#fff", zIndex: 1 },

  mainContainer: {
    display: "flex",
    flexWrap: "wrap",
    padding: "40px",
    gap: "40px",
    justifyContent: "center"
  },

  left: { flex: 1, minWidth: "300px", maxWidth: "400px" },
  right: { flex: 1, minWidth: "300px", maxWidth: "400px" },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },

  createBtn: {
    padding: "12px",
    background: "green",
    color: "#fff",
    border: "none",
    width: "100%",
    borderRadius: "6px"
  },

  deleteBtn: {
    padding: "12px",
    background: "red",
    color: "#fff",
    border: "none",
    width: "100%",
    borderRadius: "6px"
  },

  addressBox: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },

  addBtn: {
    padding: "12px",
    background: "#ff7e5f",
    color: "#fff",
    border: "none",
    width: "100%",
    borderRadius: "6px",
    marginBottom: "15px"
  },

  serviceBox: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px"
  },

  serviceTitle: {
    textAlign: "center",
    marginBottom: "10px"
  },

  serviceBtn: {
    width: "100%",
    padding: "10px",
    margin: "5px 0",
    border: "none",
    borderRadius: "6px",
    background: "#f4f4f4",
    cursor: "pointer"
  },

  orderBox: {
    background: "#333",
    color: "#fff",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center"
  },

  orderCount: {
    fontSize: "35px"
  },

  orderList: {
    listStyle: "none",
    padding: 0,
    marginTop: "15px"
  },

  orderItem: {
    background: "#f4f4f4",
    padding: "8px",
    marginBottom: "5px",
    borderRadius: "5px"
  },

  resetBtn: {
    marginTop: "15px",
    padding: "10px",
    background: "red",
    color: "#fff",
    border: "none",
    width: "100%",
    borderRadius: "6px"
  }
};

export default Profile1;