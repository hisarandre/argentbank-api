import React from "react";
import { PropTypes } from "prop-types";

import "./style.scss";

function CardFeature({ icon, title, content }) {
  return (
    <article className="feature-item">
      <img src={icon} alt="Feature Icon" className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{content}</p>
    </article>
  );
}

CardFeature.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  content: PropTypes.string,
};

export default CardFeature;
