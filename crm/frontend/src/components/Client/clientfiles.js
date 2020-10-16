import React, { Component } from 'react';
import "./cf.css";

class ClientAddFile extends Component {

  submitHandler = e =>{
    e.preventDefault()
  }

  close = () => {
    this.props.close()
  }


  render() {
    return (
      <form className="file-form" method="post" onSubmit={this.submitHandler}>
      <p><label for="file"> Upload file </label></p>
      <p><input type="file" id="file" name="pic" value=""></input></p>
      <div className="file-submit-container">
      <p><input type="submit" value="Add"></input></p>
      <p><input type="submit" value="Close" onClick={this.close}></input></p>
      </div>
    </form>

    );
  }

}

export default ClientAddFile;
