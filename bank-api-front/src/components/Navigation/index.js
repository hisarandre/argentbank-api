import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/argentBankLogo.png";

import "./style.scss";

function Navigation({ isLogged, handleLogin }) {
  return (
    <nav className="main-nav">
      <NavLink to="/" className="main-nav-logo">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>
        {!isLogged ? (
          <NavLink to="/user/login" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
        ) : (
          <>
            <NavLink to="/user/profile" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              profile
            </NavLink>
            <NavLink className="main-nav-item" onClick={handleLogin}>
              logout
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
