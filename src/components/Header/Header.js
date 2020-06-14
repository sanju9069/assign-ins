import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" activeClassName="activeLink">
            FileUpload
          </NavLink>
        </li>
        <li>
          <NavLink to="/gallery" activeClassName="activeLink">
            Gallery
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
