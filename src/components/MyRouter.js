import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import HomePage from "./HomePage";
import CardListPage from "./CardListPage";
import AddCard from "./AddCard";
import UpdateCard from "./UpdateCard";
import RegisterForm from "./RegisterForm";
import React from "react";
import ProtectedRoute from "./ProtectedRoute";
import NonBusinessPage from './NonBusinessPage';
import FavoriteCardsPage from "./favoriteCardsPage";
import BusinessDetailPage from "./BusinessDetailPage";
import SearchResultsPage from "./SearchResultPage";
import MyCardsPage from "./MyCardsPage";
import AboutPage from "./AboutPage";


function MyRouter() {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/favorite" element={<FavoriteCardsPage />} />
      <Route path="/nonBusinessPage" element={<NonBusinessPage />} />
      <Route path="/business/:id" element={<BusinessDetailPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/RegisterForm" element={<RegisterForm />} />
      <Route path="/MyCardsPage" element={<MyCardsPage />} />
      <Route path="/AboutPage" element={<AboutPage />} />


      <Route path="/CardListPage" element={
        <ProtectedRoute>
          <CardListPage />
        </ProtectedRoute>} />

      <Route path="/search" element={<SearchResultsPage />} />
      <Route path="/UpdateCard/:id" element={<UpdateCard />} />
      <Route path="/AddCard" element={<AddCard />} />
    </Routes>
  );
}
export default MyRouter;
