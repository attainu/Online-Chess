import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

function WinnerModal(props) {
  const [show, setShow] = useState(props.show);
  const [close, setClose] = useState(false);

  const handleClose = () => {
    setClose(true);
    setShow(false);
  };

  return close ? (
    <Redirect to="/" />
  ) : (
    <Modal
      show={props.winner}
      onHide={props.handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-center">{props.winner} wins</Modal.Title>
      </Modal.Header>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const mapStateToProps = (storeState) => {
  return {
    winner: storeState.chessState.winner,
  };
};

export default connect(mapStateToProps)(WinnerModal);
