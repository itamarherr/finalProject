import React, { useContext } from 'react';
import { LoginContext} from '../Context/AuthProvider';
import Login from './Login';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, user } = React.useContext(LoginContext);
  if(isLoggedIn && user && user.isBusiness) {
    return children;
  } else if (isLoggedIn && user && !user.isBusiness){
    return <Navigate to="HomePage"/>
  } else{


  return  isLoggedIn ? (
   children
  ) : (
<Login></Login>
  );
};
}

export default ProtectedRoute;

// this componenet is currntly not used