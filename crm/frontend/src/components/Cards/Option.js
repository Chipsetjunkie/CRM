import React, { Component } from 'react';
import "./option.css";

class Option extends Component {

  clickHandler = () =>{
    console.log("clicked me")
    this.props.parentClickHandler()
  }


  render() {
    return (
      <div className={`options ${this.props.color}`} onClick ={this.clickHandler}>
        <span id="options-span" className={`create-button-${this.props.color}`}> </span>
        <span id="options-span">{this.props.text}</span>
      </div>
    );
  }

}

export default Option;
