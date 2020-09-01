import React from "react";

import "./Header.css";

const Header = ({ children }) => {
  return (
    <div className="header-container">
      <a className="home-link" href="/">
        Conway's Game of Life
      </a>
      <div className="right-align">
        <a href="/">About</a>
      </div>
    </div>
  );
};

export default Header;
