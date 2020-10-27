import React, { Component } from 'react';
import {Droppable} from 'react-beautiful-dnd';
import "./main.css";


class Panel extends Component {

  render() {
    const color = this.props.id === "win" ? "green" : "red"
    return (
      <Droppable droppableId={this.props.id}>
      {(provided, snap) =>(
      <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref= {provided.innerRef}
        style = {{padding:"5px", width:"10em", borderRadius:"10px",border:`${snap.isDraggingOver?"1px solid "+color:"1px solid rgba(0,0,0,0)"}` }}>
      <div className={`outer-${this.props.color}`}>
        <div className={`inner-${this.props.color}`}>
        </div>
      </div>
      </div>
      )}
      </Droppable>
    )
  }
}

export default Panel;
