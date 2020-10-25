import React, { Component } from 'react';
import Note from "../Cards/notes";
import { Scrollbars } from 'react-custom-scrollbars';
import ClientCard from "../Cards/cCard";

import {connect} from 'react-redux';
import {getNotes} from '../Actions/notes';
import {getOrders} from '../Actions/order';
import {getFiles} from '../Actions/files';

import "./styles/main_notes.css";
import "./styles/main_order.css";
import "./styles/main_files.css";
import "./styles/main.css";


class Client extends Component {

  state = {
    query:"",
    display:"none"
  }

  componentDidMount(){

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


  changeHandler = e =>{
    this.setState({...this.state, [e.target.name]:e.target.value})
  }

  displayMain = () => {
    if(this.props.client.clients.length > 0){
      return( this.props.client.clients.map((client,id) => client.company.includes(this.state.query)?(
          <span key={id}>
          <ClientCard
          drag = {false}
          color="green"
          client_id={client.id}
          name={client.company}
          est={String(client.est_value).slice(0,5)}
          days="null"
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
    console.log("enterd notes")
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
        <div className="order-body">
        <p>Item: <span>{order.item}</span></p>
        <p>Quantity: <span>{order.quantity}</span></p>
        <p>Qoute: <span>{order.demand} $</span></p>
        </div>
        <div id="complete-false">
          <p>incomplete</p>
        </div>
      </div>
    )
  )
  )
  }

  openFile = f =>{
     window.open(f);
  }

  openFileMenu = () =>{
    this.state.display!=="flex"?
    this.setState({...this.state, display:"flex"})
    :this.setState({...this.state, display:"none"})
  }

  displayFiles = () =>{
    return(
      this.props.files.files.map((file,id)=>(

      <div key = {id+file.name} className="file-card" >
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

  render() {
    console.log(this.props.active)
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



      </>
    );
  }

}
const mapStateToProps = state =>({
  notes:state.NotesReducer,
  orders:state.OrderReducer,
  files:state.FileReducer,
  client:state.ClientReducer
})

export default connect(mapStateToProps, {getNotes, getOrders, getFiles})(Client);
