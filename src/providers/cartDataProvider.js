import { createContext, useContext, useEffect, useState } from "react";
import { UserAuthContext } from "./authProvider";
import { checkTokenValidity } from "../utils/authUtils";

export const CartDataContext = createContext();

export const CartDataProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);
  const { user, isLoggedIn, authTokens } = useContext(UserAuthContext);

  const fetchCartData = async () => {
    if (!isLoggedIn) {
      setCartData([]);
    } else {
      try {
        const isValid = await checkTokenValidity();
        if (isValid) {
          const res = await fetch("http://127.0.0.1:8000/cart/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authTokens.access}`,
            },
            body: JSON.stringify({
              username: user.username,
              email: user.email,
            }),
          });

          if (res.ok) {
            const data = await res.json();
            if (data.cartData) {
              setCartData(data.cartData);
            }
          } else {
            setCartData([]);
            console.log("Cart Does not exist");
          }
        }
      } catch (e) {}
    }
  };

  const addProductToCart = async (username, email, prod_id) => {
    try {
      const isValid = checkTokenValidity();
      if (isValid) {
        const res = await fetch("http://127.0.0.1:8000/cart/add/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
          body: JSON.stringify({ username, email, prod_id }),
        });

        if (res.ok) {
          fetchCartData(); // getting updated cart
          console.log("Item Added in cart");
        } else {
          throw new Error("Not able to add item in cart");
        }
      } else {
        throw new Error("Not LoggedIn");
      }
    } catch (e) {
      console.log("Adding product to cart failed: ", e);
    }
  };

  const removeProductFromCart = async (cartItem_id) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/cart/remove/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
        body: JSON.stringify({ cartItem_id }),
      });
      if (res.ok) {
        fetchCartData();
        console.log("Item Removed from Cart");
      }
    } catch (e) {
      console.log("Error in deleting Item");
    }
  };

  const updateProductQuantity = async (cartItem_id, cart_id, quantity) => {
    try {
      const isValid = checkTokenValidity();
      if (isValid) {
        const res = await fetch("http://127.0.0.1:8000/cart/update/", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
          body: JSON.stringify({ cartItem_id, cart_id, quantity }),
        });

        if (res.ok) {
          fetchCartData();
          return true;
        } else {
          return false;
        }
      } else {
        throw new Error("Tokens are not valid");
      }
    } catch (e) {
      console.log("Error in updating cart");
      return false;
    }
  };

  return (
    <CartDataContext.Provider
      value={{
        cartData,
        setCartData,
        fetchCartData,
        addProductToCart,
        removeProductFromCart,
        updateProductQuantity,
      }}
    >
      {children}
    </CartDataContext.Provider>
  );
};
