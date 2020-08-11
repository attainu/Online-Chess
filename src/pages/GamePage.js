import React, { Component } from 'react';
import Board from '../components/Board'
import {Row} from 'react-bootstrap'

class GamePage extends Component {
    render() {
        return (
            <Row className="justify-content-center">
                <Board/>
            </Row>
        );
    }
}

export default GamePage;