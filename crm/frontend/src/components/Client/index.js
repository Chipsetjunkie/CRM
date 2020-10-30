import React, { Component, Fragment } from 'react';
import Note from "../Cards/notes";
import { Scrollbars } from 'react-custom-scrollbars';
import ClientCard from "../Cards/cCard";
import {Droppable, Draggable} from 'react-beautiful-dnd';
import {getAssignments} from "../Actions/assignment";
import {connect} from 'react-redux';
import {getNotes} from '../Actions/notes';
import {getOrders, updateOrder} from '../Actions/order';
import {getFiles,deleteFile} from '../Actions/files';
import {displayTimeLine} from "../Utils/dateconverter";
import Slider from "../Cards/slider.js";

import "./styles/main_notes.css";
import "./styles/main_order.css";
import "./styles/main_files.css";
import "./styles/main.css";
import "../Employee/styles/assigncard.css";


class Client extends Component {

  state = {
    query:"",
    assignmode:"false"
  }

  componentDidMount(){
    if(this.props.assignment.assignments.length ===0 ){
      this.props.getAssignments()}

    if (this.props.client.client){
      if (this.props.currentstate==="main"){
        this.props.changeBody("notes")
      }

      if(this.props.notes.notes.length===0){
        this.props.getNotes(this.props.client.client.notes)
      }
      if(this.props.orders.orders.length===0){
        this.props.getOrders(this.props.client.client.orders)
      }
      if(this.props.files.files.length===0){
        this.props.getFiles(this.props.client.client.file)
      }
    }
  }

  changeAssign = mode =>{
    this.setState({...this.state, assignmode:mode})
  }

  changeHandler = e =>{
    this.setState({...this.state, [e.target.name]:e.target.value})
  }

  changeOrder = (e,id) =>{
    this.props.updateOrder({completed:e.target.checked},id)
  }


  displayMain = () => {
    if(this.props.client.clients.length > 0){
      return( this.props.client.clients.map((client,id) => client.company.includes(this.state.query)?(
          <span key={id}>
          <ClientCard
          timedata={client.due_date}
          click = {true}
          client_id={client.id}
          name={client.company}
          est={String(client.est_value).slice(0,5)}
          sector={client.sector}
          stateChange = {this.props.changeState}
          bodyChange = {this.props.changeBody}
          />
          </span>
      ): ""
    )
  )
    }
    else{
      return "Start by creating clients"
    }
  }

  displayNotes = () => {
    const notes = this.props.notes.notes
    return notes.map((note,id) =>(
      <div key = {id}>
        <Note type={note.type} description={note.description}/>
      </div>
    )
  )
  }

  displayOrder = () => {
    return(
    this.props.orders.orders.map((order,id) => (
      <div  key={id+order.item} className="order-container">
        <div style={{display:"flex", justifyContent:"flex-end"}}>
          <input style={{marginRight:"5px",marginTop:"5px"}} onChange={e =>this.changeOrder(e,order.id)} checked={order.completed} type="checkbox"></input>
        </div>
        <div className="order-body">
        <p>Item: <span>{order.item}</span></p>
        <p>Quantity: <span>{order.quantity}</span></p>
        <p>Qoute: <span>{order.demand} $</span></p>
        </div>
        <div id={`complete-${order.completed}`}>
          <p>{order.completed?"completed":"incomplete"}</p>
        </div>
      </div>
    )
  )
  )
  }

  openFile = f =>{
     window.open(f);
  }

  openFileMenu = id =>{
      const a = confirm("Do you want to delete this file")
      const call = this.props.files.files.length === 1 ?true:false
      a?this.props.deleteFile(id,call,this.props.client.client.id):""
  }

