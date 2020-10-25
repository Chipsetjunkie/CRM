import React, { Component } from 'react';
import Note from "../Cards/notes";
import { Scrollbars } from 'react-custom-scrollbars';

import {connect} from 'react-redux';
import {getNotesEmp} from '../Actions/notes';
import {getFilesEmp} from '../Actions/files';
import {getAssignments} from "../Actions/assignment";


import "../Client/styles/main_notes.css";
import "../Client/styles/main_order.css";
import "../Client/styles/main_files.css";
import "../Client/styles/main.css";
import "./styles/assigncard.css";

class Employee extends Component {

  state ={
    display:'none'
  }

  componentDidMount(){
    if(this.props.notes.notesEmp.length===0){
      this.props.getNotesEmp(this.props.profile[0].personal_notes)
    }

    if(this.props.files.files_emp.length===0){
      this.props.getFilesEmp(this.props.profile[0].file)
    }

    if(this.props.assignment.assignments.length ===0 ){
      this.props.getAssignments()
    }
  }

  months = ["January","February","March", "April", "May", "June", "July",
  "August",
  "September",
  "October",
  "November",
  "December"
  ]

  days =[
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
]



  openFile = () =>{
    console.log("clicked")
  }

  openFileMenu = () =>{
    this.state.display !== "flex"?
    this.setState({...this.state, display:"flex"}):
    this.setState({...this.state, display:"none"})
  }

  displayNotes = () => {
    console.log("enterd notes")
    const notes = this.props.notes.notesEmp
    return notes.map((note,id) =>(
      <div key = {id}>
        <Note type={note.type} description={note.description}/>
      </div>
    )
  )
  }

  displayFiles = () =>{
    return(
      this.props.files.files_emp.map((file,id)=>(

      <div key = {id+file.name} className="file-card">
          <div className="file-dropdown">
            <div style={{display:this.state.display}} id="file-menu">
              <p> Update</p>
              <p id="vl"></p>
              <p> Delete </p>
            </div>
            <p onClick = {this.openFileMenu} style={{cursor:"pointer"}}>...</p>
          </div>
          <div id="file-body">
            <p onClick={()=>this.openFile(file.files)} style={{cursor:"pointer"}}> X </p>
            <p>{file.name}</p>
          </div>
          <div id="file-footer">
            <p>.{file.type} </p>
            <p> {parseInt(file.size)<1000000?`${Math.round(parseInt(file.size)/1000)} KB`:`${Math.round(parseInt(file.size)/1000000)} MB`} </p>
          </div>
      </div>
    )
    )
    )
  }

  displayTimeLine = data =>{
    const date = new Date(data)
    const  d = new Date()
    if (date.getFullYear() > d.getFullYear()){
      return(
        <p> {`${this.months[date.getMonth()]}, ${date.getFullYear()}`}</p>
      )
    }
    if (date.getMonth() < d.getMonth()){
      return(
        <p> {`${date.getDate()}, ${this.months[date.getMonth()]}`}</p>
      )
    }

    if (date.getDate() < d.getDate()){
      return(
        <p> {`${this.days[date.getDay()]}, ${date.getDate()}`}</p>
      )
    }


  }


  displayAssignments = () => {
    const asgn = this.props.assignment.assignments
    if(asgn.length>0){
      return(asgn.map(assignment =>(
      <div className="Assign-Card">
        <div id="assign-noti">
          <span id={`${assignment.type}span`}></span>
        </div>
        <div id="assign-body">
            <div id="assign-title">
                <h3 style={{textTransform:'Capitalize'}} >{assignment.title}</h3>
            </div>
            <div id="assign-date">
              {this.displayTimeLine(assignment.dueday)}
            </div>
            <div id="assign-content">
              <p>{assignment.description.length>150?assignment.description.slice(0,10):
                    assignment.description}
              </p>
            </div>
        </div>
      </div>
    )
  ))
  }
  else{
    return ""
  }

  }

  render() {
    return (
      <>
      { this.props.active === 'notes'?
        <div className="client-main-notes-container">
          <Scrollbars style={{height: 600 }} autoHide>
          {
             this.displayNotes()
          }
          </Scrollbars>
        </div>
      :""}

      { this.props.active === 'files'?

          <Scrollbars style={{height: 600, marginTop: "2em", width:"95%"}} autoHide>
          <div className="client-main-file-container">
          {
             this.displayFiles()
          }
          </div>
          </Scrollbars>
      :""}

      { this.props.active === 'assignment'?

          <Scrollbars style={{height: 600, marginTop: "2em", width:"95%"}} autoHide>
          <div className="client-main-file-container">
          {
             this.displayAssignments()
          }
          </div>
          </Scrollbars>
      :""}
      </>
    );
  }

}

const mapStateToProps = state =>({
  notes:state.NotesReducer,
  files:state.FileReducer,
  profile:state.EmployeeReducer.profile,
  client:state.ClientReducer,
  assignment:state.AssignmentReducer
})

export default connect(mapStateToProps,{getNotesEmp, getFilesEmp, getAssignments})(Employee);
