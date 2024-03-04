import { ThemeContext } from "../Context/ThemeContext";
import { useContext, useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";


function MyFooterBar() {
  const { theme } = useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    function handleScroll() {
      const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
      setIsVisible(scrolledToBottom);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className={`footer ${isVisible ? 'visible' : ''}`}>
      <div className="container text-center py-2">
        <br />
      </div>
      <NavigationBar />
    </footer>
  );
}

export default MyFooterBar;