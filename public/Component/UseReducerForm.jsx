import React, { useReducer } from "react";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  country: "",
  zip: "",
  dob: "",
  gender: "",
  errors: {},
};

const ACTIONS = {
  UPDATE_FIELD: "update_field",
  RESET_FORM: "reset_form",
  SET_ERRORS: "set_errors",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_FIELD:
      return {
        ...state,
        [action.field]: action.value,
      };
    case ACTIONS.SET_ERRORS:
      return {
        ...state,
        errors: action.errors,
      };
    case ACTIONS.RESET_FORM:
      return initialState;
    default:
      return state;
  }
};

export default function UseReducerForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    dispatch({
      type: ACTIONS.UPDATE_FIELD,
      field: e.target.name,
      value: e.target.value,
    });
  };

  const validate = () => {
    let errors = {};

    if (!state.name) errors.name = "Name required";
    if (!state.email.includes("@")) errors.email = "Valid email required";
    if (state.phone.length !== 10) errors.phone = "10 digit phone required";
    if (!state.address) errors.address = "Address required";
    if (!state.city) errors.city = "City required";
    if (!state.state) errors.state = "State required";
    if (!state.country) errors.country = "Country required";
    if (!state.zip) errors.zip = "Zip required";
    if (!state.dob) errors.dob = "DOB required";
    if (!state.gender) errors.gender = "Select gender";

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();

    if (Object.keys(errors).length > 0) {
      dispatch({ type: ACTIONS.SET_ERRORS, errors });
      return;
    }

    alert("Form Submitted ✅");
    dispatch({ type: ACTIONS.RESET_FORM });
  };

  const Field = ({ name, placeholder, type = "text" }) => (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={state[name]}
        onChange={handleChange}
        style={styles.input}
      />
      <p style={styles.error}>{state.errors[name]}</p>
    </div>
  );

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.title}>User Registration Form</h2>

        <div style={styles.grid}>
          <Field name="name" placeholder="Name" />
          <Field name="email" placeholder="Email" />
          <Field name="phone" placeholder="Phone" />
          <Field name="city" placeholder="City" />
          <Field name="state" placeholder="State" />
          <Field name="country" placeholder="Country" />
          <Field name="zip" placeholder="Zip Code" />
          <Field name="dob" type="date" />

          <div>
            <select
              name="gender"
              value={state.gender}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <p style={styles.error}>{state.errors.gender}</p>
          </div>

          <div style={styles.fullWidth}>
            <input
              name="address"
              placeholder="Address"
              value={state.address}
              onChange={handleChange}
              style={styles.input}
            />
            <p style={styles.error}>{state.errors.address}</p>
          </div>
        </div>

        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.submitBtn}>Submit</button>
          <button
            type="button"
            style={styles.resetBtn}
            onClick={() => dispatch({ type: ACTIONS.RESET_FORM })}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #5f6caf, #7f53ac)",
    padding: "20px",
  },

  form: {
    background: "#f5f5f5",
    padding: "40px 50px",
    borderRadius: "20px",
    width: "750px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
  },

  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "28px",
    fontWeight: "700",
    color: "#1f2937",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px 40px", 
    alignItems: "center",
  },

  fieldWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },

  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    background: "#e5e7eb",
    outline: "none",
  },

  select: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    background: "#e5e7eb",
    color: "#111", 
    outline: "none",
  },

  date: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    background: "#e5e7eb",
    color: "#111",
    outline: "none",
  },

  fullWidth: {
    gridColumn: "span 2",
  },

  error: {
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    marginTop: "35px",
  },

  submitBtn: {
    background: "linear-gradient(135deg, #16a34a, #15803d)",
    color: "#fff",
    padding: "12px 30px",
    border: "none",
    borderRadius: "30px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },

  resetBtn: {
    background: "linear-gradient(135deg, #ef4444, #dc2626)",
    color: "#fff",
    padding: "12px 30px",
    border: "none",
    borderRadius: "30px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },
};