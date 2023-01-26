import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSelector, logout } from "../../features/user/userSlice";
import { NavLink } from "react-router-dom";
import logo from "../../assets/argentBankLogo.png";

import "./style.scss";

function Navigation() {
  const { token, firstname, lastname } = useSelector(userSelector);
  const dispatch = useDispatch();

  return (
    <nav className="main-nav">
      <NavLink to="/" className="main-nav-logo">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>
        {!token ? (
          <NavLink to="/login" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
        ) : (
          <>
            <NavLink to="/profile" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              {firstname} {lastname}
            </NavLink>
            <NavLink className="main-nav-item" onClick={() => dispatch(logout())}>
              logout
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
