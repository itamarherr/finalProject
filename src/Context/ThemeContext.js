import React, { createContext, useState, useContext } from 'react';
export const ThemeContext = createContext();

export function ThemeProvider({ children}) {
    const [theme, setTheme] = useState("dark");

    const toggleTheme = () => {
        setTheme((prevTheme)=> (prevTheme === "light" ? "dark" : "light"));

    };




    return( <ThemeContext.Provider value={{theme, toggleTheme}}>{children}</ThemeContext.Provider>
    );
}
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
      throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
  };