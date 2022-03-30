import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  // generates 1 random die
  function generateDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      id: nanoid(),
      isHeld: false,
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
        return allNewDice();
        // only rolls the dice which are not held
      } else {
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
      return setTenzies(true);
    }
  }, [dice]);

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

  return (
    <div className="container">
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </div>
  );
}
