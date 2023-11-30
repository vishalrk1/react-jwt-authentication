import React, { useContext } from "react";

import { UserAuthContext } from "../providers/authProvider";
import { useNavigate } from "react-router-dom";
import DefaultButton from "../components/default-button";

import "../styles/pages/profile-page.css";

const ProfilePage = () => {
  const { user } = useContext(UserAuthContext);
  const navigate = useNavigate();

  return (
    <div className="main-profilepage">
      <div className="card-container">
        <div className="image-container-1">
          <img src={user.user_pfp_url} className="profile-image" />
          <div className="user-name">{`${user.first_name} ${user.last_name}`}</div>
        </div>
        <div className="details-container">
          <div className="details-title">Accout Details</div>
          <input name="username" value={user.username} readOnly />
          <input name="email" value={user.email} readOnly />
          <input
            name="user_phone"
            value={user.user_phone}
            placeholder="phone"
            readOnly
          />
          <div className="edit-button-container">
            <DefaultButton onClick={() => navigate("/create-profile")}>
              Edit Profile
            </DefaultButton>
            <DefaultButton>Add Address</DefaultButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
