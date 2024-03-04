import { ThemeContext } from "../Context/ThemeContext";
import { useContext, useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";


function MyFooterBar() {
  const { theme } = useContext(ThemeContext);
  let themeContrast = theme === "light" ? "dark" : "light";
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const footer = document.querySelector('.footer');

      if (scrollTop > documentHeight - windowHeight - 100) {
        setIsVisible(true);
        footer.style.bottom = '0';
      } else {
        setIsVisible(false);
        footer.style.bottom = '-100%';
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer
      className={`footer bg-${theme} text-${themeContrast}`}
      style={{
        padding: '0.5rem 0',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        transition: 'bottom 0.3s ease',
        zIndex: 999,
        visibility: isVisible ? 'visible' : 'hidden',
      }}
    >
      <div className="container text-center py-0.5">
        <br />
      </div>
      <NavigationBar />
    </footer>
  );


}
export default MyFooterBar;


