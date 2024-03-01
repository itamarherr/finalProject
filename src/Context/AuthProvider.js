import React, { useState, useEffect, createContext, Fragment } from "react";
import { loginUser, registerUser } from "../components/service/apiUser";
import { jwtDecode } from "jwt-decode";
export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBusiness, setIsBusiness] = useState(false);

  const login = async (email, password) => {
    try {
      const Response = await loginUser(email, password);

      console.log()

      let isBusiness = jwtDecode(Response).isBusiness;
      setIsBusiness(isBusiness);

      localStorage.setItem("isLoggedIn", "true");

      setIsLoggedIn(true);

      return Response;
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
    <LoginContext.Provider value={{ user, login, logOut, isLoggedIn, isBusiness }}>
      <Fragment>{children}</Fragment>
    </LoginContext.Provider>
  );
};
export default LoginProvider;
