import React from "react";

import {Link} from "react-router-dom"
import "./NavBar.css"

const NavBar = ({currentUser, logout}) => {
    console.log("current user:", currentUser)

    return (
    <nav className="NavBar">
        <Link to="/">Jobly</Link>

        
        {currentUser ? <>
        <Link to="/companies">Companies</Link>
        <Link to="/jobs">Jobs</Link>
        <Link onClick={logout}>Logout</Link>
        <Link to="/profile">Profile</Link>
        </> 
        :
        <>
        <Link to="/login">Login</Link> 
        <Link to="/signup">Signup</Link> 
        </>
        }
        
    </nav>
    
    )

}

export default NavBar