import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { LoginContext} from '../Context/AuthProvider';

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = React.useContext(LoginContext);

  return  isLoggedIn ? (
    <Route element={element} />
  ) : (
    <Navigate to="/Login" replace />
  );
};

export default ProtectedRoute;

// this componenet is currntly not used