import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Login from "./Login";
import UserList from "../NotRelevent/UserList";
import AbouteUs from "./HomePage";

import HomePage from "./HomePage";
import HiringForm from "../NotRelevent/HiringForm";
import CardListPage from "./CardListPage";
import AddCard from "./AddCard";
import UpdateCard from "./UpdateCard";
import NavigationBar from "../layout/NavigationBar";
import RegisterForm from "./RegisterForm";
import { ThemeContext, ThemeProvaider } from "../Context/ThemeContext";
import BusinessCards from "../NotRelevent/BusinessCards";
import UpdateUser from "./UpdateUser";
function MyRouter() {
  return (
    <ThemeProvaider>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/HomePage" element={<Login />} />
          <Route
            path="/"
            element={
              <div>
                <HomePage />
              </div>
            }
          />

          <Route path="/RegisterForm" element={<RegisterForm />} />
          <Route
            path="/CardListPage"
            element={
              <div>
                <h1>Cards Page</h1>
                <CardListPage />
              </div>
            }
          />
          <Route path="/UpdateUser" element={<UpdateUser />} />
          <Route path="/UpdateCard/:id" element={<UpdateCard />} />
          <Route path="/AddCard" element={<AddCard />} />
          <Route path="/HiringForm" element={<HiringForm />} />
          <Route path="/BusinessCards" element={<BusinessCards />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvaider>
  );
}
export default MyRouter;
