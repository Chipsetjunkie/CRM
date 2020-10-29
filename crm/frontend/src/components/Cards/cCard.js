import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getClient} from '../Actions/client';
import "./styles/cCard.css";

class ClientCard extends Component {

  clickHandler = () =>{
    this.props.getClient(this.props.client_id)
    this.props.stateChange("client")
    //console.log(`clicked ${this.props.name}, ${this.props.client_id}`)
  }

  render() {
      const time = this.props.timedata.map(dateId=>
            this.props.time.time.filter(time=> time.id == dateId))
      const asgn = time.map(t=>
            this.props.assignment.assignments.filter(a=> a.id===t[0].Aid))
      return (

      <div className="client-card" style={{cursor:`${this.props.click?"pointer":""}`}} onClick={this.props.click?this.clickHandler:()=>null}>
        <div id="client-alert-container">
        <div style={{fontSize:"12px",marginRight:"12px", marginTop:"2px", color:"rgba(255,0,150)"}}>
          {asgn.length > 0 && asgn[0].length >0?
            parseInt((asgn.filter(a => a[0].completed===true).length/asgn.length)*100)+"%"=== "100%"?
            "":parseInt((asgn.filter(a => a[0].completed===true).length/asgn.length)*100)+"%"
            :""}
        </div>
        </div>
        <div id="client-body">
          <p> {this.props.name} </p>
          <p> Est Value: <span>{this.props.est}</span></p>
          <p> Department: <span>{this.props.sector}</span></p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state =>({
  assignment:state.AssignmentReducer,
  time:state.TimeReducer
})

export default connect(mapStateToProps, {getClient})(ClientCard);
