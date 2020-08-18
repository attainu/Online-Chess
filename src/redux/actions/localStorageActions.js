export const saveUserLocally = (user) =>  {
  localStorage.setItem("user", user);
};

export const updatePiecePositionsLocally = (piecePositions) => {
    localStorage.setItem("piecePositions", JSON.stringify(piecePositions))
  };

export const resetPiecesCaptureByWhiteAndBlackLocally = () =>  {
  localStorage.setItem("piecesCapturedByBlack", JSON.stringify([]));
  localStorage.setItem("piecesCapturedByWhite", JSON.stringify([]));
};

export const addPieceCapturedByBlackLocally = (piece) => {
  const local = localStorage.getItem("piecesCapturedByBlack");
  if (local) {
    let localData = JSON.parse(local);
    localData.push(piece);
    localStorage.setItem("piecesCapturedByBlack", JSON.stringify(localData));
  }
};

export const addPieceCapturedByWhiteLocally = (piece) =>  {
  const local = localStorage.getItem("piecesCapturedByWhite");
  if (local) {
    let localData = JSON.parse(local);
    localData.push(piece);
    localStorage.setItem("piecesCapturedByWhite", JSON.stringify(localData));
  }
};

export const saveGameIdLocally = (gameId) =>  {
  localStorage.setItem("gameId", gameId);
};

export const saveWinnerLocally = (winner) =>  {
  localStorage.setItem("winner", winner);
};

export const saveGameStatusLocally = (status) => {
  localStorage.setItem("status", status);
};

export const saveCurrentPlayerLocally = (player) =>  {
  localStorage.setItem("currentPlayer", "" + player);
};

export const saveGameBoardStateLocally = (gameBoardState) =>  {
  localStorage.setItem("gameBoardState", JSON.stringify(gameBoardState));
};

export const saveWhiteAndBlackLocally = (white, black) =>  {
  localStorage.setItem("white", white);
  localStorage.setItem("black", black);
};
