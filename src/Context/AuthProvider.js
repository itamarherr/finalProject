import React, { useState, useEffect, createContext, Fragment } from "react";
import { loginUser } from "../components/service/apiUser";

export const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggdIn] = useState(() => {
    return user ? true : false;
  });
  useEffect(() => {}, [isLoggedIn]);

  const login = async (email, password) => {
    const response = await loginUser(email, password);
    console.log(response);
    //localStorage.setItem("token", JSON.stringify(response))
    //setIsLoggdIn(true)
    return response;
  };
  const logOut = () => {};

  return (
    <LoginContext.Provider value={{ user, login, logOut, isLoggedIn }}>
      <Fragment>{children}</Fragment>
    </LoginContext.Provider>
  );
};
export default LoginProvider;
