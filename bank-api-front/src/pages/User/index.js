import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userSelector, loadUser } from "../../features/user/userSlice";
import CardAccount from "../../components/CardAccount";
import EditUser from "../../features/user/EditUser";

import "./style.scss";

function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userLoaded, token, firstname, lastname } = useSelector(userSelector);

  useEffect(() => {
    if (token) {
      dispatch(loadUser({ token: token }));
    }
    // eslint-disable-next-line
  }, []);

  //redirect after logout
  useEffect(() => {
    if (!token) {
      navigate(`/`);
    }
  }, [token, navigate]);

  useEffect(() => {
    if (token) {
      dispatch(loadUser({ token: token }));
    }
    // eslint-disable-next-line
  }, [firstname, lastname]);

  return userLoaded ? (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {firstname} {lastname}
        </h1>

        <EditUser />
      </div>
      <h2 className="sr-only">Accounts</h2>

      <CardAccount title="Argent Bank Checking (x8349)" amount="2,082.79" />
      <CardAccount title="Argent Bank Savings (x6712)" amount="10,928.42" />
      <CardAccount title="Argent Bank Credit Card (x8349)" amount="184.30" />
    </main>
  ) : null;
}

export default User;
