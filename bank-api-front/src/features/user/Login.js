import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, userSelector } from "./userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { token, loginStatus, loginError } = useSelector(userSelector);

  const handleSubmit = (e) => {
    dispatch(loginUser({ username: username, password: password, rememberMe: rememberMe }));
    e.preventDefault();
    setUsername("");
    setPassword("");
  };

  useEffect(() => {
    if (loginStatus === "success") {
      navigate(`/profile`);
    }
  }, [loginStatus]);

  useEffect(() => {
    if (token) {
      navigate(`/profile`);
    }
  }, []);

  return (
    <>
      <form method="POST" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" required value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="input-remember">
          <input type="checkbox" id="remember-me" onClick={() => setRememberMe(!rememberMe)} />
          <label htmlFor="remember-me">Remember me</label>
        </div>

        <button className="sign-in-button">{loginStatus === "pending" ? "submiting" : "Sign In"}</button>
      </form>
      <p className="error-message">{loginStatus === "rejected" ? loginError : null}</p>
    </>
  );
};

export default Login;
