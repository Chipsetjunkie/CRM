import React, { Component } from 'react';
import {Droppable} from 'react-beautiful-dnd';
import "./main.css";
class Panel extends Component {
  state = {
    provided:this.props.provider !==undefined && this.props.provider()
  }

  render() {
    console.log(this.state.provided)
    return (

      <div
      {...this.state.provided.draggableProps}
      {...this.state.provided.dragHandleProps}
      ref= {this.state.provided.innerRef}
      >
      <div className={`outer-${this.props.color}`}>
        <div className={`inner-${this.props.color}`}>
        </div>
      </div>
      </div>
    );
  }

}

export default Panel;
