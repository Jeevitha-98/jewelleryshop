import React, {useState} from "react";

export default function form(){
const [form, setform]=useState({
    name:"",
    email:"",
    phone:"",
    password:"",
    confirmPassword:"",
    address:"",
    city:"",
    state:"",
    country:"",
    zip:"",
});

const [errors, seterrors] = useState({});
const handleChange=(e)=>{
    const{name, value, type, checked} = e.target;
    setform({
        ...form, [name]: type ==="checkbox" ? checked :value
    });
};

const validate = () => {
  let newErrors = {};

  if (!form.name) newErrors.name = "Name is required";

  if (!form.email) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    newErrors.email = "Invalid email format";
  }

  if (!form.phone) newErrors.phone = "Phone is required";

  if (!form.password) {
    newErrors.password = "Password is required";
  } else if (form.password.length < 8) {
    newErrors.password = "Password must be at least 8 characters";
  }

  if (!form.confirmPassword) {
    newErrors.confirmPassword = "Confirm Password is required";
  } else if (form.password !== form.confirmPassword) {
    newErrors.confirmPassword = "Passwords must match";
  }

  if (!form.address) newErrors.address = "Address is required";
  if (!form.city) newErrors.city = "City is required";
  if (!form.state) newErrors.state = "State is required";
  if (!form.country) newErrors.country = "Country is required";
  if (!form.zip) newErrors.zip = "Zip Code is required";

  if (!form.agree) newErrors.agree = "You must accept terms";

  return newErrors;
};

const handleSubmit = (e) => {
  e.preventDefault();

  const validationErrors = validate();

  if (Object.keys(validationErrors).length === 0) {
    alert("Form submitted successfully");

    setform({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      address: "",
      city: "",
      state: "",
      country: "",
      zip: "",
      agree: false
    });

    seterrors({});
  } else {
    seterrors(validationErrors);
  }
};

    return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Registration Form</h2>

        {renderInput("Name", "name")}
        {renderInput("Email", "email")}
        {renderInput("Phone", "phone")}
        {renderInput("Password", "password", "password")}
        {renderInput("Confirm Password", "confirmPassword", "password")}
        {renderInput("Address", "address")}
        {renderInput("City", "city")}
        {renderInput("State", "state")}
        {renderInput("Country", "country")}
        {renderInput("Zip Code", "zip")}

        <div style={styles.checkboxContainer}>
          <input
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
          />
          <label>I agree to terms</label>

           </div>
        {errors.agree && <p style={styles.error}>{errors.agree}</p>}

        <button style={styles.button}>Register</button>
      </form>
    </div>
  );
function renderInput(label, name, type = "text") {
    return (
      <div style={styles.inputGroup}>
        <label>{label}</label>
        <input
          type={type}
          name={name}
          value={form[name]}
          onChange={handleChange}
          style={styles.input}
        />
        {errors[name] && <p style={styles.error}>{errors[name]}</p>}
      </div>
    );
  }
}
 const styles = {
  container: {
  width: "100%",
  minHeight: "100vh",        
  backgroundColor: "#f5f7fb",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start", 
  paddingTop: "20px",           
  fontFamily: "Times New Roman" 
},


 title: {
  fontSize: "32px",
  fontWeight: "700",
  color: "#4f46e5",
  margin: "0px",
  marginBottom: "20px",
  textAlign: "center",
  width: "100%"
},


  form: {
    width: "900px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "20px",

  },

  inputGroup: {
    width: "430px", 
    display: "flex",
    flexDirection: "column"
  },

  fullWidth: {
    width: "900px"
  },

  label: {
    fontSize: "13px",
    marginBottom: "6px",
    color: "#374151",
    fontWeight: "500"
  },

  input: {
    width: "100%",
    height: "42px",
    padding: "0px 12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    backgroundColor: "#ffffff",
    outline: "none",
    color:"black"
  },

  error: {
    color: "red",
    fontSize: "12px",
    marginTop: "4px"
  },

  checkboxContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
    fontSize: "14px",
    color: "#374151",
    gap: "8px"
  },

  button: {
    width: "100%",
    height: "48px",
    marginTop: "20px",
    background: "linear-gradient(90deg, #4f46e5, #6366f1)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer"
  }
};