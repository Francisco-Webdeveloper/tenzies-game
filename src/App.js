/* eslint-disable no-unreachable */
import React from "react";
import Die from "./components/Die";
import Stats from "./components/Stats";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [stats, setStats] = React.useState(generateStats());
  const [bestTime, setBestTime] = React.useState(() =>
    localStorage.getItem("bestTime")
      ? JSON.parse(localStorage.getItem("bestTime"))
      : null
  );

  // generates 1 random die
  function generateDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      id: nanoid(),
      isHeld: false,
    };
  }

  // used to initialize the stats state
  function generateStats() {
    return {
      seconds: 0,
      attempts: 1,
    };
  }

  // returns an array of dice that will initialize the dice state
  function allNewDice() {
    const arrayOfDice = [];
    for (let i = 0; i < 10; i++) {
      arrayOfDice.push(generateDie());
    }
    return arrayOfDice;
  }

  function rollDice() {
    setDice((oldDice) => {
      // starts a new game if tenzies state is true (all the dice have the same value and are held)
      if (tenzies) {
        setTenzies(false);
        setStats(generateStats()); // set stats to the initial state
        return allNewDice();
      } else {
        // increase the number of attempts
        setStats((prevStats) => ({
          ...prevStats,
          attempts: (prevStats.attempts += 1),
        }));
        // only rolls the dice which are not held
        return oldDice.map((die) => (die.isHeld ? die : generateDie()));
      }
    });
  }

  function holdDie(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        // hold the die if the id of the die we are in our array is the same as the one the user clicks
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  // 2 states in sync require the useEffect hook
  React.useEffect(() => {
    // check if all the dice are held and have the same value
    if (dice.every((die) => die.isHeld && die.value === dice[0].value)) {
      setTenzies(true);

      if (
        // check if there is a new best time or if there isn't local storage yet
        stats.seconds < localStorage.getItem("bestTime") ||
        !localStorage.getItem("bestTime")
      ) {
        // save the new best time state and create / update local storage
        setBestTime(stats.seconds);
        localStorage.setItem("bestTime", JSON.stringify(stats.seconds));
      }
    }
  }, [dice, bestTime, stats.seconds]);

  React.useEffect(() => {
    let timerInterval;
    if (!tenzies) {
      timerInterval = setInterval(() => {
        setStats((prevStats) => ({
          ...prevStats,
          seconds: (prevStats.seconds += 1),
        }));
      }, 1000);
    } else if (tenzies && stats.seconds !== 0) {
      clearInterval(timerInterval);
    }
    return () => clearInterval(timerInterval);
  }, [stats.seconds, tenzies]);

  const diceElements = dice.map((die) => {
    return (
      <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDie={() => holdDie(die.id)}
      />
    );
  });

  const styles = { backgroundColor: tenzies ? "#e83a14" : "#008e89" };

  return (
    <div className="container">
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button onClick={rollDice} style={styles}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      <Stats stats={stats} bestTime={bestTime} />
    </div>
  );
}
