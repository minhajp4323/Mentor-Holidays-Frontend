import TextField from "@mui/material/TextField";
import Header from "../navbar/Navbar";

function UserPropfile() {

 const username= localStorage.getItem("username")
 const email= localStorage.getItem("email")
 const phonenumber= localStorage.getItem("phonenumber")


  const textFieldStyle = {
    marginBottom: "10px",
  };
  return (
    <>

      <div style={{display: "flex", flexDirection:"column", alignItems:"center",justifyContent:"center", height:"50vh"}}>
        <TextField
          style={textFieldStyle}
          id="outlined-basic"
          label="Username"
          variant="outlined"
          defaultValue={username}
        />
        <TextField
          style={textFieldStyle}
          id="outlined-basic"
          label="Email"
          defaultValue={email}
          variant="outlined"
        />
        <TextField
          style={textFieldStyle}
          id="outlined-basic"
          label="Phone Number"
          defaultValue={phonenumber}
          variant="outlined"
        />
      </div>
    </>
  );
}

export default UserPropfile;
