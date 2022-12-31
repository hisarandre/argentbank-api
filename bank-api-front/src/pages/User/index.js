import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../../features/user/userSlice";
import CardAccount from "../../components/CardAccount";

import "./style.scss";

function User() {
  const { firstname, lastname } = useSelector(userSelector);

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {firstname} {lastname}
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>

      <CardAccount title="Argent Bank Checking (x8349)" amount="2,082.79" />
      <CardAccount title="Argent Bank Savings (x6712)" amount="10,928.42" />
      <CardAccount title="Argent Bank Credit Card (x8349)" amount="184.30" />
    </main>
  );
}

export default User;
