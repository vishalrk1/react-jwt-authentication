import React, { useContext, useState } from "react";
import { checkTokenValidity, createUserObject } from "../utils/authUtils";
import { UserAuthContext } from "../providers/authProvider";
import { useNavigate } from "react-router-dom";

import "../styles/pages/create-profile-page.css";

const CreatUserProfilePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn, setStorageTokens } =
    useContext(UserAuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    user_phone: "",
    user_pfp: null,
    user_gender: "",
    address_type: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
  });

  //if input changes/new input done
  const handleInputChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserDetails({ ...userDetails, user_pfp: file }); // Update the user state with the file
    }
  };

  const handelFormSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      await checkTokenValidity().then(async (isVerified) => {
        const tokens = localStorage.getItem("authTokens");
        if (isVerified) {
          const userDataObj = await createUserObject(
            userDetails,
            JSON.parse(tokens).access
          );
          if (userDataObj) {
            setUser(userDataObj);
            setIsLoggedIn(true);
            setStorageTokens();
            setIsLoading(false);
            navigate("/");
            navigate(0);
          }
        } else {
          isError(true);
          isLoading(false);
        }
      });
    } catch (e) {
      setIsError(true);
      setIsLoading(true);
      console.log(e);
    }
  };

  return (
    <div>
      <div className="main-body">
        <div className="container">
          <div className="label">Details</div>
          <form className="add-profile-form" onSubmit={handelFormSubmit}>
            <div className="input-label">Username</div>
            <input
              name="username"
              type="text"
              value={user.username}
              placeholder="username"
              readOnly
            />

            <div className="input-label">Email</div>
            <input
              name="email"
              type="text"
              value={user.email}
              placeholder="email"
              readOnly
            />

            <div className="input-label">First Name</div>
            <input
              name="first_name"
              type="text"
              value={userDetails.first_name}
              placeholder="First Name"
              onChange={handleInputChange}
            />

            <div className="input-label">Last Name</div>
            <input
              name="last_name"
              type="text"
              value={userDetails.last_name}
              placeholder="Last name"
              onChange={handleInputChange}
            />

            <div className="input-label">Contact Number</div>
            <input
              name="user_phone"
              type="text"
              value={userDetails.user_phone}
              placeholder="phone"
              onChange={handleInputChange}
            />

            <div className="input-label">Gender</div>
            <select name="user_gender" onChange={handleInputChange}>
              <option selected>Choose Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>

            <div className="input-label">User Profile picture</div>
            <input
              name="user_pfp"
              type="file"
              placeholder="Select a File"
              onChange={handleFileInputChange}
            />

            <div className="input-label">Address</div>
            <input
              name="address_line1"
              type="text"
              value={userDetails.address_line1}
              placeholder="first line"
              onChange={handleInputChange}
            />

            <input
              name="address_line2"
              type="text"
              value={userDetails.address_line2}
              placeholder="second line"
              onChange={handleInputChange}
            />

            <div className="input-label">City</div>
            <input
              name="city"
              type="text"
              value={userDetails.city}
              placeholder="City"
              onChange={handleInputChange}
            />

            <div className="input-label">State</div>
            <input
              name="state"
              type="text"
              value={userDetails.state}
              placeholder="state"
              onChange={handleInputChange}
            />

            <div className="input-label">Country</div>
            <input
              name="country"
              type="text"
              value={userDetails.country}
              placeholder="Country"
              onChange={handleInputChange}
            />

            <div className="input-label">Postal Code</div>
            <input
              name="postal_code"
              type="text"
              value={userDetails.postal_code}
              placeholder="Postal Code"
              onChange={handleInputChange}
            />

            <div className="input-label">Address Type</div>
            <select name="address_type" onChange={handleInputChange}>
              <option selected value="Home">
                Choose Address Type
              </option>
              <option value="Home">Home</option>
              <option value="Work">Work</option>
              <option value="Others">Others</option>
            </select>

            <button className="form-button" type="submit" disabled={isLoading}>
              Submit
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

export default CreatUserProfilePage;
