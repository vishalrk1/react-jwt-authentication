import React, { useContext } from "react";
import { UserAuthContext } from "../../providers/authProvider";
import {useNavigate} from 'react-router-dom';

import '../../styles/components/navbar/nav-user-box.css'

const NavUserBox = () => {
  const { user } = useContext(UserAuthContext);
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/profile")} className="nav-user-box">
      <img
        src={user.user_pfp_url}
        className="user-pfp"
      />
      <p className="username-text">{user.username}</p>
    </div>
  );
};

export default NavUserBox;
