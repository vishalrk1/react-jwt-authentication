import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserDataProvider } from "./providers/authProvider";
import { BrowserRouter } from "react-router-dom";
import { CategoriesProvider } from "./providers/categoriesProvider";
import { ProductsDataProvider } from "./providers/productsProvider";
import { CartDataProvider } from "./providers/cartDataProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserDataProvider>
      <CategoriesProvider>
        <CartDataProvider>
          <ProductsDataProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ProductsDataProvider>
        </CartDataProvider>
      </CategoriesProvider>
    </UserDataProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
