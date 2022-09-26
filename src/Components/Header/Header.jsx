import React from "react";
import "./Header.css";
import HeaderLink from "./HeaderLink/HeaderLink";

const Header = () => {
  return (
    <div className="Header">
      <div className="linkContainer">
        <HeaderLink url="/Home" text="Home" />
        <HeaderLink url="/AboutUs" text="About Us" />
      </div>
      <span className="logo">
        Typing
        <span>Pro</span>
      </span>
      <HeaderLink url="/History" text="History" />
    </div>
  );
};

export default Header;
