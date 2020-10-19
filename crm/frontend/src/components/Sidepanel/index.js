import React, { Component, Fragment } from 'react';
import {resetClient} from '../Actions/client';
import {connect} from 'react-redux';
import {logout} from "../Actions/auth";
import "./sidebar.css";

class Sidepanel extends Component {
  state= {
    active:"main"
  }

  loggedOut = () =>{
    this.props.logout()
  }

  clickHandler = e =>{
    const name = e.target.getAttribute('name')
    if (name === "client"){
      this.props.clientpage()
      this.props.resetClient()
    }
    else{
    this.props.changeState(name)
    }
    this.setState({active:name})
  }

  displayMenu =() =>{
    const options = ["main", "client", "employee", "calender", "files", "performance"]

    return(options.map((option,index) =>(
        <Fragment key={index}>
        {this.state.active === option?
        <p id="Sidebar-item" ><span name={option}  className="text-color active" onClick={this.clickHandler}>{index+1}</span> </p>
        : <p id="Sidebar-item" ><span name={option}  className="text-color" onClick={this.clickHandler}>{index+1}</span> </p>}
        </Fragment>
    ))
  )

  }

  render() {
    return (
      <div className="Dashboard-Sidebar">
          <div id="Sidebar-main">
            <p></p>
            <p></p>
              {this.displayMenu()}
            <p></p>
            <p></p>
            <p id="Sidebar-item" className="logout" onClick={this.loggedOut}>logout</p>
          </div>
      </div>

    );
  }

}


export default connect(null,{logout, resetClient})(Sidepanel);
