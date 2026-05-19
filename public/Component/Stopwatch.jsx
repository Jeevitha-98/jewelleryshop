import React, { useState, useEffect } from "react";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval=null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);
  
  useEffect(() => {
  console.log("Time:", time);
}, [time]);

const formatTime = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

return (

  <div style={styles.container}>
    <h1 style={styles.title}><u>Stopwatch</u></h1>


    <div style={styles.timer}>{formatTime(time)}</div>

    <div style={styles.buttonContainer}>
      
      <button
        style={{ ...styles.button, ...styles.startBtn }}
        onClick={() => setIsRunning(true)}
      >
        Start
      </button>

      <button
        style={{ ...styles.button, ...styles.stopBtn }}
        onClick={() => setIsRunning(false)}
      >
        Stop
      </button>

      <button
        style={{ ...styles.button, ...styles.resetBtn }} 
        onClick={() => {
          setIsRunning(false);
          setTime(0);
        }}
      >
        Reset
      </button>

    </div>
  </div>
);
}
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #667eea, #764ba2)",
    color: "#fff",
    fontFamily: "Times New Roman",
  },

  title: {
    fontSize: "70px",
    marginBottom: "100px",
    fontWeight: "bold",
    color:"Black"
  },

  timer: {
    fontSize: "110px", 
    marginBottom: "70px",
    fontWeight: "bold",
    letterSpacing: "5px",
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "40px", 
  
  },

  button: {
    padding: "20px 30px",
    minWidth: "160px", 
    height: "70px",
    fontSize: "28px",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "0.3s ease", 
  },

  startBtn: {
    backgroundColor: "#28a745",
    color: "white",
  },

  stopBtn: {
    backgroundColor: "#dc3545",
    color: "white",
  },

  resetBtn: {
    backgroundColor: "#90741f",
    color: "White",
  },
};