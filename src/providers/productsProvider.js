import { createContext, useState } from "react";

export const ProductsContext = createContext();

export const ProductsDataProvider = ({ children }) => {
  const [productsData, setProductsData] = useState(undefined);
  const [isProdFetching, setIsProdFetching] = useState(false);

  const fetchProducts = async (cat_id) => {
    try {
      setIsProdFetching(true);
      const res = await fetch("http://127.0.0.1:8000/get-products/", {
        method: "POST",
        credentials: "same-origin",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cat_id }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("products Data", data);
        setProductsData(data.productsData);
        setIsProdFetching(false);
      } else {
        setIsProdFetching(false);
        throw new Error("Products not fetched server error");
      }
    } catch (e) {
      setIsProdFetching(false);
      console.log(`Error in fetching products: ${e}`);
    }
  };

  return (
    <ProductsContext.Provider value={{ productsData, fetchProducts, isProdFetching }}>
      {children}
    </ProductsContext.Provider>
  );
};
