import React, { Component } from 'react';
import "./main.css";
class Panel extends Component {

  render() {
    const color = this.props.id === "win" ? "green" : "red"
    return (
      <div>
      <div className={`outer-${this.props.color}`}>
        <div className={`inner-${this.props.color}`}>
        </div>
      </div>
      </div>
    );
  }
}

export default Panel;

//  <div style = {{padding:"5px", borderRadius:"10px", border:`${snap.isDraggingOver?"1px solid "+color:"1px solid rgba(0,0,0,0)"}`}}>
