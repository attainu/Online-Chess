export const saveUser = (user) => {
  return {
    type: "SAVE_USER",
    payload: user,
  };
};

export const updatePiecePositions = (piecePositions) => {
  return {
    type: "UPDATE_PIECE_POSITIONS",
    payload: piecePositions,
  };
};

export const resetPiecesCaptureByWhiteAndBlack = () => {
  return {
    type: "RESET_PIECES_CAPTURED"
  }
}

export const savePiecesCaptured = (piecesCapturedByWhite, piecesCapturedByBlack) => {
  return {
    type: "SAVE_PIECES_CAPTURED",
    payload: {white: piecesCapturedByWhite, black: piecesCapturedByBlack}
  }
}

export const addPieceCapturedByBlack = (piece) => {
  return {
    type: "ADD_PIECE_CAPTURED_BY_BLACK",
    payload: piece,
  };
};

export const addPieceCapturedByWhite = (piece) => {
  return {
    type: "ADD_PIECE_CAPTURED_BY_WHITE",
    payload: piece,
  };
};

export const saveGameId = (gameId) => {
  return {
    type: "SAVE_GAME_ID",
    payload: gameId,
  };
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

export const saveCurrentPlayer = (player) => {
  return {
    type: "SAVE_CURRENT_PLAYER",
    payload: player,
  };
};

export const saveGameBoardState = (gameBoardState) => {
  return {
    type: "SAVE_GAME_BOARD_STATE",
    payload: gameBoardState,
  };
};

export const saveWhiteAndBlack = (white, black) => {
  return {
    type: "SAVE_WHITE_AND_BLACK",
    payload: { white, black },
  };
};
