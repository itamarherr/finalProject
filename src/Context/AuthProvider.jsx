import React, { useState, useEffect, createContext } from "react";
import { loginUser, registerUser } from "../components/service/apiUser";
import { jwtDecode } from "jwt-decode";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isBusiness, setIsBusiness] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    const storedIsBusiness = localStorage.getItem("isBusiness");

    if (token && storedIsLoggedIn === "true") {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
        setIsLoggedIn(true);
        setIsBusiness(storedIsBusiness === "true");
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("isBusiness");
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await loginUser(email, password);
      console.log("Login Response:", response);
      const token = response.token;

      if (token) {
        const decodedToken = jwtDecode(token);
        localStorage.setItem("token", token);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem(
          "isBusiness",
          decodedToken.isBusiness ? "true" : "false"
        );
        setUser(decodedToken);
        setIsLoggedIn(true);
        setIsBusiness(decodedToken.isBusiness);
        return token;
      } else {
        throw new Error("No token received from server");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setIsBusiness(false);
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isBusiness");
  };

  const register = async (userData) => {
    try {
      const response = await registerUser(userData);
      const token = response.token;
      if (token) {
        const decodedToken = jwtDecode(token);
        localStorage.setItem("token", token);
        localStorage.setItem("isLoggedIn", "true");

        setUser(decodedToken);
        setIsLoggedIn(true);
        setIsBusiness(decodedToken.isBusiness);
        return token;
      } else {
        throw new Error("No token received from server after registration");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  return (
    <LoginContext.Provider
      value={{ user, login, logout, register, isLoggedIn, isBusiness }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
