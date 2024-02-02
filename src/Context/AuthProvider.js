import React, { useState, useEffect, createContext, Fragment } from "react";
import { loginUser } from "../components/service/apiUser";

export const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await loginUser(email, password);
    console.log(response);
    localStorage.setItem("user", JSON.stringify(response.user));
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
