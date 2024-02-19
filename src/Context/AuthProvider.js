import React, { useState, useEffect, createContext, Fragment } from "react";
import { loginUser, registerUser } from "../components/service/apiUser";
import {jwtDecode} from "jwt-decode";
export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ isBusiness, setIsBusiness ] = useState(false);
  
   useEffect(() => {
     const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        // const parsedUser = JSON.parse(storedUser);
       // setUser(parsedUser);
        setIsLoggedIn(true);
        setIsBusiness(isBusiness);
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
   }, []);

  const login = async (email, password) => {
    try {
      const Response = await loginUser(email, password);

    //    if (loginResponse.token) {

    //   //   console.log(loginResponse);

    console.log()

        // const { isBusiness } = Response;
         let isBusiness = jwtDecode(Response).isBusiness;
         // setUser(loggedInUser);
         setIsBusiness(isBusiness);
        //  localStorage.setItem("user", JSON.stringify(user));
        //  localStorage.setItem("isBusiness", JSON.stringify(isBusiness));
         localStorage.setItem("isLoggedIn", "true");

        setIsLoggedIn(true);

        return Response;
    //   } else {
    //      throw new Error("Login failed")
    //    }
      } catch (error) {
         console.error("Login failed:", error);
       throw error; 
       }
     };
    const logOut = () => {
      setUser(null);
      localStorage.removeItem("user");
      //localStorage.removeItem("roles");
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
    };

    // const isBusiness = () => {
    //   return user && localStorage.getItem("isBusiness") === "true";
    // };

    return (
      <LoginContext.Provider value={{ user, login, logOut, isLoggedIn, isBusiness }}>
        {console.log('Context value:', {isBusiness})}
        <Fragment>{children}</Fragment>
      </LoginContext.Provider>
    );
  };
  export default LoginProvider;
