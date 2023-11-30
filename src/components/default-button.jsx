import React from "react";
import "../styles/components/button.css";

import "../styles/components/default-button.css";

const DefaultButton = ({ children, onClick, type }) => {
  return (
    <button className="main-defaultbutton" onClick={onClick}>
      {children}
    </button>
  );
};

export default DefaultButton;
