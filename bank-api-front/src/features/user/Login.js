import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, fetchUserBytoken, userSelector, clearState } from "./userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { isSuccess, isError, errorMessage, token, id } = useSelector(userSelector);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username: username, password: password }));
    setUsername("");
    setPassword("");
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
      if (token) {
        navigate(`/user/${id}`);
      }
    };
  }, []);

  useEffect(() => {
    if (isError) {
      console.log(errorMessage);
      dispatch(clearState());
    }

    if (isSuccess) {
      dispatch(clearState());
      dispatch(fetchUserBytoken({ token: token }));
    }
  }, [isError, isSuccess]);

  useEffect(() => {
    if (id) {
      navigate(`/user/${id}`);
    }
  }, [id]);

  return (
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
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me">Remember me</label>
      </div>

      <button className="sign-in-button">Sign In</button>
    </form>
  );
};

export default Login;
