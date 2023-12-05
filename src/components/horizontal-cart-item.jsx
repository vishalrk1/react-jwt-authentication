import React, { useContext, useState } from "react";
import { Trash, ChevronUp, ChevronDown } from "lucide-react";

import "../styles/components/horizontal-cart-item.css";
import { CartDataContext } from "../providers/cartDataProvider";

const HorizontalCartItem = ({ cartItem }) => {
  const { cartData, updateProductQuantity, removeProductFromCart } =
    useContext(CartDataContext);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const handelAddquantity = async () => {
    const isUpdated = await updateProductQuantity(
      cartItem.id,
      cartData.id,
      quantity + 1
    );
    if (isUpdated) {
      setQuantity(quantity + 1);
    }
  };

  const handelLowerQuantity = async () => {
    if (quantity - 1 > 0) {
      const isUpdated = await updateProductQuantity(
        cartItem.id,
        cartData.id,
        quantity - 1
      );
      if (isUpdated) {
        setQuantity(quantity - 1);
      }
    }

    if (quantity - 1 === 0) {
      removeProductFromCart(cartItem.id);
    }
  };

  return (
    <div className="cart-item-card">
      <img src={cartItem.product.prod_image_url} className="product-image" />
      <div className="item-details">
        <span className="product-title">{cartItem.product.prod_title}</span>
        <span className="product-description">
          {cartItem.product.prod_desc}
        </span>
        <div className="product-price">{`Total Price: ${
          cartItem.quantity * cartItem.product.prod_price
        }`}</div>
      </div>
      <div className="product-quantity">
        <ChevronUp className="quantity-icon" onClick={handelAddquantity} />
        <span className="quantity-amount">{quantity}</span>
        {quantity !== 0 && (
          <ChevronDown
            className="quantity-icon"
            onClick={handelLowerQuantity}
          />
        )}
      </div>
      <div
        className="remove-icon"
        onClick={() => removeProductFromCart(cartItem.id)}
      >
        <Trash />
      </div>
    </div>
  );
};

export default HorizontalCartItem;
