import React from "react";
import CardFeature from "../CardFeature";
import iconChat from "../../assets/icon-chat.png";
import iconSecurity from "../../assets/icon-security.png";
import iconMoney from "../../assets/icon-money.png";

import "./style.scss";

function Feature() {
  const data = [
    {
      image: iconChat,
      title: "You are our #1 priority",
      texte: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
    },
    {
      image: iconMoney,
      title: "More savings means higher rates",
      texte: "The more you save with us, the higher your interest rate will be!",
    },
    {
      image: iconSecurity,
      title: "Security you can trust",
      texte: "We use top of the line encryption to make sure your data and money is always safe.",
    },
  ];

  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      {data.map((e, index) => (
        <CardFeature key={`${index}-feature`} icon={e.image} title={e.title} content={e.texte} />
      ))}
    </section>
  );
}

export default Feature;
