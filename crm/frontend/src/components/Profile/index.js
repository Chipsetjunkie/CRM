import React, { Component } from 'react';
import {connect} from  'react-redux';
import { createProfile } from '../Actions/profile';

import "./profile.css";

class Profile extends Component {
  state = {
    pic:"",
    name: "",
    address:"",
    position:"",
    qualification:"",
    contact:""
  }



  changeHandler = e => {

    if (e.target.name!== "pic"){
    this.setState({[e.target.name]:e.target.value})
    }
    else{
      this.setState({[e.target.name]:e.target.files})
    }
  }

  submitHandler = e =>{
    e.preventDefault()
    this.props.createProfile(this.state)
    document.querySelector(".profileForm").reset();
    this.setState({
      pic:"",
      name: "",
      address:"",
      position:"",
      qualification:"",
      contact:""
    })

  }


  render() {
    return (

      <div className="Profile-Holder">
      <form className="profileForm" id="profileFormhandle" onSubmit={this.submitHandler} method="post" >
        <p><label htmlFor="pic">Upload DP</label></p>
        <p><input id="pic" type="file" name="pic"  onChange={this.changeHandler}></input></p>
        <p><label htmlFor="name"> Name </label></p>
        <p><input id="name" type="text" name="name" value={this.state.name} onChange={this.changeHandler}></input></p>
        <div className="grid-container">
          <div className="item1">
            <p><label htmlFor="address"> Address </label></p>
            <p><textarea id="address" name="address" value={this.state.address} onChange={this.changeHandler}></textarea></p>
          </div>
          <div className="item2a">
            <p><label htmlFor="position"> Position</label></p>
            <p><input id="position" type="text" name="position" value={this.state.position} onChange={this.changeHandler}></input></p>
          </div>
          <div className="item3a">
            <p><label htmlFor="contact"> Contact </label></p>
            <p><input id="contact" type="text" name="contact" value={this.state.contact} onChange={this.changeHandler}></input></p>
          </div>
          <div className="item4a">
            <p><label htmlFor="qualification"> Qualification</label></p>
            <p><input id="qualification" type="text" name="qualification" value={this.state.qualification} onChange={this.changeHandler}></input></p>
          </div>
          <div className="item5a">
              <p><input id="profile-submit" type="submit" value="create"></input></p>
          </div>
        </div>

    </form>
    </div>

    );
  }

}

export default connect(null,{createProfile})(Profile);
