import React, { useState, useEffect } from "react";
import Square from "./Square";
import { Row } from "react-bootstrap";
import piecePositions from "../constants/piecePositions";
import {
  columns,
  rows,
  getPiece,
  flipColor,
  movePieceOnBoard,
} from "../boardHelper";
import {
  createChallenge,
  getGameState,
  getGameBoardState,
  saveCurrentPlayer,
  streamBoardGameState,
  streamIncomingEvents,
  updatePiecePositions,
  exportAllStudyChapters,
  checkIfPlayerHasMoved,
  createOpenChallenge,
  acceptChallenge,
} from "../redux/actions/chessActions";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { testMove } from "../lichessApiHelper";

function Board1(props) {
  const { gameId } = useParams();
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [numClicks, setNumClicks] = useState(0);
  const [activePiece, setActivePiece] = useState(null);

  useEffect(() => {
    console.log("calling stream event", gameId);
    //props.exportAllStudyChapters()
    //props.streamIncomingEvents()
    //props.acceptChallenge(gameId)
    //create a challenge
    //check if current game id exists in local storage
    // if yes then update board accordingly
    // else load default piece positions
    props.getGameBoardState(gameId);
    props.updatePiecePositions(piecePositions);
    console.log("calling get game board state, setting black and white");
  }, []);

  useEffect(() => {
    console.log("calling stream event", props);
    props.checkIfPlayerHasMoved(gameId);
    //props.streamBoardGameState(gameId);
    if (props.gameBoardState) {
      console.log("fetched game board state", props.gameBoardState);
      const moves = props.gameBoardState.split(" ");
      let updated = piecePositions;
      moves.forEach((move) => {
        console.log("move", move);
        const startCol = move.charAt(0);
        const startRow = move.charAt(1);
        const endCol = move.charAt(2);
        const endRow = move.charAt(3);
        updated = movePieceOnBoard(
          startRow,
          startCol,
          endRow,
          endCol,
          updated,
          null
        );
      });
      props.updatePiecePositions(updated);
    }
  }, [props.gameBoardState, gameId]);

  const handleClick = (id, piece) => {
    if (numClicks === 0) {
      setNumClicks(numClicks + 1);
      setStart(id);
      setActivePiece(
        props.piecePositions[rows.indexOf(id.charAt(1))][
          columns.indexOf(id.charAt(0))
        ].piece
      );
    } else if (numClicks === 1) {
      setNumClicks(numClicks + 1);
      setEnd(id);

      if (
        props.currentPlayer === 1 &&
        props.user.toLowerCase() === props.white
      ) {
        movePiece(start, id);
      } else if (
        props.currentPlayer === 2 &&
        props.user.toLowerCase() === props.black
      ) {
        movePiece(start, id);
      } else {
        alert("wait for your turn");
        setActivePiece(null);
        setStart(null);
        setEnd(null);
        setNumClicks(0);
      }
    }
  };

  const movePiece = async (start, end) => {
    console.log("start", start, end);
    if (start === end && start !== null) {
      setStart(null);
      setEnd(null);
      setActivePiece(null);
      setNumClicks(0);
    } else {
      const startCol = start.charAt(0);
      const endCol = end.charAt(0);
      const startRow = start.charAt(1);
      const endRow = end.charAt(1);
      //check if valid move -> if true then move
      testMove(gameId, start, end, props.currentPlayer)
        .then((res) => {
          //console.log("moving", startRow, startCol);

          const updated = movePieceOnBoard(
            startRow,
            startCol,
            endRow,
            endCol,
            props.piecePositions,
            activePiece
          );

          props.saveCurrentPlayer(props.currentPlayer === 1 ? 2 : 1);
          setStart(null);
          setEnd(null);
          setNumClicks(0);

          props.updatePiecePositions(updated);
          //storeGameInLocalStorage(gameId, updated);

          props.getGameState(gameId);
          if (props.status === "mate") {
            alert(`Checkmate: winner ${props.winner}`);
          }
          //play move sound
          const moveSound = new Audio(require("../assets/sounds/Move.ogg"));
          moveSound.play();
        })
        .catch((err) => {
          console.log("error", err);
          console.log("Invalid move");
          setStart(null);
          setEnd(null);
          setActivePiece(null);
          setNumClicks(0);
        });
    }
    await props.streamBoardGameState(gameId);
  };

  let startColor = "lightblue";
  let color;

  return (
    <>
      {props.piecePositions &&
        props.piecePositions.map((row, rowIndex) => {
          startColor = flipColor(startColor);
          return (
            <Row key={rowIndex}>
              <p className="align-self-center mr-2" style={{ color: "white" }}>
                {rows[rowIndex]}
              </p>
              {row.map((col, colIndex) => {
                color = colIndex === 0 ? startColor : flipColor(color);
                return (
                  <Square
                    isActive={start === columns[colIndex] + "" + rows[rowIndex]}
                    handleClick={handleClick}
                    key={colIndex}
                    id={columns[colIndex] + "" + rows[rowIndex]}
                    color={color}
                    piece={getPiece(
                      columns[colIndex] + "" + rows[rowIndex],
                      props.piecePositions
                    )}
                  />
                );
              })}
            </Row>
          );
        })}
      <Row style={{ marginLeft: 0 }}>
        {columns.map((col) => (
          <p
            style={{
              width: 60,
              textAlign: "center",
              color: "white",
            }}
            key={col}
          >
            {col}
          </p>
        ))}
      </Row>
    </>
  );
}

const mapStateToProps = (storeState) => {
  return {
    currentPlayer: storeState.chessState.currentPlayer,
    winner: storeState.chessState.winner,
    status: storeState.chessState.status,
    piecePositions: storeState.chessState.piecePositions,
    gameBoardState: storeState.chessState.gameBoardState,
    user: storeState.chessState.user,
    black: storeState.chessState.black,
    white: storeState.chessState.white,
  };
};
export default connect(mapStateToProps, {
  createChallenge,
  getGameState,
  getGameBoardState,
  saveCurrentPlayer,
  updatePiecePositions,
  streamIncomingEvents,
  acceptChallenge,
  streamBoardGameState,
  exportAllStudyChapters,
  createOpenChallenge,
  checkIfPlayerHasMoved,
})(Board1);
