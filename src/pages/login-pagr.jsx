import React, { useContext, useState } from "react";
import { UserAuthContext } from "../providers/authProvider";
import { getJWTTokens, getUserDetails, userLogIn } from "../utils/authUtils";
import { Link, useNavigate } from "react-router-dom";

import "../styles/pages/login-page.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser, setAuthTokens, isLoggedIn, setIsLoggedIn } =
    useContext(UserAuthContext);

  const handelFormSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      setIsError(false);
      await getJWTTokens(username, password).then(async (tokens) => {
        const userCred = await userLogIn(username, password, tokens.access);
        localStorage.setItem("user", JSON.stringify(userCred));
        const userObj = await getUserDetails(
          username,
          userCred.email,
          tokens.access
        );
        setAuthTokens(tokens);
        if (userObj) {
          setUser(userObj);
          setIsLoggedIn(true);
          navigate("/");
        } else {
          navigate("/create-profile");
        }
      });
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      console.log("form handel error", error);
    }
  };

  return (
    <div className="main-body">
      <div className="container">
        <div className="label">User LogIn</div>
        <form className="login-form" onSubmit={handelFormSubmit}>
          <input
            name="username"
            type="text"
            value={username}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            id="pass"
            name="password"
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="form-button" type="submit" disabled={isLoading}>
            Subimt
          </button>
          {isError && (
            <div className="error-msg">Invalid username or password</div>
          )}
        </form>
        <div className="options-container">
          <Link className="link" to="/change-password">
            <p>forgot password ?</p>
          </Link>
          <button className="signup-button" onClick={() => navigate("/signup")}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
