import React, { Component } from 'react';
import "./clientpage.css";

class Client extends Component {

  render() {
    return (
      <>
          {this.props.group? <div>all</div>: <div>one guy</div>}
      </>
    );
  }

}

export default Client;
