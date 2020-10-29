import React, { Component } from 'react';
import './styles/slider.css';

class Slider extends Component {

  changeHandler = e =>{
    this.props.assign(!e.target.checked)
  }

  render() {
    return (
      <div className="slider-container">
        <label style={{margin:"1em",color:"black"}}> completed </label>
        <label className="switch">
        <input type="checkbox" onChange={this.changeHandler}></input>
        <span className="slider round" ></span>
        </label>
      </div>
    );
  }

}

export default Slider;
