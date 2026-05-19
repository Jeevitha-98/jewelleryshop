
import React, { useEffect, useState } from "react";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (error) return <h2 style={{ textAlign: "center" }}>Error: {error}</h2>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>User Details</h1>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{ ...styles.th, width: "160px" }}>Name</th>
              <th style={{ ...styles.th, width: "170px" }}>Email</th>
              <th style={{ ...styles.th, width: "160px" }}>Phone</th>
              <th style={{ ...styles.th, width: "150px" }}>Website</th>
              <th style={{ ...styles.th, width: "160px" }}>Company</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={styles.row}>
                <td style={styles.td}>{user.name}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{user.phone}</td>
                <td style={styles.td}>
                  <a
                    href={`https://${user.website}`}
                    target="_blank"
                    rel="noreferrer"
                    style={styles.link}
                  >
                    {user.website}
                  </a>
                </td>
                <td style={styles.td}>{user.company.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
const styles = {
  container: {
    padding: "30px",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#f4f6f9",
    minHeight: "100vh",
  },

  title: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#333",
  },

  tableWrapper: {
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    tableLayout: "fixed", 
    backgroundColor: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },

  th: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "12px",
    textAlign: "left",
    fontSize: "14px",
    wordWrap: "break-word",
  },

  td: {
    padding: "12px",
    borderBottom: "1px solid #eee",
    fontSize: "14px",
    color: "#555",
    textAlign: "left",        
    verticalAlign: "middle",  
    wordWrap: "break-word",
  },

  row: {
    transition: "0.2s",
    cursor: "pointer",
  },

  link: {
    color: "#4CAF50",
    textDecoration: "none",
    fontWeight: "500",
  },
};