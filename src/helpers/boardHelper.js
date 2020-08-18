import pieces from "../constants/pieces";
import store from "../redux/reducers/store";
import {
  addPieceCapturedByBlack,
  addPieceCapturedByWhite,
} from "../redux/actions/saveActions";

const { dispatch } = store;

export const columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const rows = ["8", "7", "6", "5", "4", "3", "2", "1"];

export const fetchGameFromLocalStorage = (gameId) => {
  const localGameId = localStorage.getItem("gameId");
  if (localGameId === gameId) {
    const localPiecePositions = localStorage.getItem("piecePositions");
    return JSON.parse(localPiecePositions);
  } else {
    return null;
  }
};

export const movePiece = (
  startRow,
  startCol,
  endRow,
  endCol,
  piecePositions,
  currentPiece
) => {
  let activePiece = currentPiece;
  if (
    checkIfPawnPromotion(
      startRow,
      startCol,
      endRow,
      endCol,
      piecePositions,
      currentPiece
    )
  ) {
    if (currentPiece === "P") {
      activePiece = "Q";
    } else if (currentPiece === "WP") {
      activePiece = "WQ";
    }
  }
  return piecePositions.map((row, i) => {
    console.log(rows[i], startRow, endRow);
    if (rows[i] === startRow || rows[i] === endRow) {
      if (rows[i] === startRow && rows[i] === endRow) {
        const updatedRow = row.map((col, j) => {
          if (columns[j] === startCol) {
            console.log("removing", startRow, startCol);
            //remove
            return { ...col, piece: null };
          } else if (columns[j] === endCol) {
            console.log("placing");
            //check if any piece is captured
            //if yes then store it in redux
            const pieceCaptured =
              piecePositions[rows.indexOf(endRow)][columns.indexOf(endCol)]
                .piece;
            console.log("piece captured", pieceCaptured);
            if (pieceCaptured) {
              //store it in redux
              if (pieceCaptured.length === 2) {
                dispatch(addPieceCapturedByBlack(pieceCaptured));
                console.log("calling piece Captured BY black");
              } else {
                dispatch(addPieceCapturedByWhite(pieceCaptured));
                console.log("calling piece Captured BY white");
              }
            }
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
            //check if any piece is captured
            //if yes then store it in redux
            const pieceCaptured =
              piecePositions[rows.indexOf(endRow)][columns.indexOf(endCol)]
                .piece;
            console.log("piece captured", pieceCaptured);
            if (pieceCaptured) {
              //store it in redux
              if (pieceCaptured.length === 2) {
                dispatch(addPieceCapturedByBlack(pieceCaptured));
                console.log("calling piece Captured BY black");
              } else {
                dispatch(addPieceCapturedByWhite(pieceCaptured));
                console.log("calling piece Captured BY white");
              }
            }
            return { ...col, piece: activePiece };
          }
          return col;
        });
        return updatedRow;
      }
    } else return row;
    return null;
  });
};

export const movePieceOnBoard = (
  startRow,
  startCol,
  endRow,
  endCol,
  piecePositions,
  currentPiece
) => {
  let activePiece = currentPiece;
  if (!currentPiece) {
    //find piece at start row and start col
    activePiece =
      piecePositions[rows.indexOf(startRow)][columns.indexOf(startCol)].piece;
  }

  const castle = checkIfCastle(
    startRow,
    startCol,
    endRow,
    endCol,
    piecePositions,
    activePiece
  );
  if (castle) {
    return castle;
  } else
    return movePiece(
      startRow,
      startCol,
      endRow,
      endCol,
      piecePositions,
      activePiece
    );
};

export const checkIfCastle = (
  startRow,
  startCol,
  endRow,
  endCol,
  piecePositions,
  activePiece
) => {
  console.log("here", startRow, startCol, endRow, endCol);
  console.log("active piece", activePiece);
  if (activePiece === "WK" || activePiece === "K") {
    if (startRow === "1") {
      if (startCol === "e") {
        if (endCol === "c") {
          //long castle white king

          //king will move from e1 to c1
          console.log("moving white king");
          let updated = movePiece(
            "1",
            "e",
            "1",
            "c",
            piecePositions,
            activePiece
          );

          console.log("moving white rook");
          //rook will move from a1 to d1
          return movePiece("1", "a", "1", "d", updated, "WR");
        } else if (endCol === "g") {
          //short castle white king

          //king will move from e1 to g1
          console.log("moving white king");
          let updated = movePiece(
            "1",
            "e",
            "1",
            "g",
            piecePositions,
            activePiece
          );

          console.log("moving white rook");
          //rook will move from h1 to f1
          return movePiece("1", "h", "1", "f", updated, "WR");
        } else return false;
      } else return false;
    } else if (startRow === "8") {
      if (startCol === "e") {
        if (endCol === "c") {
          //long castle white king

          //king will move from e8 to c8
          console.log("moving black king");
          let updated = movePiece(
            "8",
            "e",
            "8",
            "c",
            piecePositions,
            activePiece
          );

          console.log("moving black rook");
          //rook will move from a8 to d8
          return movePiece("8", "a", "8", "d", updated, "R");
        } else if (endCol === "g") {
          //short castle white king

          //king will move from e8 to g8
          console.log("moving black king");
          let updated = movePiece(
            "8",
            "e",
            "8",
            "g",
            piecePositions,
            activePiece
          );

          console.log("moving black rook");
          //rook will move from h8 to f8
          return movePiece("8", "h", "8", "f", updated, "R");
        } else return false;
      } else return false;
    }
  } else {
    return false;
  }
};

export const checkIfPawnPromotion = (
  startRow,
  startCol,
  endRow,
  endCol,
  piecePositions,
  activePiece
) => {
  if (activePiece === "WP" && endRow === "8") {
    return true;
  } else if (activePiece === "P" && endRow === "1") {
    return true;
  } else return false;
};

export const checkIfEnPassant = () => {};

export const storeGameInLocalStorage = (gameId, piecePositions) => {
  localStorage.setItem("gameId", gameId);
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

export const getPieceImage = (piece) => {
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
