import React, { useContext } from "react";
import "../styles/components/navbar.css";
import AuthButton from "./button";
import { UserAuthContext } from "../providers/authProvider";
import { logOutUser } from "../utils/authUtils";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, setUser, isLoggedIn, setIsLoggedIn } =
    useContext(UserAuthContext);
  const navigate = useNavigate();

  const handelLogout = () => {
    logOutUser();
    setUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="main-navbar">
      <div className="routes-container">
        <div className="title-name">Authentication</div>
        <div>route-1</div>
        <div>route-2</div>
      </div>
      <div className="">
        {isLoggedIn ? (
          <div className="auth-button-container">
            <AuthButton onClick={handelLogout}>LogOut</AuthButton>
            {user && <img src={user.user_pfp_url} className="user-pfp" onClick={()=>navigate('/profile')}/>}
          </div>
        ) : (
          <div className="auth-button-container">
            <AuthButton onClick={() => navigate("/login")}>Login</AuthButton>
            <AuthButton onClick={() => navigate("/signup")}>Signup</AuthButton>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
