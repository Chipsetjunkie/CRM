import React, { Component } from 'react';
import { register } from '../Actions/auth';
import { connect } from 'react-redux';
import './register.css';

class Register extends Component {
  state ={
    name:"",
    email:"",
    password:"",
    password2:"",
    error:""
  }

  clickhandler = () =>{
    document.getElementById("registerform").reset();
    this.setState({...this.state, email:"", password:"", password2:"", name:"" })
    this.props.toggle()
  }

  changehandler = e =>{
    if (this.state.error !== ""){
        this.setState({...this.state,[e.target.name]:e.target.value, error:""})
    }
    else{
    this.setState({...this.state,[e.target.name]:e.target.value})
  }
  }

  submitForm = e =>{
      e.preventDefault();
      if (!this.state.name || !this.state.email || !this.state.password || !this.state.password2){
        this.setState({...this.state, error:"Fill in all the fields!"})}
      if (this.state.password != this.state.password2){
        this.setState({...this.state, error:"Password is not matching!"})
      }
      else{
          this.props.register(this.state.email, this.state.password, this.state.name)
          document.getElementById("registerform").reset();
          console.log("valid form!!")
      }
  }

  render() {
    return (
      <>
      <div>
      <form id="registerform" onSubmit = {this.submitForm}>
        <h2 id="registerheading"> REGISTER</h2>
        <p><label htmlFor="email">Email</label></p>
        <p><input className="input" type="email" id="email" name="email" required autoComplete="off" onChange={this.changehandler}></input></p>
        <p><label htmlFor="name">Name</label></p>
        <p><input type="text" id="name" name="name" required autoComplete="off" onChange={this.changehandler}></input></p>
        <p><label htmlFor="password">Password</label></p>
        <p><input className="input" type="password" id="password" name="password" required autoComplete="off" onChange={this.changehandler}></input></p>
        <p><label htmlFor="password_re">Password Again</label></p>
        <p><input className="input" type="password" id="password_re" name="password2" required autoComplete="off" onChange={this.changehandler}></input></p>
        <p style={{display:'flex', justifyContent:'center', color:"red"}}>{this.state.error}</p>
        <input id="createbutton" type="submit" value="Create" ></input>
        <p id="registertext"> Already have an account? <span id="registerspan" onClick={this.clickhandler}>Login</span></p>
      </form>
      </div>
      </>
    );
  }

}

export default connect(null, {register})(Register);
