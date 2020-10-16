import React, { Component } from 'react';
import "./info.css";

class InfoPanel extends Component {

  render() {
    return (
          <div className="Client-Page">
          <div className="Client-Name-Segment">
          <div className="grid-container-client">
              <div id="Client-profile">
              <img id="profile-pic"src={this.props.pic} alt="" width="50" height="50">
              </img>
              </div>
              <div id="Client-Name">
                  > {this.props.name}
              </div>
              <div id="Client-Company">
                  {this.props.company}

              </div>
              <div id="Client-Position">
                  # CEO

              </div>
              <div id="Client-Contact">
                  <span>{String(this.props.contact).slice(0,3)}</span> <span>{String(this.props.contact).slice(3,5)}</span> <span>{String(this.props.contact).slice(5)}</span>
              </div>
              <div id="Client-Address">
                {this.props.sector}

              </div>
            </div>
          </div>
        </div>
    );
  }

}

export default InfoPanel;
