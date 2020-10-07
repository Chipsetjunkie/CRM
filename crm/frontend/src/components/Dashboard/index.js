import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import "./dash.css";

class Dashboard extends Component {
  state = {
    isauthenticated:false
  }


  render() {
    if (!this.state.isauthenticated){
      return <Redirect to="/"/>;
    }
    return (
      <div id="dash-body">
      <div id="dash-content">
        Dashboard
      </div>
      </div>
    );
  }

}

export default Dashboard;
