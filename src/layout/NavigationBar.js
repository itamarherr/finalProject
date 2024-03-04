import { useContext, useState, useRef } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Form, FormControl, Button, Offcanvas } from "react-bootstrap";


function NavigationBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userName = isLoggedIn ? localStorage.getItem("userName") : "N/A";
  const nav = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const textColor = theme === "dark" ? "text-light" : "text-dark";
  const sideWindowBgColor = theme === "dark" ? "bg-dark" : "bg-light"; // Dynamically set background color based on theme
  const [showMenu, setShowMenu] = useState(false);


  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    nav("/Login");
  };

  return (
    <>
      <Navbar expand="lg" className={`navbar navbar-${theme} bg-${theme}`} style={{ borderBottom: '1px solid black' }}>
        <Container>
          <Navbar.Brand>
            <img
              src="https://png.pngtree.com/png-clipart/20200720/original/pngtree-floral-golden-ornamental-letter-z-png-image_4773367.jpg" className="me-4" height="60"
              alt="Site logo" loading="lazy" />
            <strong style={{ fontFamily: 'Arial', fontSize: '1.5rem' }}>Ziv's app</strong>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setShowMenu(true)} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" className={`nav-link ${textColor}`}>
                Home
              </Link>
              <Link to="/CardListPage" className={`nav-link ${textColor}`}>
                Cards
              </Link>
              <Link to="/Favorite" className={`nav-link ${textColor}`}>
                Favorite
              </Link>
              <Link to="/nonBusinessPage" className={`nav-link ${textColor}`}>
                Unbusiness Cards
              </Link>
              <Link to="/MyCardListPage" className={`nav-link ${textColor}`}>
                My Cards
              </Link>
              <Link to="/AboutPage" className={`nav-link ${textColor}`}>
                About
              </Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-2"
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ width: '150px' }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
              <Button variant="outline-secondary" onClick={handleSearch}>
                <i className="bi bi-search"></i>
              </Button>
            </Form>
            <Nav className="ms-auto">
              {isLoggedIn ? (
                <Link to="/Login" className={`nav-link ${textColor}`} onClick={handleLogout}>
                  Logout
                </Link>
              ) : (
                <>
                  <Link to="/RegisterForm" className={`nav-link ${textColor}`}>
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
                  <i className={`bi bi-${theme === "dark" ? "moon-fill" : "brightness-high-fill"} ms-2`}></i>
                </label>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


      <Offcanvas show={showMenu} onHide={() => setShowMenu(false)} placement="start" style={{ width: '250px' }}>

        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={sideWindowBgColor}> {/* Dynamically apply background color class */}
          <Nav className="flex-column">
            <Link to="/" className={`nav-link ${textColor}`} onClick={() => setShowMenu(false)}>
              Home
            </Link>
            <Link to="/CardListPage" className={`nav-link ${textColor}`} onClick={() => setShowMenu(false)}>
              Cards
            </Link>
            <Link to="/Favorite" className={`nav-link ${textColor}`} onClick={() => setShowMenu(false)}>
              Favorite
            </Link>
            <Link to="/nonBusinessPage" className={`nav-link ${textColor}`} onClick={() => setShowMenu(false)}>
              Unbusiness cards
            </Link>
            <Link to="/MyCardListPage" className={`nav-link ${textColor}`} onClick={() => setShowMenu(false)}>
              My Cards
            </Link>
            <Form className="d-flex">
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-2"
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ width: '150px' }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
              <Button variant="outline-secondary" onClick={handleSearch}>
                <i className="bi bi-search"></i>
              </Button>
            </Form>
            {isLoggedIn ? (
              <Link to="/Login" className={`nav-link ${textColor}`} onClick={handleLogout}>
                Logout
              </Link>
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
                <i className={`bi bi-${theme === "dark" ? "moon-fill" : "brightness-high-fill"} ms-2`}></i>
              </label>
              {/* Add more links here if needed */}
            </div>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NavigationBar;
