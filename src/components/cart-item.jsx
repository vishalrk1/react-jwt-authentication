import React, { useContext } from "react";
import { CartDataContext } from "../providers/cartDataProvider";
import { Trash } from "lucide-react";

import "../styles/components/cart-item.css";

const CartItem = ({ cartItem }) => {
  const { removeProductFromCart } = useContext(CartDataContext);

  const handelRemoveItem = (cartItem_id) => {
    try {
      removeProductFromCart(cartItem_id);
    } catch {
      //
    }
  };

  return (
    <div className="cart-item">
      <div className="image-container">
        <img className="prod-image" src={cartItem.product.prod_image_url} />
      </div>
      <span className="prod-name">{cartItem.product.prod_title}</span>
      <span className="prod-price">
        {parseInt(cartItem.product.prod_price) * parseInt(cartItem.quantity)}
      </span>
      <span className="prod-quantity">{cartItem.quantity}</span>
      <span className="prod-remove" onClick={() => handelRemoveItem(cartItem.id)}>
        <Trash className="trash-icon" />
      </span>
    </div>
  );
};

export default CartItem;
