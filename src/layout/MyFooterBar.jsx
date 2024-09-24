import { ThemeContext } from "../Context/ThemeContext";
import { useContext } from "react";
import NavigationBar from "./NavigationBar";
import React from 'react';

function MyFooterBar() {
  const { theme } = useContext(ThemeContext);

  return (
    <footer className="footer">
      <div className="container text-center py-2">
        <br />
      </div>
      <NavigationBar />
    </footer>
  );
}

export default MyFooterBar;