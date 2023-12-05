import React, { useContext, useEffect } from "react";
import HorizontalCartItem from "../components/horizontal-cart-item";
import { CartDataContext } from "../providers/cartDataProvider";

import "../styles/pages/cart-page.css";
import { UserAuthContext } from "../providers/authProvider";
import DefaultButton from "../components/default-button";
import OrderSummary from "../components/order-summary";

const CartPage = () => {
  let totalCartValue = 0;
  const { cartData, fetchCartData } = useContext(CartDataContext);
  const { user } = useContext(UserAuthContext);

  useEffect(() => {
    fetchCartData();
  }, []);

  const getTotalCartValue = (itemValue, quantity) => {
    totalCartValue += parseInt(itemValue * quantity);
  };

  return (
    <div className="cart-page-main">
      <div className="heading-container">
        <p className="heading">Cart</p>
      </div>
      <div className="cart-details-container">
        <div className="cart-items-list">
          {cartData &&
            cartData.map((cartItem) => {
              getTotalCartValue(cartItem.product.prod_price, cartItem.quantity);
              return (
                <HorizontalCartItem key={cartItem.id} cartItem={cartItem} />
              );
            })}
        </div>
        <OrderSummary totalCartValue={totalCartValue} user={user} />
      </div>
    </div>
  );
};

export default CartPage;
