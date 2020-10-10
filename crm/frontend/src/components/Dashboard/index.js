import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { getProfile } from "../Actions/profile";
import Sidepanel from "../Sidepanel";
import "./dash.css";

class Dashboard extends Component {
  state= {
    modal:false,
    initialcheck:false,
    active:"main"
  }

  changeState = menu =>{
    this.setState({...this.state, active:menu})
  }

  componentDidMount(){
    if(!this.state.initialcheck){
      this.check_Profile()
      this.setState({...this.state, initialcheck:true})
    }
  }

  openModal = () => this.setState({...this.state, modal:true})

  closeModal = () => this.setState({...this.state, modal:false})


  check_Profile  = () =>{
    this.props.getProfile()
  }


  render() {
    if (this.props.auth && !this.props.auth.isAuthenticated){
     return <Redirect to="/login"/>;
  }

    return (
      <>
      <div className="Dashboard-Container">
      <Sidepanel changeState={this.changeState} activeState={this.state.active}/>
      <div className="Dashboard-body">
        { this.props.profile && this.props.profile.loading ? <div> loading </div> :
          <>
          {this.props.profile.profile.length < 1? <div> no profile </div> :
          <div> YOu have something going </div>}
          </>
        }
      </div>
      </div>
      </>
      )
  }

}

const mapStateToProps = state =>({
  auth: state.AuthReducer,
  profile: state.EmployeeReducer
})

export default connect(mapStateToProps,{getProfile})(Dashboard);
