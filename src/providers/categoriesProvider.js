import { createContext, useContext, useEffect, useState } from "react";

import React from "react";
import { UserAuthContext } from "./authProvider";
import { getCategoriesData } from "../utils/categoriesUtil";

export const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categoriesData, setCategories] = useState(undefined);
  const { isLoggedIn } = useContext(UserAuthContext);

  const fetchCategories = async () => {
    const data = await getCategoriesData();
    setCategories(data);
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchCategories();
    }
  }, [isLoggedIn]);

  return (
    <CategoriesContext.Provider value={{categoriesData}}>
      {children}
    </CategoriesContext.Provider>
  );
};
