import { ThemeContext } from "../Context/ThemeContext";
import { useContext } from "react";
import NavigationBar from "./NavigationBar";


function MyFooterBar() {
  const { theme } = useContext(ThemeContext);
  let themeContrast = theme;
  switch (theme) {
    case "light":
      themeContrast = "dark";
      break;
    case "dark":
      themeContrast = "light";
      break;
    default:
      themeContrast = theme;
  }

  return (
    <footer className={`footer bg-${theme} text-${themeContrast}`}>
      <div className="container text-center py-2">
        <br />
      </div>
      <NavigationBar />
    </footer>
  );


}
export default MyFooterBar;


