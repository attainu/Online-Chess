import React, { Component } from "react";
import Square from "./Square";
import { Row } from "react-bootstrap";
import piecePositions from "../constants/piecePositions";
import { columns, rows, getPiece, flipColor, getUIC } from "../boardHelper";
import {
  createChallenge,
  getGameState,
  getGameBoardState,
  saveCurrentPlayer,
  updatePiecePositions,
} from "../redux/actions/chessActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  fetchGameFromLocalStorage,
  storeGameInLocalStorage,
} from "../boardHelper";

import { testMove } from "../lichessApiHelper";

class Board extends Component {
  state = {
    start: null,
    end: null,
    numClicks: 0,
    activePiece: null,
  };

  componentDidMount() {
    //create a challenge
    console.log("props gameId", this.props.match.params.gameId);
    //check if current game id exists in local storage
    // if yes then update board accordingly
    // else load default piece positions
    const gameExists = fetchGameFromLocalStorage(
      this.props.match.params.gameId
    );
    if (gameExists) {
      this.props.updatePiecePositions(gameExists);
    } else {
      this.props.updatePiecePositions(piecePositions);
      storeGameInLocalStorage(this.props.match.params.gameId, piecePositions);
    }
    this.setState((prevState) => ({
      ...prevState,
      gameId: this.props.match.params.gameId,
    }));
  }

  handleClick = (id, piece) => {
    if (this.state.numClicks === 0) {
      this.setState((prevState) => ({
        ...prevState,
        numClicks: prevState.numClicks + 1,
        start: id,
        activePiece: this.props.piecePositions[rows.indexOf(id.charAt(1))][
          columns.indexOf(id.charAt(0))
        ].piece,
      }));
    } else if (this.state.numClicks === 1) {
      this.setState((prevState) => ({
        ...prevState,
        numClicks: prevState.numClicks + 1,
        end: id,
      }));
      this.movePiece(this.state.start, id);
    }
  };

  movePiece = (start, end) => {
    console.log("start", start, end);
    if (start === end && start !== null) {
      this.setState((prevState) => ({
        ...prevState,
        start: null,
        end: null,
        activePiece: null,
        numClicks: 0,
      }));
    } else {
      const startCol = start.charAt(0);
      const endCol = end.charAt(0);
      const startRow = start.charAt(1);
      const endRow = end.charAt(1);
      //check if valid move -> if true then move
      console.log("running test move");
      testMove(
        this.props.match.params.gameId,
        start,
        end,
        this.props.currentPlayer
      )
        .then((res) => {
          console.log("currentPlayer", this.props.currentPlayer);
          //console.log("moving", startRow, startCol);

          const updated = this.props.piecePositions.map((row, i) => {
            console.log(rows[i], startRow, endRow);
            if (rows[i] === startRow || rows[i] === endRow) {
              if (rows[i] === startRow && rows[i] === endRow) {
                const updatedRow = row.map((col, j) => {
                  if (columns[j] === startCol) {
                    console.log("removing", startRow, startCol);
                    //remove
                    return { ...col, piece: null };
                  } else if (columns[j] === endCol) {
                    return { ...col, piece: this.state.activePiece };
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
                    return { ...col, piece: this.state.activePiece };
                  }
                  return col;
                });
                return updatedRow;
              }
            } else return row;
          });
          console.log("updated", updated);
          this.props.saveCurrentPlayer(this.props.currentPlayer === 1 ? 2 : 1);
          this.setState((prevState) => ({
            ...prevState,
            start: null,
            end: null,
            numClicks: 0,
          }));
          this.props.updatePiecePositions(updated);
          storeGameInLocalStorage(this.props.match.params.gameId, updated);

          this.props.getGameState(this.props.match.params.gameId);
          if (this.props.status) {
            alert(`Checkmate: winner ${this.props.winner}`);
          }
          //play move sound
          const moveSound = new Audio(require('../assets/sounds/Move.ogg'))
          moveSound.play()
        })
        .catch((err) => {
          console.log("error", err);
          console.log("Invalid move");
          this.setState((prevState) => ({
            ...prevState,
            numClicks: 0,
            start: null,
            end: null,
            activePiece: null,
          }));
        });
    }
  };

  render() {
    console.log("rendered", this.props.currentPlayer);
    let startColor = "lightblue";
    let color;

    return (
      <>
        <div>
          {this.props.piecePositions &&
            this.props.piecePositions.map((row, rowIndex) => {
              startColor = flipColor(startColor);
              return (
                <Row key={rowIndex}>
                  {row.map((col, colIndex) => {
                    color = colIndex === 0 ? startColor : flipColor(color);
                    return (
                      <Square
                        isActive={
                          this.state.start ===
                          columns[colIndex] + "" + rows[rowIndex]
                        }
                        handleClick={this.handleClick}
                        key={colIndex}
                        id={columns[colIndex] + "" + rows[rowIndex]}
                        color={color}
                        piece={getPiece(
                          columns[colIndex] + "" + rows[rowIndex],
                          this.props.piecePositions
                        )}
                      />
                    );
                  })}
                </Row>
              );
            })}
        </div>
        <button
          onClick={() => {
            this.props.getGameBoardState(this.props.match.params.gameId);
          }}
        >
          game state
        </button>
      </>
    );
  }
}

const mapStateToProps = (storeState) => {
  return {
    currentPlayer: storeState.chessState.currentPlayer,
    gameId: storeState.chessState.gameId,
    winner: storeState.chessState.winner,
    status: storeState.chessState.status,
    piecePositions: storeState.chessState.piecePositions,
  };
};
export default connect(mapStateToProps, {
  createChallenge,
  getGameState,
  getGameBoardState,
  saveCurrentPlayer,
  updatePiecePositions,
})(withRouter(Board));
