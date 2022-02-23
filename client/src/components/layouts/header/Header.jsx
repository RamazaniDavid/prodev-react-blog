import React from "react";
import "./Header.scss";

const Header = (props) => {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">React & Node</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img
        className="headerImage"
        src="assets/images/header/header01.jpg"
        alt="header"
      />
    </div>
  );
};

export default Header;
