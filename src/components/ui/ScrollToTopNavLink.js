import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const ScrollToTopNavLink = ({ to, children, ...rest }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    navigate(to); // Navigate programmatically
    window.scrollTo(0, 0); // Scroll to top
  };

  return (
    <NavLink to={to} {...rest} onClick={handleClick}>
      {children}
    </NavLink>
  );
};

export default ScrollToTopNavLink;
