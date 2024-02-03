import React, { useState, useEffect, createContext, Fragment } from "react";
import { loginUser } from "../components/service/apiUser";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        // Handle parsing error if needed
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await loginUser(email, password);
    console.log(response);
    localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true");

      setIsLoggedIn(true);

      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };
  const logOut = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <LoginContext.Provider value={{ user, login, logOut, isLoggedIn }}>
      <Fragment>{children}</Fragment>
    </LoginContext.Provider>
  );
};
export default LoginProvider;
