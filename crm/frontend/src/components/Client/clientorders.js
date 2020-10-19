import React, { Component } from 'react';
import {inputvalidated} from '../Utils/formvalidation.js';
import {updateClientOrder} from "../Actions/client";
import { connect } from 'react-redux';
import "./styles/order.css";

class ClientOrder extends Component {
  state = {
    item:"",
    quantity:"",
    demand:""
  }

  submitHandler = e =>{
    e.preventDefault()
    if (inputvalidated(this.state)){
      this.props.updateClientOrder(this.state, this.props.client.client.id)
      this.setState({
        item:"",
        quantity:"",
        demand:""
      })
      this.props.close()
    }

    else{
      console.log("invalid")
    }
  }

  changeHandler = e => {
    this.setState({[e.target.name]:e.target.value})
  }


  close = e => {
    e.preventDefault()
    this.props.close()
  }


  render() {
    return (
      <form className="Order-form" method="post" onSubmit={this.submitHandler}>
      <p> Order </p>
      <hr></hr>
      <p><label htmlFor="item"> Item </label></p>
      <p><input type="text" name="item" value={this.state.item} onChange={this.changeHandler}></input></p>
      <p><label htmlFor="quantity"> Quantity </label></p>
      <p><input type="text" name="quantity" value={this.state.quantity} onChange={this.changeHandler}></input></p>
      <p><label htmlFor="qoute"> Qoute </label></p>
      <p><input type="text" name="demand" value={this.state.demand} onChange={this.changeHandler}></input></p>
      <div className="order-submit-container">
      <p><input type="submit" value="Update"></input></p>
      <p><input type="submit" value="Close" onClick={this.close}></input></p>
      </div>
    </form>
    );
  }

}


const mapStateToProps = state =>({
  client:state.ClientReducer
})

export default connect(mapStateToProps, {updateClientOrder})(ClientOrder);
