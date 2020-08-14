import React from "react";
import { Row, Table, Col } from "react-bootstrap";

function MovesList(props) {
    let moves = [1,23,4,5, 5, 5, 5, 5, 5]
  return (
    <Row>
        <Col>
      <p>Moves list:</p>
      <h5>Usersname1</h5>
      <div style={{overflowY: "scroll", height: 300, width: 400}}>
        <Table striped bordered hover>
          <tbody>
            {moves &&
              moves.map((move, id) => (
                <tr key={id}>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      <h5>Usrname 2</h5>
      </Col>
    </Row>
  );
}

export default MovesList;
