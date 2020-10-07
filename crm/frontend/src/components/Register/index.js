import React, { Component } from 'react';
import './register.css';

class Register extends Component {

  clickhandler = () =>{
    this.props.toggle()
  }


  render() {
    return (
      <>
      <div>
      <form id="registerform" action="index.html" method="post">
        <h2 id="registerheading"> REGISTER</h2>
        <p><label htmlFor="email">Email</label></p>
        <p><input type="email" id="email"></input></p>
        <p><label htmlFor="name">Name</label></p>
        <p><input type="text" id="name" ></input></p>
        <p><label htmlFor="password">Password</label></p>
        <p><input type="password" id="password" ></input></p>
        <p><label htmlFor="password_re">Password Again</label></p>
        <p><input type="password" id="password_re" ></input></p>
        <button type="button" name="button">Create</button>
        <p id="registertext"> Already have an account? <span id="registerspan" onClick={this.clickhandler}>Login</span></p>
      </form>
      </div>
      </>
    );
  }

}

export default Register;
