import React from "react";
import classes from "./Stats.module.css";

export default function Stats(props) {
  function time(unit) {
    const minutes = Math.floor(unit / 60);
    const seconds = unit - minutes * 60;
    const timePassed =
      seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`;
    return timePassed;
  }

  return (
    <div className={classes.statsContainer}>
      <p className={classes.attempts}>Attempts: {props.stats.attempts}</p>
      <div className={classes.timeContainer}>
        <p className={classes.timePassed}>⏱ {time(props.stats.seconds)}</p>
        <p className={classes.bestTime}>🏆 Best Time {time(props.bestTime)}</p>
      </div>
    </div>
  );
}
