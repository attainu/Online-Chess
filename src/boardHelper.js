import pieces from "./constants/pieces";
import piecePositions from "./constants/piecePositions";

export const columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const rows = ["8", "7", "6", "5", "4", "3", "2", "1"];

export const fetchGameFromLocalStorage = (gameId) => {
  const localGameId = localStorage.getItem("gameId");
  if (localGameId === gameId) {
    const localPiecePositions = localStorage.getItem("piecePositions");
    return JSON.parse(localPiecePositions);
  }
  else {
    return null
  }
};

export const movePieceOnBoard = (startRow, startCol, endRow, endCol, piecePositions, activePiece) => {
  const updated = piecePositions.map((row, i) => {
    console.log(rows[i], startRow, endRow);
    if (rows[i] === startRow || rows[i] === endRow) {
      if (rows[i] === startRow && rows[i] === endRow) {
        const updatedRow = row.map((col, j) => {
          if (columns[j] === startCol) {
            console.log("removing", startRow, startCol);
            //remove
            return { ...col, piece: null };
          } else if (columns[j] === endCol) {
            return { ...col, piece: activePiece };
          }
          return col;
        });
        return updatedRow;
      } else if (rows[i] === startRow) {
        const updatedRow = row.map((col, j) => {
          if (columns[j] === startCol) {
            console.log("removing", startRow, startCol);
            //remove
            return { ...col, piece: null };
          }
          return col;
        });
        return updatedRow;
      } else if (rows[i] === endRow) {
        console.log("matched endRow");
        const updatedRow = row.map((col, j) => {
          if (columns[j] === endCol) {
            console.log("placing", endRow, endCol);
            //put the piece
            return { ...col, piece: activePiece };
          }
          return col;
        });
        return updatedRow;
      }
    } else return row;
  });
 return updated
}

export const checkIfCastle = () => {}

export const checkIfPawnPromotion = () => {}

export const checkIfEnPassant = () => {}

export const storeGameInLocalStorage = (gameId, piecePositions) => {
  localStorage.setItem("gameId", gameId);
  console.log("here", piecePositions)
  console.log("string", JSON.stringify(piecePositions))
  localStorage.setItem("piecePositions", JSON.stringify(piecePositions));
};

export const getUIC = (id, piece) => {
  return id;
};

export const flipColor = (color) => {
  if (color === "#CB8745") {
    return "#F8C89A";
  } else {
    return "#CB8745";
  }
};

export const getPiece = (id, piecePositions) => {
  let piece;
  piece =
    piecePositions[rows.indexOf(id.charAt(1))][columns.indexOf(id.charAt(0))]
      .piece;

  switch (piece) {
    case "R":
      return pieces.rook;
    case "N":
      return pieces.knight;
    case "K":
      return pieces.king;
    case "Q":
      return pieces.queen;
    case "P":
      return pieces.pawn;
    case "B":
      return pieces.bishop;
    case "WR":
      return pieces.whiteRook;
    case "WN":
      return pieces.whiteKnight;
    case "WK":
      return pieces.whiteKing;
    case "WQ":
      return pieces.whiteQueen;
    case "WP":
      return pieces.whitePawn;
    case "WB":
      return pieces.whiteBishop;
    default:
      return null;
  }
};
