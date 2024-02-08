import { Navigate } from "react-router-dom";
import React, { useContext } from 'react';

function Protected ({children}){
    const isloggedIn = localStorage.getItem("isLoggedIn");
    if(isloggedIn === "true"){
        return children;
  
    } else {
          return <Navigate to="/" />;
    }

}
export default Protected;