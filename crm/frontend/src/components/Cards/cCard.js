import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getClient} from '../Actions/client';
import "./styles/cCard.css";

class ClientCard extends Component {

  clickHandler = () =>{
    this.props.getClient(this.props.client_id)
    this.props.stateChange("client")
    //console.log(`clicked ${this.props.name}, ${this.props.client_id}`)
  }

  render() {
      return (

      <div className="client-card" style={{cursor:`${this.props.click?"pointer":""}`}} onClick={this.props.click?this.clickHandler:()=>null}>
        <div id="client-alert-container">
        <div id={`client-alert-${this.props.color}`}></div>
        </div>
        <div id="client-body">
          <p> {this.props.name} </p>
          <p> Est Value: <span>{this.props.est}</span></p>
          <p> Department: <span>{this.props.sector}</span></p>
        </div>
      </div>
    )
  }
}

export default connect(null, {getClient})(ClientCard);
