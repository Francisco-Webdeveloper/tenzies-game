import React from "react";
import Die from "./components/Die";

export default function App() {
  const [dice, setDice] = React.useState(randomDice());

  function randomDice() {
    const arrayOfDice = [];
    for (let i = 0; i < 10; i++) {
      const randomDie = Math.ceil(Math.random() * 6);
      arrayOfDice.push(randomDie);
    }
    return arrayOfDice;
  }

  console.log(dice);

  return (
    <div className="container">
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <Die dice={dice} />
      <button>Roll</button>
    </div>
  );
}
