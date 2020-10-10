import React, { Component, Fragment } from 'react';

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
    this.props.changeState(e.target.getAttribute('name'))
    this.setState({active:e.target.getAttribute('name')})
  }

  displayMenu =() =>{
    const options = ["main", "client", "calender", "employee", "files", "performance"]

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
    console.log(this.state.active)
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


export default connect(null,{logout})(Sidepanel);
