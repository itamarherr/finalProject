/* eslint-disable react/jsx-no-undef */
import { ThemeContext } from "../Context/ThemeContext";
import { useContext } from "react";

function MyFooterBar(){
      const  {theme}  = useContext(ThemeContext);
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

    return(
        <footer className={`footer bg-${theme} text-${themeContrast}`}>
            <div className="container text-center py-2">
               <span> &copy; All Rights Reserved - Ziv & Chello inc 2023</span>
               <br />
                <span>The current theme is: {theme}</span>
            </div>
        </footer>
    );


}
export default MyFooterBar;


