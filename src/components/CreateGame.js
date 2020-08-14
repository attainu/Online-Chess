import React, { useState, useEffect} from "react";
import {
  Button,
  Modal,
  Dropdown,
  DropdownButton,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { connect } from "react-redux";
import { createChallenge } from "../redux/actions/chessActions";
import {Redirect} from 'react-router-dom'

function CreateGame(props) {
    const [clockLimit, setClockLimit] = useState(0)
    const [gameId, setgameId] = useState(null)
    const [color, setColor] = useState(null)
  
    useEffect(() => {
        if(props.gameId) {
            setgameId(props.gameId)
        }
    }, [props])

  const startGame = () => {
    //create challenge
    props.createChallenge(clockLimit, color);
    //redirect to /game/:gameId
    
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setClockLimit(value)
   
  };

  const changeColor = (e) => {
    const value = e.target.innerHTML;
    setColor(value)
  };

    return  gameId ?  <Redirect to={`/game/${gameId}`} /> : (
      <Modal
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create a game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-sm">
                Min per side
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              onChange={handleChange}
              value={clockLimit}
              type="number"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </InputGroup>

          <DropdownButton
            id="dropdown-basic-button"
            title={color ? color : "Color"}
          >
            <Dropdown.Item href="#/action-1" onClick={changeColor}>
              Random
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2" onClick={changeColor}>
              White
            </Dropdown.Item>
            <Dropdown.Item href="#/action-3" onClick={changeColor}>
              Black
            </Dropdown.Item>
          </DropdownButton>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={startGame}>
            Start Game
          </Button>
        </Modal.Footer>
      </Modal>
    );
  
}

const mapStateToProps = (storeState) => {
  return {
    gameId: storeState.chessState.gameId,
  };
};

export default connect(mapStateToProps, { createChallenge })(CreateGame);
