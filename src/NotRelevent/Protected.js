import { Navigate } from "react-router-dom";

function Protected ({children}){
    const isAuthenticted = localStorage.getItem("isLoggedIn");
    if(isAuthenticted){
        return children;
  
    }
          return <Navigate to="/" />;

}
export default Protected;