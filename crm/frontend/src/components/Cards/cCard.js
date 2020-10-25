import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getClient} from '../Actions/client';
import {Draggable} from 'react-beautiful-dnd';
import "./styles/cCard.css";

class ClientCard extends Component {

  clickHandler = () =>{
    this.props.getClient(this.props.client_id)
    this.props.stateChange("client")
    //console.log(`clicked ${this.props.name}, ${this.props.client_id}`)
  }

  render() {
    if (this.props.drag){
      return (
      <Draggable draggableId = {String(this.props.client_id)} index={this.props.index}>
      {provided => (
      <div className="client-card"
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref= {provided.innerRef}>
        <div id="client-alert-container">
        <div id={`client-alert-${this.props.color}`}></div>
        </div>
        <div id="client-body">
          <p> {this.props.name} </p>
          <p> Est Value: <span>{this.props.est}</span></p>
          <p> Due Date: <span>{this.props.days}</span></p>
        </div>
      </div>
    )}
    </Draggable>
  )
  }
  else{
  return(
    <div className="client-card" onClick={this.clickHandler}>
      <div id="client-alert-container">
      <div id={`client-alert-${this.props.color}`}></div>
      </div>
      <div id="client-body">
        <p> {this.props.name} </p>
        <p> Est Value: <span>{this.props.est}</span></p>
        <p> Due Date: <span>{this.props.days}</span></p>
      </div>
    </div>
  )
  }
}
}

export default connect(null, {getClient})(ClientCard);
