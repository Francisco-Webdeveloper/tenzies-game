import React from "react";
import classes from "./Die.module.css";

export default function Die(props) {
  const styles = { backgroundColor: props.isHeld ? "#FFD32D" : "white" };

  return (
    <div className={classes.dieFace} style={styles} onClick={props.holdDie}>
      <h2>{props.value}</h2>
    </div>
  );
}
