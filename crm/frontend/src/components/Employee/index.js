import React, { Component } from 'react';
import Note from "../Cards/notes";
import { Scrollbars } from 'react-custom-scrollbars';

import {connect} from 'react-redux';
import {getNotesEmp} from '../Actions/notes';
import {getFilesEmp} from '../Actions/files';


import "../Client/styles/main_notes.css";
import "../Client/styles/main_order.css";
import "../Client/styles/main_files.css";
import "../Client/styles/main.css";


class Employee extends Component {


  componentDidMount(){
    if(this.props.notes.notesEmp.length===0){
      console.log("entered")
      this.props.getNotesEmp(this.props.profile[0].personal_notes)
    }

    if(this.props.files.files_emp.length===0){
      this.props.getFilesEmp(this.props.profile[0].file)
    }

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
            <div id="file-menu">
              <p> Update</p>
              <p id="vl"></p>
              <p> Delete </p>
            </div>
            <p>...</p>
          </div>
          <div id="file-body">
            <p> X </p>
            <p>{file.name}</p>
          </div>
          <div id="file-footer">
            <p>.xpx </p>
            <p> size </p>
          </div>
      </div>
    )
    )
    )
  }

  displayAssignments = () => {

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
      </>
    );
  }

}

const mapStateToProps = state =>({
  notes:state.NotesReducer,
  files:state.FileReducer,
  profile:state.EmployeeReducer.profile,
  client:state.ClientReducer
})

export default connect(mapStateToProps,{getNotesEmp, getFilesEmp})(Employee);
