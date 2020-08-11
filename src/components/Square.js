import React, { Component } from "react";

class Square extends Component {
  render() {
      const {id, piece, color, isActive, handleClick} = this.props
    return (
      <div
        onClick={() => {
            handleClick(id, piece)
        }}
        style={{ width: 60, height: 60, backgroundColor: isActive ? "yellow" : color }}
      >
        {this.props.piece && (
          <img
            style={{ width: 40, height: 40 }}
            src={piece}
            alt="piece"
          />
        )}
      </div>
    );
  }
}

export default Square;
