import React, { Component } from 'react';
import "./cn.css";

class ClientAddNote extends Component {

  submitHandler = e =>{
    e.preventDefault()
  }

  close = () => {
    this.props.close()
  }


  render() {
    return (
      <form className="notes-form" method="post" onSubmit={this.submitHandler}>
      <p><label for="notess"> Notes </label></p>
      <textarea name="name" id="notess"></textarea>
      <div className="notes-submit-container">
      <p><input type="submit" value="Add"></input></p>
      <p><input type="submit" value="Close" onClick={this.close}></input></p>
      </div>
    </form>
    );
  }

}

export default ClientAddNote;
