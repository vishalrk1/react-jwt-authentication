import React from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../styles/components/navbar/nav-cart-button.css";

const NavCartButton = () => {
  const navigate = useNavigate();
  return (
    <div className="nav-cart-container" onClick={() => navigate('/cart')}>
      <ShoppingCart />
    </div>
  );
};

export default NavCartButton;
