import React from "react";
import classes from "./Stats.module.css";

export default function Stats(props) {
  const minutes = Math.floor(props.stats.seconds / 60);
  const seconds = props.stats.seconds - minutes * 60;
  const timePassed =
    seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`;

  return (
    <div className={classes.statsContainer}>
      <p className={classes.attempts}>
        Number of Attempts:{" "}
        <span className={classes.stats}>{props.stats.attempts}</span>
      </p>
      <p>
        Time <span className={classes.stats}>{timePassed}</span>
      </p>
    </div>
  );
}
