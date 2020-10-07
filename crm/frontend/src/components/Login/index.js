import React, { Component } from 'react';
import './login.css';

class Login extends Component {

  clickhandler = () =>{
    this.props.toggle()
  }

  render() {

    return (
      <>  <div>
          <form id="loginform" className="" action="index.html" method="post">
            <h2 id="loginheading"> LOGIN</h2>
            <p><label htmlFor="email">Email</label></p>
            <p><input type="email" id="email"></input></p>
            <p><label htmlFor="password">Password</label></p>
            <p><input type="password" id="password" ></input></p>
            <button id="loginbutton" type="button" name="button">Login</button>
            <p id="logintext"> Don't have an account?  <span id="loginspan" onClick={this.clickhandler}>Register</span></p>
          </form>
          </div>

      </>
    );
  }

}

export default Login;
