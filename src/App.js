import { useEffect } from 'react';
import './App.css';
import MyFooterBar from './layout/MyFooterBar';
import MyRouter from './components/MyRouter';
import NavigationBar from './layout/NavigationBar';
import { ThemeProvaider, ThemeContext } from './Context/ThemeContext';

function App() {
  
    
    return (
      <ThemeProvaider>
    <MyRouter />
    <MyFooterBar />
    </ThemeProvaider>
    );
}

export default App;
