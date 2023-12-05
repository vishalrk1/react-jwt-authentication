import React from "react";

import "../styles/components/order-summary.css";
import DefaultButton from "./default-button";

const OrderSummary = ({ totalCartValue, user }) => {
  return (
    <div className="order-summary-container">
      <h3 className="summary-title">Order Summary</h3>
      <hr className="solid-divider" />
      <div className="summary-details-container">
        <span className="summary-detail-title">Order Price</span>
        <span>{totalCartValue}</span>
      </div>
      <div className="summary-details-container">
        <span className="summary-detail-title">Address</span>
        <span>{user ? user.address[0].address_type : ""}</span>
      </div>
      <hr className="solid-divider" />
      <div className="checkout-button">
        <DefaultButton>Checkout</DefaultButton>
      </div>
    </div>
  );
};

export default OrderSummary;
