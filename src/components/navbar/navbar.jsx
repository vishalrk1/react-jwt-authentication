import React, { useContext } from "react";
import AuthButton from "../button";
import { UserAuthContext } from "../../providers/authProvider";
import { logOutUser } from "../../utils/authUtils";
import { useNavigate } from "react-router-dom";
import { CategoriesContext } from "../../providers/categoriesProvider";

import "../../styles/components/navbar/navbar.css";
import NavUserBox from "./nav-user-box";
import NavCartButton from "./nav-cart-button";

const Navbar = () => {
  const { user, setUser, isLoggedIn, setIsLoggedIn } =
    useContext(UserAuthContext);
  const { categoriesData } = useContext(CategoriesContext);
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
        <div className="title-name" onClick={() => navigate("/")}>
          Authentication
        </div>
        {categoriesData &&
          categoriesData.map((item) => (
            <div
              key={item.cat_id}
              className="nav-route"
              onClick={() => navigate(`/${item.cat_id}/products`)}
            >
              {item.cat_title}
            </div>
          ))}
      </div>
      <div className="">
        {isLoggedIn ? (
          <div className="auth-button-container">
            {user && <NavUserBox />}
            <NavCartButton />
            <AuthButton onClick={handelLogout}>LogOut</AuthButton>
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
