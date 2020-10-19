import React, { Component } from 'react';
import {updateClient} from "../Actions/client";
import { connect } from 'react-redux';
import "./styles/cu.css";

class UpdateClient extends Component {

  state = {
    name:this.props.client.client.name,
    email: this.props.client.client.email,
    contact: this.props.client.client.contact,
    company:this.props.client.client.company,
    est_value:this.props.client.client.est_value,
    pic:this.props.client.client.pic
  }

  changeHandler = e => {

    if (e.target.name!== "pic"){
    this.setState({[e.target.name]:e.target.value})
    }
    else{
      this.setState({[e.target.name]:e.target.files[0]})
    }
  }

  submitHandler = e => {
      e.preventDefault()
      this.props.updateClient(this.state, this.props.client.client.id)
      this.setState({
        name:"",
        email: "",
        contact:"",
        company:"",
        est_value:"",
        pic:""
      })
      this.props.close()
    }


  close = () => {
    this.props.close()
  }

  render() {
    return (

      <div className="update-form-container">
      <form className="update-form" method="post" onSubmit={this.submitHandler} >
        <p><label htmlFor="pic"> Upload Pic</label></p>
        <p><input type="file" id="pic" name="pic" onChange={this.changeHandler} ></input></p>
        <p><label htmlFor="email"> Email </label></p>
        <p><input type="email" id="email" name="email" onChange={this.changeHandler} value={this.state.email}></input></p>
        <p><label htmlFor="name"> Name</label></p>
        <p><input type="text" id="name" name="name" onChange={this.changeHandler} value={this.state.name}></input></p>
        <p><label htmlFor="contact"> Contact</label></p>
        <p><input type="text" id="contact" name="contact" onChange={this.changeHandler} value={this.state.contact}></input></p>
        <p><label htmlFor="est_value"> Est Value</label></p>
        <p><input type="text" id="est_value" name="est_value" onChange={this.changeHandler} value={this.state.est_value}></input></p>
        <p><label htmlFor="contact">Company </label></p>
        <p><input type="text" id="contact" name="company" onChange={this.changeHandler} value={this.state.company}></input></p>
        <div class="update-submit-container">
        <p><input type="submit" value="Update"></input></p>
        <p><input type="submit" value="Close" onClick={this.close}></input></p>
        </div>
    </form>
    </div>

    );
  }

}

const mapStateToProps = state =>({
  client:state.ClientReducer
})

export default connect(mapStateToProps,{updateClient})(UpdateClient);
