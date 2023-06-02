import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
// import AuthContext from '../../store/auth-context';

// import Clock from '../ui/Clock';
import { Backdrop } from "../ui/ErrorModal";

import classes from "./MainNav.module.css";
import { TbMenu } from "react-icons/tb";
import { TbX } from "react-icons/tb";
//import logo from '../../assets/pic/E3_logo.png';

const MainNav = () => {
  // const authCtx = useContext(AuthContext);

  // const { isLoggedIn, isAdmin, username } = authCtx;
  const [showNav, setShowNav] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  // const onLogoutHandler = () => {
  //   setShowNav(false);
  //   authCtx.logout();
  // };

  const onLinkClickHandler = () => {
    setShowNav(false);
  };

  const onToggleHandler = () => {
    setShowNav((prev) => !prev);
  };

  const onMouseEnterHandler = () => {
    setSubmenuOpen(true);
  };

  const onMouseLeaveHandler = () => {
    setSubmenuOpen(false);
  };

  const submenuClass =
    submenuOpen && !showNav
      ? `${classes.header__submenu} ${classes.show}`
      : `${classes.header__submenu} ${classes.hide}`;

  return (
    <header className={classes.header}>
      <nav>
        {/* <div className={classes.logo}>
          <Link to='/'>
            <img src={logo} alt='Company Logo' />
          </Link>
        </div> */}
        <div className={classes.cname}>
          <Link to="/">Sutong Tire Resources, Inc</Link>
        </div>
        <TbMenu
          className={`${classes.header__menuicon} ${
            showNav ? classes.inactive : classes.active
          }`}
          onClick={onToggleHandler}
        />
        <TbX
          className={`${classes.header__menuicon} ${
            showNav ? classes.active : classes.inactive
          }`}
          onClick={onToggleHandler}
        />
        {showNav && <Backdrop onConfirm={onLinkClickHandler}></Backdrop>}
        <div
          className={classes.header__links}
          id={showNav ? classes.hidden : ""}
        >
          <NavLink onClick={onLinkClickHandler} to="/">
            Home
          </NavLink>
          <NavLink onClick={onLinkClickHandler} to="/about">
            About
          </NavLink>
          <div
            className={classes.header__submenu__links}
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
          >
            <NavLink onClick={onLinkClickHandler} to="/products">
              Products
            </NavLink>

            <ul className={submenuClass}>
              <li>
                <NavLink onClick={onLinkClickHandler} to="/products/atv">
                  ATV
                </NavLink>
              </li>
              <li>
                <NavLink onClick={onLinkClickHandler} to="/products/golfcart">
                  Golf Cart
                </NavLink>
              </li>
              <li>
                <NavLink onClick={onLinkClickHandler} to="/products/lawngarden">
                  Lawn & Garden
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={onLinkClickHandler}
                  to="/products/mediumtruck"
                >
                  Medium Truck
                </NavLink>
              </li>
            </ul>
          </div>
          <NavLink onClick={onLinkClickHandler} to="/careers">
            Careers
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default MainNav;
