import { user1, user2, token1, token2 } from "../../config";
import axios from "axios";
import piecePositions from "../../constants/piecePositions";

export const resignGame = (gameId, currentPlayer) => async (dispatch) => {
  axios
    .post(`https://lichess.org/api/board/game/${gameId}/resign`, {
      headers: {
        Authorization: `Bearer ${token2}`,
      },
    })
    .then((res) => {
      console.log(res);
      console.log("user " + currentPlayer + " resigned");
      dispatch(getGameState(gameId));
    })
    .catch((err) => console.log(err));
};

export const streamIncomingEvents = (token) => async (dispatch) => {
  axios
    .get("https://lichess.org/api/stream/event", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};

export const acceptChallenge = (gameId, token) => async (dispatch) => {
  axios
    .post(`https://lichess.org/api/challenge/${gameId}/accept`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const saveCurrentPlayer = (player) => {
  return {
    type: "SAVE_CURRENT_PLAYER",
    payload: player,
  };
};

export const updatePiecePositions = (piecePositions) => {
  return {
    type: "UPDATE_PIECE_POSITIONS",
    payload: piecePositions,
  };
};

export const getGameBoardState = (gameId) => async (dispatch) => {
  axios
    .get(`https://lichess.org/api/board/game/stream/${gameId}`, {
      headers: {
        Authorization: `Bearer ${token1}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.white.id !== "techacademy") {
        dispatch(saveCurrentPlayer(2));
      }
    })
    .catch((err) => console.log(err));
};

export const offerDraw = (gameId, playerOffering) => {};

export const handleDrawOffer = (gameId, playerReceiving, accept) => async (
  dispatch
) => {
  //accept has to be yes or no
  axios
    .post(`https://lichess.org/api/board/game/${gameId}/draw/${accept}`, {
      headers: {
        Authorization: `Bearer ${playerReceiving === 1 ? token1 : token2}`,
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getGameState(gameId));
    })
    .catch((err) => console.log(err));
};

export const abortGame = (gameId, currentPlayer) => async (dispatch) => {
  axios
    .post(`https://cors-anywhere.herokuapp.com/https://lichess.org/api/board/game/${gameId}/abort`, {
      headers: {
        Authorization: `Bearer ${token2}`,

      },
    })
    .then((res) => {
      console.log(res);
      console.log("user " + currentPlayer + " aborted");
      dispatch(getGameState(gameId));
    })
    .catch((err) => console.log(err));
};

export const createChallenge = (clockLimit, color) => async (dispatch) => {
  const data = {
    rated: false,
    clock: {
      limit: clockLimit * 60,
      increment: 0,
    },
    color: color.toLowerCase(),
    variant: "standard",
    acceptByToken: token2,
  };
  console.log("data sending", data);
  axios
    .post(`https://lichess.org/api/challenge/${user2}`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${token1}`,
      },
    })
    .then((res) => {
      console.log("res", res);
      dispatch(saveGameId(res.data.challenge.id));
    })
    .catch((err) => console.log(err));
};

export const saveGameId = (gameId) => {
  return {
    type: "SAVE_GAME_ID",
    payload: gameId,
  };
};

export const getGameState = (gameId) => async (dispatch) => {
  axios
    .get(`https://lichess.org/api/board/game/stream/${gameId}`, {
      headers: {
        Authorization: `Bearer ${token1}`,
      },
    })
    .then((res) => {
      console.log("res", res.data);

      if (res.data.state && res.data.state.status === "mate") {
        dispatch(saveGameStatus(res.data.state.status));
        dispatch(saveWinner(res.data.state.winner));
        alert(`Checkmate, winner ${res.data.state.winner}`);
      }
    })
    .catch((err) => console.log(err));
};

export const saveWinner = (winner) => {
  return {
    type: "SAVE_WINNER",
    payload: winner,
  };
};

export const saveGameStatus = (status) => {
  return {
    type: "SAVE_GAME_STATUS",
    payload: status,
  };
};
