import React, { Component } from 'react';
import Note from "../Cards/notes";
import { Scrollbars } from 'react-custom-scrollbars';

import {connect} from 'react-redux';
import {getNotes} from '../Actions/notes';
import {getOrders} from '../Actions/order';
import {getFiles} from '../Actions/files';

import "./styles/main_notes.css";
import "./styles/main_order.css";
import "./styles/main_files.css";

class Client extends Component {
  state = {
    id:this.props.id

  }

  componentDidMount(){
    if(this.props.notes.notes.length===0){
      this.props.getNotes(this.props.client.client.notes)
      this.props.getOrders(this.props.client.client.orders)
      this.props.getFiles(this.props.client.client.file)
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
    this.props.orders.orders.map((order,id) =>(
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

  displayFiles = () =>{
    return(
      <div className="file-card">
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
            <p>name</p>
          </div>
          <div id="file-footer">
            <p>.xpx </p>
            <p> size </p>
          </div>
      </div>
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
        <div className="client-main-body-container">
          <Scrollbars style={{height: 600 }} autoHide>
          {
             this.displayFiles()
          }
          </Scrollbars>
        </div>
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
