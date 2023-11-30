import React, { useContext, useEffect, useState } from "react";
import { UserAuthContext } from "../providers/authProvider";
import { logOutUser } from "../utils/authUtils";
import { useNavigate } from "react-router-dom";

import "../styles/pages/homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, setUser, setAuthTokens, setIsLoggedIn, setStorageTokens } = useContext(UserAuthContext);
  const authTokens = localStorage.getItem("authTokens");
  const userDetails = localStorage.getItem("user");

  useEffect(() => {
    if (!authTokens || !userDetails) {
      navigate("/login");
    }
  }, [authTokens, userDetails]);

  return (
    <>
      {isLoggedIn && (
        <div className="homepage-main">
        </div>
      )}
    </>
  );
};

export default HomePage;
