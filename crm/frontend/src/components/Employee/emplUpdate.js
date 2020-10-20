import React, { Component } from 'react';
import {updateProfile} from "../Actions/profile";
import { connect } from 'react-redux';
import "../Client/styles/cu.css";;

class UpdateEmployee extends Component {

  state = {
    pic: this.props.profile[0].pic,
    name:this.props.profile[0].name,
    contact: this.props.profile[0].contact,
    qualification: this.props.profile[0].qualification,
    position:this.props.profile[0].position
  }


  changeHandler = e => {

    if (e.target.name!== "pic"){
    this.setState({[e.target.name]:e.target.value})
    }
    else{
      this.setState({[e.target.name]:e.target.files[0]})
    }
  }

  submitHandler = e => {
      e.preventDefault()
      this.props.updateProfile(this.state, this.props.profile[0].id)
      this.setState({
        name:"",
        email: "",
        contact:"",
        position:"",
        pic:"",
        qualification:""
      })

      this.props.close()
    }


  close = () => {
    e.preventDefault()
    this.props.close()
  }

  render() {

    return (

      <div className="update-form-container">
      <form className="update-form" method="post" onSubmit={this.submitHandler} >
        <p><label htmlFor="pic"> Upload Pic</label></p>
        <p><input type="file" id="pic" name="pic" onChange={this.changeHandler} ></input></p>
        <p><label htmlFor="name"> Name</label></p>
        <p><input type="text" id="name" name="name" onChange={this.changeHandler} value={this.state.name}></input></p>
        <p><label htmlFor="contact"> Contact</label></p>
        <p><input type="text" id="contact" name="contact" onChange={this.changeHandler} value={this.state.contact}></input></p>
        <p><label htmlFor="est_value"> Qualification</label></p>
        <p><input type="text" id="est_value" name="qualification" onChange={this.changeHandler} value={this.state.qualification}></input></p>
        <p><label htmlFor="contact">Position </label></p>
        <p><input type="text" id="contact" name="position" onChange={this.changeHandler} value={this.state.position}></input></p>
        <div className="update-submit-container">
        <p><input type="submit" value="Update"></input></p>
        <p><input type="submit" value="Close" onClick={this.close}></input></p>
        </div>
    </form>
    </div>

    );
  }

}

const mapStateToProps = state =>({
  profile:state.EmployeeReducer.profile
})

export default connect(mapStateToProps,{updateProfile})(UpdateEmployee);
