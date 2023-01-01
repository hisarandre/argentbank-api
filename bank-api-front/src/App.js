import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userSelector, checkToken, logout } from "./features/user/userSlice";

import Home from "./pages/Home";
import Signin from "./pages/Signin";
import User from "./pages/User";
import Error from "./pages/Error";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

function App() {
  const { token } = useSelector(userSelector);
  const [isLogged, setIsLogged] = useState(token ? true : false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      return setIsLogged(true);
    }
    return setIsLogged(false);
  }, [token]);

  const handleLogin = () => {
    dispatch(logout());
    setIsLogged(false);
  };

  return (
    <BrowserRouter>
      <Navigation isLogged={isLogged} handleLogin={handleLogin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<Signin isLogged={isLogged} />} />
        <Route path="/user/profile" element={<User isLogged={isLogged} />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
