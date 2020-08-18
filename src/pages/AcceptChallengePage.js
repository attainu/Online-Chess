import React, { useEffect } from "react";
import { Spinner, Row } from "react-bootstrap";
import { connect } from "react-redux";
import {
  acceptChallenge,
} from "../redux/actions/userActions";
import { useParams, Redirect } from "react-router-dom";

function AcceptChallengePage(props) {
  const { gameId } = useParams();

  useEffect(() => {
    props.acceptChallenge(gameId);
  }, []);

  console.log(gameId);
  return props.status ? (
    <Redirect to={`/game/${gameId}`} />
  ) : (
    <Row className="justify-content-center">
      <Spinner animation="border" role="status"></Spinner>
      <h3 style={{ color: "black" }}>Arranging pieces on board...</h3>
    </Row>
  );
}

const mapStateToProps = (storeState) => {
  return {
    status: storeState.chessState.status,
  };
};

export default connect(mapStateToProps, { acceptChallenge })(
  AcceptChallengePage
);
