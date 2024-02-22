import React, { useContext } from 'react';
import { LoginContext } from '../Context/AuthProvider';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isBusiness } = useContext(LoginContext);
  console.log('isBusiness in route:', isBusiness);
  //const isBusinessUser = isLoggedIn && isBusiness;

  //const isAuthenticated = isLoggedIn && user;

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  else if (!isBusiness) {
    return <Navigate to="/NonBusinessPage" />;
  }

  return <>{children}</>;







}


export default ProtectedRoute;
