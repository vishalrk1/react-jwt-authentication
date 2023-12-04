export const getJWTTokens = async (username, password) => {
  const user = {
    username: username,
    password: password,
  };

  try {
    const response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("authTokens", JSON.stringify(data));
      return data;
    } else {
      const details = await response.json();
      throw new Error(details.detail);
    }
  } catch (error) {
    console.error("Error during token retrieval:", error);
    return Error("Error during token retrieval");
  }
};

export const checkTokenValidity = async () => {
  const authTokens = JSON.parse(localStorage.getItem("authTokens"));
  const accessToken = authTokens["access"];
  const refreshToken = authTokens["refresh"];

  if (!accessToken || !refreshToken) {
    return false;
  }

  // verifying token
  try {
    const res = await fetch("http://127.0.0.1:8000/api/token/verify/", {
      method: "POST",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: accessToken }),
    });

    if (res.ok) {
      return true;
    } else {
      const refreshResponse = await fetch(
        "http://127.0.0.1:8000/api/token/refresh/",
        {
          method: "POST",
          credentials: "same-origin",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: refreshToken }),
        }
      );

      if (refreshResponse.ok) {
        const data = await res.json();
        localStorage.setItem("authTokens", JSON.stringify(data));
        return true;
      } else {
        localStorage.setItem("authTokens", null);
        localStorage.setItem("user", null);
        return false;
      }
    }
  } catch (error) {
    console.log("Error in validating tokens");
    throw new Error("Error in validating tokens");
  }
};

export const userLogIn = async (username, password, accessToken) => {
  const user = {
    username: username,
    password: password,
  };

  try {
    const response = await fetch("http://127.0.0.1:8000/log-in/", {
      method: "POST",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const data = await response.json();
      return data.user;
    } else {
      console.error("Failed to get JWT tokens");
    }
  } catch (error) {
    console.error("Error during token retrieval:", error);
    return null;
  }
};

export const getUserDetails = async (username, email, accessToken) => {
  try {
    const res = await fetch("http://127.0.0.1:8000/get-user-details/", {
      method: "POST",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ username: username, email: email }),
    });

    if (res.ok) {
      const userData = await res.json();
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: userData.user.username,
          email: userData.user.email,
        })
      );
      return userData.user;
    }
  } catch (e) {
    throw new Error("Failed to get user details: ", e);
  }
};

export const logOutUser = async () => {
  localStorage.removeItem("user");
  localStorage.removeItem("authTokens");
};

export const signUpUser = async (uesrObj) => {
  try {
    const res = await fetch("http://127.0.0.1:8000/sign-up/", {
      method: "POST",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uesrObj),
    });

    if (res.ok) {
      const data = await res.json();
      return data.user;
    }
  } catch (e) {
    throw new Error("Creating account failed, server error");
  }
};

export const createUserObject = async (userDetails, accessToken) => {
  try {
    // creating new form
    const userDetailsForm = new FormData();
    Object.keys(userDetails).forEach((key) => {
      userDetailsForm.append(key, userDetails[key]);
    });

    const res = await fetch("http://127.0.0.1:8000/user-profile/", {
      method: "POST",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: userDetailsForm,
    });

    if (res.ok) {
      const data = await res.json();
      return data.userDetailsData;
    }
  } catch (e) {
    throw new Error(
      "Someting went wrong can not create user profile please try again"
    );
  }
};
