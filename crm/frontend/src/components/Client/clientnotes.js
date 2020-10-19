import React, { Component } from 'react';

import {inputvalidated} from '../Utils/formvalidation.js';
import {updateClientNotes} from "../Actions/client";
import { connect } from 'react-redux';
import "./styles/cn.css";

class ClientAddNote extends Component {
  state={
    description:"",
    type:"purple"
  }

  changeHandler = e =>{
    this.setState({...this.state, [e.target.name]:e.target.value})
  }


  display = () => {
    const values = ["green", "red", "yellow", "blue", "purple"]
    const id = ["note-green","note-red","note-yellow","note-blue","note-purple"]
    const inner = ["Good News", "Bad News", "Notify", "Social", "Personal"]
    return(values.map((value,index)=>value !== this.state.type ?(
      <div key={index}>
      <input type="radio" name="type" id={id[index]} value={value} onChange={this.changeHandler}></input>
      <label htmlFor={id[index]}> {inner[index]} </label>
      </div>
    ):(
      <div key={index}>
      <input type="radio" name="type" id={id[index]} value={value} checked onChange={this.changeHandler}></input>
      <label htmlFor={id[index]}> {inner[index]} </label>
      </div>
    ))
  )
  }

  submitHandler = e =>{
    e.preventDefault()
    if(inputvalidated(this.state)){
        this.props.updateClientNotes(this.state, this.props.client.client.id)
        this.setState({
          description:"",
          type:"purple"
        })
        this.props.close()
      }
      else{
          console.log("invalid")
        }
  }

  close = e => {
    e.preventDefault()
    this.props.close()
  }


  render() {
    return (
      <form className="notes-form" onSubmit={this.submitHandler} method="post">
      <p> Add Note </p>
      <hr></hr>
      <p> Type </p>
      <div className="notes-types">
        {this.display()}
      </div>
      <p><label htmlFor="notess"> Description </label></p>
      <textarea name="description" id="notess" onChange={this.changeHandler}></textarea>
      <div className="notes-submit-container">
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

export default connect(mapStateToProps,{updateClientNotes})(ClientAddNote);
