import React  from "react"
import "./homepage.css"




const Homepage = ({setLoginUser, user}) => {
 
    return (
        
        <div className="homepage">
                <h1>Welcome {user.name}!</h1>


            <div className="profile">
                    <h2>Profile</h2>
                    <ul>
                        <li>Email: {user.email}</li>
                        <li>Age: 22</li>
                        <li>Gender: Male</li>
                        <li>Date of Birth: 06/08/2001</li>
                        <li>Mobile: 98########</li>
                    </ul>
            </div>
                <div className="button" onClick={() => setLoginUser({})} >Logout</div>
        </div>
       
           
    )
}

export default Homepage