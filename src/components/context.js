import React, { useContext, useReducer, useEffect } from "react";
import options from "../data/data";

const AppContext = React.createContext();

const reducer = (state, action) => {
  if (action.type === "MAKE_PICKS") {
    const playerPick = options.find((o) => o.symbol === action.payload);
    const housePick = options[Math.floor(Math.random() * options.length)];

    return { ...state, housePick, playerPick, showResult: true };
  }

  if (action.type === "DETERMINE_WINNER") {
    const p = state.playerPick.symbol;
    const h = state.housePick.symbol;
    let score = state.score,
      winner = "";

    if (p === "r") {
      if (h === "s") winner = "player";
      else if (h === "p") winner = "house";
      else winner = "tie";
    } else if (p === "s") {
      if (h === "p") winner = "player";
      else if (h === "r") winner = "house";
      else winner = "tie";
    } else if (p === "p") {
      if (h === "r") winner = "player";
      else if (h === "s") winner = "house";
      else winner = "tie";
    }

    if (winner === "player") score++;

    return { ...state, winner, score };
  }

  if (action.type === "PLAY_AGAIN") {
    return {
      ...state,
      playerPick: {},
      housePick: {},
      showResult: false,
      winner: "",
    };
  }

  if (action.type === "OPEN_MODAL") {
    return { ...state, showModal: true };
  }

  if (action.type === "CLOSE_MODAL") {
    return { ...state, showModal: false };
  }
};

const initialState = {
  showModal: false,
  playerPick: {},
  housePick: {},
  showResult: false,
  score: 0,
  winner: "",
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openModal = () => {
    dispatch({ type: "OPEN_MODAL" });
  };

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const pick = (symbol) => {
    dispatch({ type: "MAKE_PICKS", payload: symbol });
  };

  const playAgain = () => {
    dispatch({ type: "PLAY_AGAIN" });
  };

  useEffect(() => {
    if (state.showResult) {
      dispatch({ type: "DETERMINE_WINNER" });
    }
  }, [state.showResult]);

  // On player pick

  return (
    <AppContext.Provider
      value={{
        showModal: state.showModal,
        showResult: state.showResult,
        playerPick: state.playerPick,
        housePick: state.housePick,
        score: state.score,
        winner: state.winner,
        openModal,
        closeModal,
        pick,
        playAgain,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
