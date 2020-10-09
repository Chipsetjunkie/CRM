import React, { Component } from 'react';
import {login } from '../Actions/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './login.css';


class Login extends Component {

  state = {
    email:"",
    password:"",
    error:"",
  }

  clickhandler = () =>{
    document.getElementById("loginform").reset();
    this.setState({...this.state, email:"", password:"", error:""})
    this.props.toggle()
  }

  changeHandler = e =>{
    if (this.state.error !== ""){
        this.setState({...this.state,[e.target.name]:e.target.value, error:""})
    }
    else{
    this.setState({...this.state,[e.target.name]:e.target.value})
    }
  }

  submitForm = e =>{
    e.preventDefault();
    if (!this.state.email || !this.state.password){
      this.setState({...this.state, error:"Fill in all the fields!"})}
    else{
      this.props.login(this.state.email, this.state.password)
      this.setState({...this.state, email:"", password:""})
      document.getElementById("loginform").reset();
    }
  }

  render() {
    if(this.props.auth && this.props.auth.isAuthenticated){
        return <Redirect to="/"/>;
    }
    return (
      <>

        <div>
          <form id="loginform" onSubmit={this.submitForm}>
            <h2 id="loginheading"> LOGIN</h2>
            <p><label htmlFor="email">Email</label></p>
            <p><input className="input" type="email" name="email" id="email" autoComplete="off" required onChange={this.changeHandler} ></input></p>
            <p><label htmlFor="password">Password</label></p>
            <p><input className="input" type="password" name="password" id="password" autoComplete="off" required onChange={this.changeHandler} ></input></p>
            <p style={{display:'flex', justifyContent:'center', color:"red"}}>{this.state.error}</p>
            <input id="loginbutton" type="submit" value="Login" ></input>
            <p id="logintext"> Don't have an account?  <span id="loginspan" onClick={this.clickhandler}>Register</span></p>
          </form>
          </div>

      </>
    );
  }

}

const mapStateToProps = state =>({
  auth:state.AuthReducer
})


export default connect(mapStateToProps,{login})(Login);
