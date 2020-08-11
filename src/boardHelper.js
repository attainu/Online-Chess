import pieces from "./constants/pieces";

export const columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const rows = ["8", "7", "6", "5", "4", "3", "2", "1"];


export const getUIC = (id, piece) => {
    return id;
  };

export const flipColor = (color) => {
    if (color === "lightblue") {
      return "#fed8b1";
    } else {
      return "lightblue";
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
