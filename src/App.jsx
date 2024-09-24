
import './App.css';
import MyFooterBar from './layout/MyFooterBar';
import MyRouter from './components/MyRouter';
import NavigationBar from './layout/NavigationBar';
import { ThemeProvider, ThemeContext } from './Context/ThemeContext';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import LoginProvider from './Context/AuthProvider';

function App() {
  return (
 
    <ThemeProvider>
      <Router>
        <NavigationBar />
        <MyRouter />
        <MyFooterBar />
      </Router>
    </ThemeProvider>

  );
}
function Footer() {
  const location = useLocation();
  if (location.pathname === '/login') {
    return null;
  }
  return <MyFooterBar />;
}

export default App;