import React, {useState} from "react"
import "./login.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"


const Login = ({ setLoginUser}) => {

    const navigate = useNavigate();
    const [ user, setUser] = useState({
        email:"",
        password:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }
    const login = async () => {
        const { email, password } = user;
    
        // Validate the input fields.
        if (!email || !password) {
          alert("Please fill in all of the required fields.");
          return;
        }
    
        // Try to log in the user.
        try {
          const response = await axios.post("http://localhost:9001/login", user);
          alert(response.data.message);
          setLoginUser(response.data.user);
          navigate("/");
        } catch (error) {
          // Handle the error more gracefully.
          alert("An error occurred while trying to log in the user.");
          console.log(error);
        }
      };

    return (
        <div className="login">
        {console.log(user)}
            <h1>Login</h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Enter your Password" ></input>
            <div className="button"  onClick={login}>Login</div>
            <div>or</div>
            <div className="button" onClick={() => navigate("/register")}>Register</div>
        </div>
    )
}

export default Login