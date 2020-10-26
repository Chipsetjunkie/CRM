import React, { Component } from 'react';
import Note from "../Cards/notes";
import { Scrollbars } from 'react-custom-scrollbars';

import {connect} from 'react-redux';
import {getNotesEmp} from '../Actions/notes';
import {getFilesEmp} from '../Actions/files';
import {getAssignments} from "../Actions/assignment";
import {displayTimeLine} from "../Utils/dateconverter";

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




  openFile = f =>{
    window.open(f);
  }

  openFileMenu = () =>{
    this.state.display !== "flex"?
    this.setState({...this.state, display:"flex"}):
    this.setState({...this.state, display:"none"})
  }

  displayNotes = () => {
    const notes = this.props.notes.notesEmp
    return notes.map((note,id) =>(
      <div key = {id+"noteemp"+note.Description}>
        <Note type={note.type} description={note.description}/>
      </div>
    )
  )
  }

  displayFiles = () =>{
    return(
      this.props.files.files_emp.map((file,id)=>(

      <div key = {id+"fileemp"+file.name} className="file-card">
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

  getClient = id =>{
    const c = this.props.client.clients.filter(client => client.id === id)
    return "#"+c[0].name.slice(0,7)+"..."
  }

  displayAssignments = () => {
    const asgn = this.props.assignment.assignments
    if(asgn.length>0){
      const time = this.props.time.time
      return(asgn.map((assignment,id) =>(
        <div key={"empaassing"+id} class="assign-card">
        <div id="assign-alert-container">
        <div id="assign-alert-red"></div>
        </div>
        <div class="assign-body">
        <div class="assign-notif">
          <span id={`${assignment.type}span`}></span>
        </div>
        <div class="assign-content">
          <div id="assign-title">
                <h3>{assignment.title} {this.getClient(assignment.client)}</h3>
          </div>
          <div id="assign-date">
              <p> {displayTimeLine(time.filter(time => time.id ===assignment.dueday)[0].deadline)}</p>
          </div>
          <div id="assign-desc">
              <p>{assignment.description.length>120?assignment.description.slice(0,120)+"...":
                    assignment.description}</p>
          </div>
        </div>
      </div>
      </div>
    )
  )
  )
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
  assignment:state.AssignmentReducer,
  time:state.TimeReducer
})

export default connect(mapStateToProps,{getNotesEmp, getFilesEmp, getAssignments})(Employee);
