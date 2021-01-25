import React from "react";
import { useGlobalContext } from "./context";

const Score = () => {
  const { score } = useGlobalContext();

  return (
    <div className='score-container'>
      <p className='score-label'>SCORE</p>
      <p className='score' id='score'>
        {score}
      </p>
    </div>
  );
};

export default Score;
