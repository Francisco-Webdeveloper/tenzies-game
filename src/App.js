import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";

export default function App() {
  const [dice, setDice] = React.useState(randomDice());

  function generateDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      id: nanoid(),
      isHeld: false,
    };
  }

  function randomDice() {
    const arrayOfDice = [];
    for (let i = 0; i < 10; i++) {
      arrayOfDice.push(generateDie());
    }
    return arrayOfDice;
  }

  function rollDice() {
    setDice((oldDice) =>
      oldDice.map((die) => (die.isHeld ? die : generateDie()))
    );
  }

  function holdDie(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        if (die.id === id) {
          return { ...die, isHeld: !die.isHeld };
        } else {
          return die;
        }
      })
    );
  }

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
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button onClick={rollDice}>Roll</button>
    </div>
  );
}