  displayFiles = () =>{
    return(
      this.props.files.files.map((file,id)=>(

      <div key = {id+file.name} className="file-card" >
          <div className="file-dropdown">
            <p onClick = {()=>this.openFileMenu(file.id)} style={{cursor:"pointer"}}>x</p>
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

  checkdate = d =>{
    if (d.length >1 || d.length===0 || typeof(d)==="object"){
      return
    }
    const now = new Date()
    var time = this.props.time.time.filter(t=> t.id ===d)[0]
    time = new Date(time.deadline)

    if (time < now){
      return;
    }


    if (time.getFullYear() === now.getFullYear() && (time.getTime()-now.getTime())/86400000 < 3){
      return "red"
    }

    if (time.getFullYear() === now.getFullYear() && time.getMonth() - now.getMonth() <= 1){
      return "yellow"
    }

    return "green"
  }


  modeCheck = a =>{
    return this.state.assignmode? !a.completed: a.completed
  }

  displayAssign = () =>{
    const time = this.props.client.client.due_date.map(dateId=>
            this.props.time.time.filter(time=> time.id == dateId))

    const asgn = time.map(t=>
            this.props.assignment.assignments.filter(a=> a.id===t[0].Aid))
    if(asgn.length>0){
      return(asgn.map((assignment,id) => this.modeCheck(assignment[0])?(
                <Fragment key={"clientassing"+id}>
                <Draggable draggableId ={String(assignment[0].id)} index={id}>
                {provided =>(
                <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref= {provided.innerRef}
                className="assign-card">
                <div id="assign-alert-container">
                <div id={`assign-alert-${this.checkdate(assignment[0].dueday)}`}></div>
                </div>
                <div className="assign-body">
                <div className="assign-notif">
                  <span id={`${assignment[0].type}span`}></span>
                </div>
                <div className="assign-content">
                  <div id="assign-title">
                        <h3>{assignment[0].title}</h3>
                  </div>
                  <div id="assign-date">
                      <p> {displayTimeLine(this.props.time.time.filter(time => time.id ===assignment[0].dueday)[0].deadline)}</p>
                  </div>
                  <div id="assign-desc">
                      <p>{assignment[0].description.length>150?assignment[0].description.slice(0,10):
                            assignment[0].description}</p>
                  </div>
                </div>
              </div>
              </div>
              )}
              </Draggable>
              </Fragment>
            ):""
            )
            )
      }
  }

  displayDashboard = () => {
    if(this.props.client.clients.length > 0){

      return(this.props.client.clients.map((client,id) =>(

          <span key={id}>
          <ClientCard
          timedata = {client.due_date}
          index = {id}
          color={this.checkdate(client.due_date)}
          client_id={client.id}
          name={client.company}
          est={String(client.est_value).slice(0,5)}
          sector={client.sector}
          stateChange = {this.changeState}
          bodyChange = {this.changeBody}
          />
          </span>
      )))
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
      { this.props.active === 'orders'?

          <Scrollbars style={{height: 600, marginTop: "2em", width:"95%"}} autoHide>
          <div className="client-main-order-container">
          {
             this.displayOrder()
          }
          </div>
          </Scrollbars>

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

      { this.props.active === 'assignments'?
          <>
          <div style={{display:"flex", justifyContent:"flex-end"}}>
          <Slider assign={this.changeAssign}/>
          </div>
          <Scrollbars style={{height: 600, marginTop:"1em", width:"95%"}} autoHide>
          <Droppable droppableId={"canvas"}>
          {provided =>(
          <div
          ref = {provided.innerRef}
          {...provided.droppableProps}
          className="client-main-file-container" style={{marginTop:0}}>
          {
             this.displayAssign()
          }
          </div>

          )}
          </Droppable>
          </Scrollbars>
          </>
      :""}


      { this.props.active === 'main'?
          <>
          <input type="text" id="search-query" name="query"
          placeholder="search for clients"
          onChange={this.changeHandler}
          value = {this.state.query}>
          </input>
          <Scrollbars style={{height: 600, marginTop: "2em", width:"95%"}} autoHide>
          <div className="client-main-body-container">
          {
             this.displayMain()
          }
          </div>
          </Scrollbars>
          </>
      :""}


      { this.props.active === 'dashboard'?

          <Scrollbars style={{height: 600, marginTop: "2em", width:"95%"}} autoHide>
            <div className="client-main-body-container">

          {
             this.displayDashboard()
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
  orders:state.OrderReducer,
  files:state.FileReducer,
  client:state.ClientReducer,
  assignment:state.AssignmentReducer,
  time:state.TimeReducer
})

export default connect(mapStateToProps, {getNotes, getOrders, getFiles, getAssignments, updateOrder, deleteFile})(Client);
