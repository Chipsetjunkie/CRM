import React, { Component } from 'react';
import {inputvalidated} from '../Utils/formvalidation.js';
import {updateClientFile} from "../Actions/client";
import { connect } from 'react-redux';
import "./styles/cf.css";

class ClientAddFile extends Component {
  state = {
    files:"",
    name:"",
  }



  submitHandler = e =>{
    e.preventDefault()
    if (inputvalidated(this.state)){
      this.props.updateClientFile(this.state, this.props.client.client.id)
      this.setState({
        file:"",
        name:"",
      })
      this.props.close()
    }

    else{
      console.log("invalid")
    }
  }

  changeHandler = e => {

    if (e.target.name!== "files"){
    this.setState({[e.target.name]:e.target.value})
    }
    else{
      this.setState({[e.target.name]:e.target.files[0]})
    }
  }


  close = e => {
    e.preventDefault()
    this.props.close()
  }


  render() {

    console.log(this.state)
    return (
      <form className="file-form" method="post" onSubmit={this.submitHandler}>
      <p><label htmlFor="file"> Upload file </label></p>
      <p><input type="file" id="file" name="files" onChange={this.changeHandler}></input></p>
      <p><label htmlFor="name"> Filename </label></p>
      <p><input type="text" id="name" name="name" value={this.state.name} onChange={this.changeHandler}></input></p>
      <p>{this.state.error && this.state.error}</p>
      <div className="file-submit-container">
      <p><input type="submit" value="Add"></input></p>
      <p><input type="submit" value="Close" onClick={this.close}></input></p>
      </div>
    </form>

    );
  }

}


const mapStateToProps = state =>({
  client:state.ClientReducer
})

export default connect(mapStateToProps,{updateClientFile})(ClientAddFile);
