import React from "react";
import classes from "./Die.module.css";

export default function Die(props) {
  const diceElements = props.dice.map((die, index) => {
    return (
      <h2 key={index + 1} className={classes.dieFace}>
        {die}
      </h2>
    );
  });
  return <div className={classes.diceContainer}>{diceElements}</div>;
}
