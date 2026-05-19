import React, { useState } from "react";

export default function App() {
  const contacts = ["Dhana", "Jeevi", "Deepu", "Sowmi", "Akash", "Kannan"];

  const [selectedContact, setSelectedContact] = useState("Dhana");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  const [allMessages, setAllMessages] = useState({
    Dhana: [],
    Jeevi: [],
    Deepu: [],
    Sowmi: [],
    Akash: [],
    Kannan: [],
  });

  const handleSend = () => {
    if (message.trim() === "") return;

    setAllMessages({...allMessages,[selectedContact]: [...allMessages[selectedContact],
        message,
      ],
    });

    setMessage("");
  };

  const filteredContacts = contacts.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <div style={styles.appContainer}>
        
           <div style={styles.sidebar}>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.search}
          />
          {filteredContacts.map((contact) => (
            <div
              key={contact}
              onClick={() => setSelectedContact(contact)}
              style={{...styles.contact, backgroundColor: selectedContact === contact ? "#ddd" : "#fff",
              }}
            >
              {contact}
            </div>
          ))}
        </div>

       
        <div style={styles.chatArea}>
          <h3 style={styles.chatHeader}>{selectedContact}</h3>

          <div style={styles.chatBox}>
            {allMessages[selectedContact].length === 0 ? (
              <p style={{ color: "#888" }}>No messages yet...</p>
            ) : (
              allMessages[selectedContact].map((msg, index) => (
                <div key={index} style={styles.myMessage}>
                  {msg}
                </div>
              ))
            )}
          </div>

          <div style={styles.inputArea}>
            <input
              type="text"
              placeholder="Type message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={styles.input}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />

            <button onClick={handleSend} style={styles.button}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#d1d7db",
  },

  appContainer: {
    display: "flex",
    width: "750px",
    height: "500px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
  },

 
  sidebar: {
    width: "30%",
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    background: "linear-gradient(180deg, #1f4037, #99f2c8)",
  },

  search: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    marginBottom: "12px",
    
  },


  contact: {
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
    marginBottom: "8px",
    fontWeight: "600",
    color: "#222",
    backgroundColor: "#ffffffcc",
    transition: "0.3s",
  },

 
  chatArea: {
    width: "70%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#efeae2",
  },

  
  chatHeader: {
    padding: "12px",
    margin: "0",
    backgroundColor: "#0b8457",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "18px",
  },

  chatBox: {
    flex: 1,
    padding: "15px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  },

  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#25d366",
    color: "#fff",
    padding: "10px 14px",
    borderRadius: "15px",
    marginBottom: "8px",
    maxWidth: "70%",
  },

  empty: {
    textAlign: "center",
    color: "#888",
    marginTop: "20px",
  },

  inputArea: {
    display: "flex",
    padding: "10px",
    backgroundColor: "#f0f2f5",
  },

  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "20px",
    border: "none",
    outline: "none",
  },

 
  button: {
    marginLeft: "10px",
    padding: "12px 16px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#25d366",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
};