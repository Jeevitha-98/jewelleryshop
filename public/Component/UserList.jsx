import React, { useEffect, useState } from "react";
import UserDetails from "./UserDetails";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={styles.container}>
      {/* User List */}
      <div style={styles.list}>
        <h2>Users</h2>
        {users.map((user) => (
          <p
            key={user.id}
            style={styles.userItem}
            onClick={() => setSelectedUser(user)}
          >
            {user.name}
          </p>
        ))}
      </div>

      {/* User Details */}
      <div style={styles.details}>
        {selectedUser ? (
          <UserDetails user={selectedUser} />
        ) : (
          <p>Select a user to see details</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: "20px",
    padding: "20px",
  },
  list: {
    width: "40%",
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "10px",
    background: "#f9f9f9",
  },
  userItem: {
    cursor: "pointer",
    padding: "8px",
    borderBottom: "1px solid #ddd",
  },
  details: {
    width: "60%",
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "10px",
    background: "#ffffff",
  },
};