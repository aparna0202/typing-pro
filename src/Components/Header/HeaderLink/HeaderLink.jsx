import React from "react";
import "./HeaderLink.css";

const HeaderLink = ({ url = "#", text = "#" }) => {
  return (
    <a href={url} className="headerLink">
      {text}
    </a>
  );
};

export default HeaderLink;
