import React, { useState, useEffect } from "react";
import { checkTokenValidity, getUserDetails } from "../utils/authUtils";

export const UserAuthContext = React.createContext();

export const UserDataProvider = ({ children }) => {
  const [userObject, setUserObject] = useState(null);
  const [user, setUser] = useState(null);
  const [authTokens, setAuthTokens] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // setLoadingUser(true);
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));
    const userDetails = JSON.parse(localStorage.getItem("user"));

    const getUserObj = async () => {
      const isvalid = await checkTokenValidity();
      if (isvalid) {
        const data = await getUserDetails(
          userDetails.username,
          userDetails.email,
          authTokens.access
        );
        setUserObject(data);
        setUser(data);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    if (authTokens || userDetails) {
      setAuthTokens(authTokens);
      setUser(userDetails);
      getUserObj();
      console.log('Updated User Data', user)
    }
  }, []);

  const setStorageTokens = () => {
    const userObj = JSON.parse(localStorage.getItem('user'));
    const tokensObj = JSON.parse(localStorage.getItem('authTokens'));

    setUser(userObj);
    setAuthTokens(authTokens);

    if (!user || !authTokens){
      setIsLoggedIn(false);
    }
  }

  return (
    <UserAuthContext.Provider
      value={{ user, setUser, authTokens, setAuthTokens, isLoggedIn, setIsLoggedIn, setStorageTokens }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};
