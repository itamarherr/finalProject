
import { useContext, useState } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";


function NavigationBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userName = isLoggedIn ? localStorage.getItem("userName") : "N/A";
  const nav = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const textColor = theme === "dark" ? "text-light" : "text-dark";

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    nav("/Login");
  };
  return (

    <Navbar expand="lg" className={`navbar navbar-${theme} bg-${theme}`} style={{ borderBottom: '1px solid black' }}>
      <Container>
        <Navbar.Brand className="navbar-brand">
          <img
            src="https://png.pngtree.com/png-clipart/20200720/original/pngtree-floral-golden-ornamental-letter-z-png-image_4773367.jpg" className="me-4" height="60"
            alt="Site logo" loading="lazy" />
          <strong style={{ fontFamily: 'Arial', fontSize: '1.5rem' }}>Ziv's app</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className={`nav-link ${textColor}`}>
              Home
            </Link>
            <Link to="/CardListPage" className={`nav-link ${textColor}`}>
              My Cards
            </Link>
            <Link to="/Favorite" className={`nav-link ${textColor}`}>
              Favorite
            </Link>
            <Link to="/nonBusinessPage" className={`nav-link ${textColor}`}>
              unbusiness cards
            </Link>
          </Nav>
          <Form className="d-flex">
            <FormControl type="text"
              placeholder="Search"
              className="mr-2"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Button variant="outline-secondary" onClick={handleSearch}>
              <i className="bi bi-search"></i>
            </Button>
          </Form>
          <Nav className="ms-auto">

            {isLoggedIn ? (
              <>
                <Link to="/Login" className={`nav-link ${textColor}`} onClick={handleLogout}>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link to="/RegisterForm" className={`btn btn-light navbar-light ${textColor}`}>
                  Signup
                </Link>
                <Link to="/Login" className={`nav-link ${textColor}`}>
                  Login
                </Link>
              </>
            )}
            <div className="form-check form-switch d-flex align-items-center">
              <input
                type="checkbox"
                id="cdtoggleTheme"
                className="form-check-input"
                onChange={toggleTheme}
                value={theme === "dark"}
              />
              <label
                className={`form-check-label ${textColor} text-capitalize ms-2`} htmlFor="cdToggleTheme">
                {theme}
                <i className={`bi bi-${theme === "dark" ? "moon-fill" : "brightness-high-fill"} ms-2`}>
                </i>
              </label>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavigationBar;


