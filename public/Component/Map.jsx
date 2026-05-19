import UserImg from "../Component/assets/userimage.png";
export default function Map(){
    const users = [
        { name:"Kowsika", 
          email:"kowsika@gmail.com",
          city:"Chennai",
          age: 23,
          phone:"1234567892"},
         
              { 
                name:"Jeevitha", 
          email:"Jeevitha@gmail.com",
          city:"Thirchy",
          age: 21,
          phone:"9874563234"},

              { name:"Dhana Sekar",
          email:"Dhanasekar@gmail.com",
          city:"Coimbatore",
          age: 25,
          phone:"8838824561"},

              { name:"Gokul", 
          email:"Gokulkannan@gmail.com",
          city:"Bangalore",
          age: 22,
          phone:"6452389164"},

              { name:"Deepan", 
          email:"deepan@gmail.com",
          city:"Erode",
          age: 20,
          phone:"9845672891"},

    ];
return(
    <div style={{textAlign:"center"}}>
          <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "20px"
        }}>
        <img 
    src={UserImg} 
    alt="user" 
    style={{ width: "80px", marginTop: "5px",marginBottom:"5px" }} 
  />
  <h1><u>User List</u></h1>
     </div>
        
           {users.map((user,index) => (
            <div
            key={index}
             style={{
               background: "linear-gradient(to right, #b5d4f3, #8be6d7)",
               padding: "20px",
               margin: "10px auto",
               width: "300px",
               borderRadius: "10px",
               boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
               fontFamily: "Times New Roman",
               color:"grey"    

          }}>

  <h2 style={{ color: "black" }}>{user.name}</h2>
  <p style={{ color: "#555" }}>Email: {user.email}</p>
  <p style={{ color: "#555" }}>City: {user.city}</p>
  <p style={{ color: "#555" }}>Age: {user.age}</p>
  <p style={{ color: "#555" }}>Phone: {user.phone}</p>
        </div>
        )
    )
        }
    </div>

);
}