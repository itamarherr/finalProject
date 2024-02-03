import { useEffect } from 'react';
import './App.css';
import MyFooterBar from './layout/MyFooterBar';
import MyRouter from './components/MyRouter';
import NavigationBar from './layout/NavigationBar';
import { ThemeProvider, ThemeContext } from './Context/ThemeContext';

function App() {
  
    
    return (
      <ThemeProvider>
    <MyRouter />
    <MyFooterBar />
    </ThemeProvider>
    );
}

export default App;
