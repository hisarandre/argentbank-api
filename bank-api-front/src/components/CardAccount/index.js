import React from "react";
import { PropTypes } from "prop-types";

import "./style.scss";

const CardAccount = ({ title, amount }) => {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount">${amount}</p>
        <p className="account-amount-description">Available Balance</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  );
};

CardAccount.propTypes = {
  title: PropTypes.string,
  amount: PropTypes.string,
};

export default CardAccount;
