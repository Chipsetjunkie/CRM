import React, { Component } from 'react';
import "./cCard.css";

class ClientCard extends Component {

  render() {
    return (
      <div className="client-card">
        <div id="client-alert-container">
        <div id={`client-alert-${this.props.color}`}></div>
        </div>
        <div id="client-body">
          <p> {this.props.name} </p>
          <p> Est Value: <span>{this.props.est}</span></p>
          <p> Due Date: <span>{this.props.days}</span></p>
        </div>
      </div>
    );
  }

}

export default ClientCard;
