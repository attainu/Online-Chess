import store from "../redux/reducers/store";
import {
  saveGameStatus,
  saveGameId,
  saveCurrentPlayer,
  saveGameBoardState,
  updatePiecePositions,
  saveWhiteAndBlack,
  saveUser,
  savePiecesCaptured,
} from "../redux/actions/saveActions";
const { dispatch } = store;

export const fetchFromLocalAndStoreInRedux = () => {
  const localGameId = localStorage.getItem("gameId");
  const localStatus = localStorage.getItem("status");
  const localCurrentPlayer = Number(localStorage.getItem("currentPlayer"));
  const localPiecePositions = JSON.parse(localStorage.getItem("piecePositions"));
  const localWhite = localStorage.getItem("white");
  const localBlack = localStorage.getItem("black");
  const localUser = localStorage.getItem("user");
  const localPiecesCapturedByBlack = JSON.parse(localStorage.getItem("piecesCapturedByBlack"));
  const localPiecesCapturedByWhite = JSON.parse( localStorage.getItem("piecesCapturedByWhite"));
  const localGameBoardState = JSON.parse(localStorage.getItem("gameBoardState"));

  dispatch(saveGameId(localGameId));
  dispatch(saveGameStatus(localStatus));
  dispatch(saveCurrentPlayer(localCurrentPlayer));
  dispatch(updatePiecePositions(localPiecePositions));
  dispatch(saveWhiteAndBlack(localWhite, localBlack));
  dispatch(savePiecesCaptured(localPiecesCapturedByWhite, localPiecesCapturedByBlack));
  dispatch(saveUser(localUser));
  dispatch(saveGameBoardState(localGameBoardState));
};

export const resetLocalStorage = () => {
  localStorage.removeItem("status");
  localStorage.removeItem("gameId");
  localStorage.removeItem("currentPlayer");
  localStorage.removeItem("gameBoardState");
  localStorage.removeItem("piecePositions");
  localStorage.removeItem("black");
  localStorage.removeItem("white");
  localStorage.removeItem("user");
  localStorage.removeItem("piecesCapturedByBlack");
  localStorage.removeItem("piecesCapturedByWhite");
};

/*
 status: null,
  gameId: null,
  currentPlayer: 1,
  piecePositions: null,
  gameBoardState: null,
  challenger: null,
  receiver: null,
  black: null,
  white: null,
  user: null,
  piecesCapturedByBlack: [],
  piecesCapturedByWhite: [],
  */
