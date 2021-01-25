import "./App.css";
import React from "react";

import Logo from "./Logo";
import Score from "./Score";
import Option from "./Option";
import Result from "./Result";
import InfoModal from "./InfoModal";

import options from "../data/data.js";
import { useGlobalContext } from "./context";

const App = () => {
  const {
    showModal,
    showResult,
    openModal,
    housePick,
    playerPick,
    pick,
    playAgain,
    winner,
  } = useGlobalContext();
  console.log(winner);
  return (
    <>
      <header>
        <Logo />
        <Score />
      </header>
      {/* <pre>{JSON.stringify(useGlobalContext(), undefined, 2)}</pre> */}
      <main className='game'>
        {!showResult ? (
          <div className='game-container'>
            {options.map((option) => {
              const { id, icon, symbol, label, className } = option;
              return (
                <Option
                  key={id}
                  icon={icon}
                  symbol={symbol}
                  label={label}
                  className={`${className} option--game`}
                  onClick={() => pick(symbol)}
                />
              );
            })}
          </div>
        ) : (
          <div className='result-container'>
            <Result
              icon={playerPick.icon}
              symbol={playerPick.symbol}
              label={playerPick.label}
              className={`${playerPick.className} option--result`}
            />
            <Result
              icon={housePick.icon}
              symbol={housePick.symbol}
              label={housePick.label}
              className={`${housePick.className} option--result`}
            />
            <h1 className='result-message'>{
                winner === "player"
                  ? "YOU WIN"
                  : winner === "house"
                  ? "YOU LOSE"
                  : "TIE"
              }</h1>
            <button className='play-again' onClick={playAgain}>
              Play Again
            </button>
            <div
              className={`ripple ${
                winner === "player"
                  ? "ripple--left"
                  : winner === "house"
                  ? "ripple--right"
                  : "ripple--tie"
              }`}
            ></div>
          </div>
        )}
      </main>
      <button className='modal-trigger' onClick={openModal}>
        RULES
      </button>
      {showModal && <InfoModal />}
    </>
  );
};

export default App;
