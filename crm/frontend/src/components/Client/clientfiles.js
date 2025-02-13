import React, { Component } from 'react';
import {inputvalidated, file_is_valid} from '../Utils/formvalidation.js';
import {updateClientFile} from "../Actions/client";
import { connect } from 'react-redux';
import "./styles/cf.css";

class ClientAddFile extends Component {
  state = {
    files:"",
    name:"",
    size:null,
    type:""
  }



  submitHandler = e =>{
    e.preventDefault()
    if (inputvalidated(this.state)){
      this.props.updateClientFile(this.state, this.props.client.client.id)
      this.setState({
        files:"",
        name:"",
        size:null,
        type:""
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
      file_is_valid(e.target.files[0])?
      this.setState({...this.state,[e.target.name]:e.target.files[0], size:e.target.files[0].size,
                      type:e.target.files[0].type.split("/").[1]}):
      console.log("nope")
    }
  }


  close = e => {
    e.preventDefault()
    this.props.close()
  }


  render() {

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
