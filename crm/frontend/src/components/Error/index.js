import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./error.css";


class Error extends Component {

    displayErrors = () =>(
      this.props.error &&
      this.props.error.length > 0 &&
      this.props.error.map(error=>(
        <div key={error.id} className= "notifcation">
        <span className={"span "+error.errortype}>
        </span>
        <p id="notif-body"><b>
          {error.message}!!</b>
        </p>
      </div>
      ))
    )

    render() {
    return (
      <>
      {this.displayErrors()}
      </>
  )
  }
}

const mapStateToProps = state => ({
  error:state.ErrorReducer
})

export default connect(mapStateToProps)(Error);
