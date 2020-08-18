import React, { useEffect } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { createChallenge } from "../redux/actions/userActions";
import { Redirect } from "react-router-dom";

const baseUrl = "http://localhost:3000";

function CreateGame(props) {
  console.log("show", props.show);
  useEffect(() => {
    //create challenge
    props.createChallenge();
    //show popup window with link and waiting for player to accept
    //redirect to /game/:gameId
  }, []);

  return props.status === "started" ? (
    <Redirect to={`/game/${props.gameId}`} />
  ) : (
    <Modal show={props.show} backdrop="static" keyboard={false}>
      {props.gameId && (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Share challenge link</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <h6>
              <a
                href={`${baseUrl}/game/${props.gameId}/accept`}
              >{`${baseUrl}/game/${props.gameId}/accept`}</a>
            </h6>
          </Modal.Body>
        </>
      )}
      <Modal.Footer className="d-flex flex-row justify-content-center">
        <Spinner className="align-self-center" animation="grow" />
        <h5>
          {props.gameId
            ? "Waiting for player to accept the challenge..."
            : "Creating challenge link..."}
        </h5>
      </Modal.Footer>
    </Modal>
  );
}

const mapStateToProps = (storeState) => {
  return {
    status: storeState.chessState.status,
    gameId: storeState.chessState.gameId,
  };
};

export default connect(mapStateToProps, { createChallenge })(CreateGame);
