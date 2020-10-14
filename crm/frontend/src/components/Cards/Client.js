import React, { Component } from 'react';
import { createClient } from '../Actions/client';
import {connect} from 'react-redux'
import "./client.css";

class ClientForm extends Component {
  state = {
    name:"",
    email: "",
    contact:"",
    sector:"space",
    est_value:""
  }

  changeHandler = e =>{
    this.setState({...this.state, [e.target.name]:e.target.value})
  }

  closeCard = e =>{
    e.preventDefault()
    this.props.close()
  }

  submitHandler = e => {
    e.preventDefault()
    this.props.createClient(this.state)
    this.setState({
      name:"",
      email: "",
      contact:"",
      company:"",
      sector:"space",
      est_value:""
    })
    this.props.close()
  }

  render() {
    return (
    <div className="clientHolder">
    <form className="clientForm" method="post" onSubmit={this.submitHandler} >
      <h1>Create Client</h1>
      <div className="form-body">
      <p><label htmlFor="name"> Name </label></p>
      <p><input type="text" name="name" value={this.state.name} onChange={this.changeHandler}></input></p>
      <p><label htmlFor="company"> Company </label></p>
      <p><input type="company" name="company" value={this.state.company} onChange={this.changeHandler}></input></p>
      <p><label htmlFor="email"> Email </label></p>
      <p><input type="email" name="email" value={this.state.email} onChange={this.changeHandler}></input></p>
      <p><label htmlFor="contact"> Contact </label></p>
      <p><input type="text" name="contact" value={this.state.contact} onChange={this.changeHandler}></input></p>
      <p><label htmlFor="cars"> Category </label></p>
      <select name="sector" onChange={this.changeHandler}>
          <option value="space">Space</option>
          <option value="electronics">Electronics</option>
          <option value="augmentations">Augmentation</option>
          <option value="servers">Servers</option>
          <option value="robotics">Robotic</option>
      </select>
      <p><label htmlFor="est"> Estimated Val. </label></p>
      <p><input id="est_value" type="text" name="est_value" value={this.state.est_value} onChange={this.changeHandler}></input></p>
      <div className="client_button_holder">
      <p><input id="client-submit" type="submit" value="Submit"></input></p>
      <p><input id="client-submit" type="button" value="Close" onClick={this.closeCard}></input></p>
      </div>
      </div>
  </form>
  </div>
    );
  }

}

export default connect(null,{createClient})(ClientForm);
