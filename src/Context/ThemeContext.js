import { createContext, useState } from "react";
export const ThemeContext = createContext();

export function ThemeProvaider({ children}) {
    const [theme, setTheme] = useState("dark");

    const toggleTheme = () => {
        setTheme((prevTheme)=> (prevTheme === "light" ? "dark" : "light"));

    };




    return( <ThemeContext.Provider value={{theme, toggleTheme}}>{children}</ThemeContext.Provider>
    );
}