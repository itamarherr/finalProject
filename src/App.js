import { useEffect } from 'react';
import './App.css';
import MyFooterBar from './layout/MyFooterBar';
import MyRouter from './components/MyRouter';
import NavigationBar from './layout/NavigationBar';
import { ThemeProvider, ThemeContext } from './Context/ThemeContext';
import { BrowserRouter as Router } from 'react-router-dom';

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

export default App;