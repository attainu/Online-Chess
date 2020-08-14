import React, { Component } from "react";
import Square from "./Square";
import { Row } from "react-bootstrap";
import piecePositions from "../constants/piecePositions";
import { user1, user2, token1, token2 } from "../config";
import { columns, rows, getPiece, flipColor, getUIC } from "../boardHelper";
import {
  createChallenge,
  getGameState,
  getGameBoardState,
  saveCurrentPlayer
} from "../redux/actions/chessActions";
import { connect } from "react-redux";

import { testMove } from "../lichessApiHelper";

class Board extends Component {
  state = {
    piecePositions: [...piecePositions],
    start: null,
    end: null,
    numClicks: 0,
    activePiece: null,
  };

  componentDidMount() {
    //create a challenge

    this.setState((prevState) => ({
      ...prevState,
      gameId: this.props.gameId,
    }));
  }

  handleClick = (id, piece) => {
    if (this.state.numClicks === 0) {
      this.setState((prevState) => ({
        ...prevState,
        numClicks: prevState.numClicks + 1,
        start: id,
        activePiece: this.state.piecePositions[rows.indexOf(id.charAt(1))][
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
      testMove(this.state.gameId, start, end, this.props.currentPlayer)
        .then((res) => {
          console.log("currentPlayer", this.props.currentPlayer);
          console.log("moving", startRow, startCol);

          const updated = this.state.piecePositions.map((row, i) => {
            //console.log(rows[i], startRow)
            if (rows[i] === startRow) {
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
              const updatedRow = row.map((col, j) => {
                if (columns[j] === endCol) {
                  console.log("placing", endRow, endCol);
                  //put the piece
                  return { ...col, piece: this.state.activePiece };
                }
                return col;
              });
              return updatedRow;
            } else return row;
          });
          console.log("updated", updated);
          this.props.saveCurrentPlayer(this.props.currentPlayer === 1 ? 2 : 1);
          this.setState((prevState) => ({
            ...prevState,
            start: null,
            end: null,
            numClicks: 0,
            piecePositions: updated,
          }));

          this.props.getGameState(this.state.gameId);
          if (this.props.status) {
            alert(`Checkmate: winner ${this.props.winner}`);
          }
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
          {this.state.piecePositions.map((row, rowIndex) => {
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
                        this.state.piecePositions
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
            this.props.getGameBoardState(this.props.gameId);
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
  };
};
export default connect(mapStateToProps, {
  createChallenge,
  getGameState,
  getGameBoardState,
  saveCurrentPlayer,
})(Board);
