import React from "react";
import { Row, Table, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { getPieceImage } from "../helpers/boardHelper";
import Piece from "./Piece";

function MovesList(props) {
  return (
    <Row>
      <Col>
        <h5>Opponent</h5>
        <Row>
          {props.user &&
            props.white &&
            (props.user.toLowerCase() !== props.white.toLowerCase()
              ? props.piecesCapturedByWhite.map((piece, id) => (
                  <div className="col-auto">
                    <Piece piece={getPieceImage(piece)} />
                  </div>
                ))
              : props.piecesCapturedByBlack.map((piece, id) => (
                  <div className="col-auto">
                    <Piece piece={getPieceImage(piece)} />
                  </div>
                )))}
        </Row>
        <div
          className="my-1"
          style={{
            overflowY: "scroll",
            height: 350,
            width: 400,
            border: "1px solid white",
          }}
        >
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Player</th>
                <th>Move</th>
              </tr>
            </thead>
            <tbody>
              {props.moves &&
                props.moves.split(" ").map((move, id) => (
                  <tr key={id}>
                    <td>{id + 1}</td>
                    <td>{id % 2 === 1 ? "Black" : "White"}</td>
                    <td>{move}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
        <h5>You</h5>
        <Row>
          {props.user &&
            props.white &&
            (props.user.toLowerCase() === props.white.toLowerCase()
              ? props.piecesCapturedByWhite.map((piece, id) => (
                  <div className="col-auto">
                    <Piece piece={getPieceImage(piece)} />
                  </div>
                ))
              : props.piecesCapturedByBlack.map((piece, id) => (
                  <div className="col-auto">
                    <Piece piece={getPieceImage(piece)} />
                  </div>
                )))}
        </Row>
      </Col>
    </Row>
  );
}

const mapStateToProps = (storeState) => {
  return {
    moves: storeState.chessState.gameBoardState,
    piecesCapturedByBlack: storeState.chessState.piecesCapturedByBlack,
    piecesCapturedByWhite: storeState.chessState.piecesCapturedByWhite,
    user: storeState.chessState.user,
    white: storeState.chessState.white,
  };
};

export default connect(mapStateToProps)(MovesList);
