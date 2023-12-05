import React, { useContext } from "react";
import DefaultButton from "./default-button";

import "../styles/components/product-card.css";
import { UserAuthContext } from "../providers/authProvider";
import { CartDataContext } from "../providers/cartDataProvider";

const ProductCard = ({ product }) => {
  const { user } = useContext(UserAuthContext);
  const { addProductToCart } = useContext(CartDataContext);

  return (
    <div className="card-body">
      <div className="product-image-container">
        <img
          src={product.prod_image_url}
          alt="prod-id"
          className="product-image"
        />
      </div>
      <p className="product-title">{product.prod_title}</p>
      <div className="price-container">
        <p className="product-price-old">{`₹ ${product.prod_old_price}`}</p>
        <p className="product-price-new">{`₹ ${product.prod_price}`}</p>
      </div>
      <div className="btn-container">
        <DefaultButton
          onClick={() =>
            addProductToCart(user.username, user.email, product.prod_id)
          }
        >
          Add to cart
        </DefaultButton>
        <DefaultButton>Wishlist</DefaultButton>
      </div>
    </div>
  );
};

export default ProductCard;
