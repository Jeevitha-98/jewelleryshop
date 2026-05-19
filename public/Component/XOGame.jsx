import React, { useState } from "react";

export default function XOGame() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],[3, 4, 5],[6, 7, 8],
      [0, 3, 6],[1, 4, 7],[2, 5, 8],
      [0, 4, 8],[2, 4, 6],
    ];

    for (let [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(board);

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>XO Game</h1>

      <div style={styles.board}>
        {board.map((value, index) => (
          <button
            key={index}
            style={{
              ...styles.cell,
              color:
                value === "X"
                  ? "#2196f3"
                  : value === "O"
                  ? "#f44336"
                  : "#000",
            }}
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>

      <div style={styles.controlBox}>
        <div style={styles.statusBox}>
          {winner ? (
  <span style={{ ...styles.statusText, color: "#4caf50" }}>
    🎉 Winner: {winner}
  </span>
) : board.every((cell) => cell) ? (
  <span style={{ ...styles.statusText, color: "#ff9800" }}>
    🤝 It's a Draw!
  </span>
) : (
  <span
    style={{
      ...styles.statusText,
      color: xIsNext ? "#2196f3" : "#f44336",
    }}
  >
    Turn: {xIsNext ? "X" : "O"}
  </span>
)}
        </div>

        <button
          style={styles.resetBtn}
          onClick={handleReset}
          onMouseOver={(e) =>
            (e.target.style.background =
              "linear-gradient(135deg, #43e97b, #38f9d7)")
          }
          onMouseOut={(e) =>
            (e.target.style.background =
              "linear-gradient(135deg, #4facfe, #00f2fe)")
          }
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  title: {
    marginBottom: "20px",
    color: "#fff",
  },
  board: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 100px)",
    justifyContent: "center",
    gap: "10px",
  },
  cell: {
    width: "100px",
    height: "100px",
    fontSize: "28px",
    fontWeight: "bold",
    cursor: "pointer",
    background: "#eee",
    border: "none",
    borderRadius: "8px",
  },
  controlBox: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
  },
  statusBox: {
    padding: "12px 25px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #1e1e2f, #2c2c3e)",
    display: "inline-block",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  },
  statusText: {
    fontSize: "20px",
    fontWeight: "600",
  },
  resetBtn: {
    padding: "12px 25px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#fff",
    background: "linear-gradient(135deg, #4facfe, #00f2fe)",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
  },
};