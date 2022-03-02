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
        src={`https://picsum.photos/${window.innerWidth}/400?grayscale`}
        alt="header"
      />
    </div>
  );
};

export default Header;
