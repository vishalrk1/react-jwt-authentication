import React, { useState } from "react";
import "../styles/pages/signup-page.css";
import { getJWTTokens, signUpUser } from "../utils/authUtils";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handelFormSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const userData = await signUpUser({
        username: username,
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
      }).then(async (data) => {
        if (data) {
          const tokens = await getJWTTokens(username, password);
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/create-profile");
        }
      });
      console.log("Signup page: ", userData);
    } catch (e) {
      console.log("Signup Error: ", e);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <div className="main-body">
        <div className="container">
          <div className="label">Create Account</div>
          <form className="signup-form" onSubmit={handelFormSubmit}>
            <input
              name="username"
              type="text"
              value={username}
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              name="email"
              type="text"
              value={email}
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              name="first_name"
              type="text"
              value={firstName}
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              name="last_name"
              type="text"
              value={lastName}
              placeholder="First Name"
              onChange={(e) => setLastName(e.target.value)}
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
              Create
            </button>
            {isError && (
              <div className="error-msg">
                Something wend wrong please try again
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
