import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import HomePage from "./HomePage";
import CardListPage from "./CardListPage";
import AddCard from "./AddCard";
import UpdateCard from "./UpdateCard";
import NavigationBar from "../layout/NavigationBar";
import RegisterForm from "./RegisterForm";
import { ThemeProvider } from "../Context/ThemeContext";
import UpdateUser from "./UpdateUser";
import React, { useContext } from "react";
import  { LoginProvider, LoginContext } from "../Context/AuthProvider";
 import ProtectedRoute from "./ProtectedRoute"; 
import Protected from "../NotRelevent/Protected";
import { useNavigate } from 'react-router-dom';
import NonBusinessPage from './NonBusinessPage';

function MyRouter() {
  const { user } = useContext(LoginContext);
  return (
    <ThemeProvider>
      <LoginProvider>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/nonBusinessPage" element={<NonBusinessPage />} />
          <Route path="/"element={<HomePage />}/>
          <Route path="/RegisterForm" element={<RegisterForm />} />
          
            <Route path="/CardListPage" element={ 
            <ProtectedRoute>
              <CardListPage/> 
              </ProtectedRoute> } />
         
          <Route path="/UpdateUser" element={<UpdateUser />} />
          <Route path="/UpdateCard/:id" element={<UpdateCard />} />
          <Route path="/AddCard" element={<AddCard />} />
        </Routes>
      </BrowserRouter>
      </LoginProvider>
    </ThemeProvider>
  );
}
export default MyRouter;
