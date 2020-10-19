import React, { Component } from 'react';
import './styles/notes.css';

class Note extends Component {

  render() {
    return (
      <div className="notes-container">
        <div className="notes-body-container">
          <div id="notes-notification">
              <div id={this.props.type}></div>
          </div>

          <div id="notes-body">
              {this.props.description}
          </div>
        </div>
      </div>
    );
  }

}

export default Note;
