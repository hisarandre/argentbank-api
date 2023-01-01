import React, { useEffect } from "react";
import Login from "../../features/user/Login";
import { useNavigate } from "react-router-dom";

import "./style.scss";

function Signin({ isLogged }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) return navigate(`/user/profile`);
  }, [isLogged]);

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>

        <Login isLogged={isLogged} />
      </section>
    </main>
  );
}

export default Signin;
