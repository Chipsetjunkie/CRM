import React, { Component,Fragment } from 'react';
import {connect} from "react-redux";

import {getAllProfiles} from "../Actions/profile";
import {createAssignment} from "../Actions/assignment";
import {inputvalidated} from '../Utils/formvalidation.js';

import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker';


import 'react-calendar/dist/Calendar.css';
import "./styles/assignment.css";


class Assignment extends Component {

  state = {
    title:"",
    priority:"green",
    description:"",
    date: new Date(),
    member:[],
    client:null,
    time: String(new Date().getMinutes()).length === 1? new Date().getHours()+":0"+new Date().getMinutes():new Date().getHours()+":"+new Date().getMinutes(),
    clientstyle: "None",
    memstyle: "None",
    pic_c:"null",
    member_pics:{},
    error:null,
    member_query:"",
    client_query:""
  }

  componentDidMount(){
    if(!this.props.profiles.profiles){
      this.props.getAllProfiles()
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


  onChangeI = e => {
    this.setState({...this.state, [e.target.name]: e.target.value})
  }

  onChangeT = time => {
    const d = this.dateconverter(this.state.date,time)
    const n = new Date()

    if(d>n){

      this.setState({...this.state, time, error:null })
    }
    else{
      this.setState({...this.state, error:"invalid time" })
    }

  }

  checkdate = date => {
    const d= new Date()
    if (date.getFullYear() < d.getFullYear()){
        return false
    }
    if (date.getFullYear() === d.getFullYear() && date.getMonth() < d.getMonth()){
      return false
    }

    if (date.getFullYear() === d.getFullYear() && date.getDate() < d.getDate()){
      return false
    }

    return true
  }

  onChange = date => {
    if (this.checkdate(date)){
          this.setState({...this.state, date:date, error:null })
      }
    else{
      this.setState({...this.state, error:"invalid date" })
    }
  }


  onClickClient = () =>{
    this.setState({...this.state, clientstyle:"flex"})

  }

  onClickMem = () =>{
    this.setState({...this.state, memstyle:"flex"})
  }

  closeMem = () => {
    this.setState({...this.state, memstyle:"None"})
  }

  closeClient = () =>{
    this.setState({...this.state, clientstyle:"None"})
  }


  selectClient = (id,pic) =>{
    this.setState({...this.state, client:id, pic_c:pic})
  }

  updateMember = (id,pic) =>{
    var member = this.state.member
    member.unshift(id)
    var member_pics = this.state.member_pics
    member_pics[id] = pic
    this.setState({...this.state, member, member_pics})
  }

  clickHandler = v =>{
    this.setState({...this.state,priority:v})
  }

  showMembers = () => {
    return(this.state.member.map((member,id) =>(
        <img  key={id+member+this.state.member_pics[member]} src={this.state.member_pics[member]} width="30px" height="30px"></img>
    )))
  }

  displayClients = () =>{
    return(this.props.clients.clients.map((client,id)=> client.name.includes(this.state.client_query)?(
      <Fragment key={client.id+client.name} >
        <div style={{display:"flex",alignItems:"center"}}>
        <img src={client.pic} width="20px" height="20px"></img>
        <p value={client.id} onClick={()=>this.selectClient(client.id,client.pic)} style={{textTransform:"capitalize"}}>{client.name}</p>
        </div>
      </Fragment>
    ):""
  )
  )
  }

  displayMembers = () =>{
    if (this.props.profiles.profiles){
    return(this.props.profiles.profiles.map((profile,id) => profile.name.includes(this.state.member_query)(
      <Fragment key={profile.id+profile.name} >
        {!this.state.member.includes(profile.id) && profile.name.includes(this.state.member_query) ?
        <div style={{display:"flex",alignItems:"center"}}>
        <img src={profile.pic} width="20px" height="20px"></img>
        <p value={profile.id} onClick={()=>this.updateMember(profile.id,profile.pic)} style={{textTransform:"capitalize"}}>{profile.name}</p>
        </div>
      :""}
      </Fragment>

    ))
  )}
  else{
    return ""
  }
  }

  displayPriorities = () =>{
    const values = ["green", "red", "yellow", "blue", "purple"]
    return(values.map((value,index)=>value !== this.state.priority ?(
      <span key={index+values}>
        <div value={value} onClick={()=>this.clickHandler(value)}>
        </div>
      </span>
    ):(
      <span id={`${value}-checked`} key={index+values}>
        <div value={value} onClick={()=>this.clickHandler(value)}>
        </div>
      </span>
    ))
  )
  }

  changeHandler = e =>{

    this.setState({...this.state, [e.target.name]:e.target.value, error:null})
  }


  dateconverter = (date,time) =>{
    const string =`${date.getFullYear()} ${date.getMonth()+1} ${date.getDate()} ${time}`
    return new Date(string)
  }

  close = e => {
    e.preventDefault()
    this.props.close()
  }


submitHandler = e =>{
  e.preventDefault();
  const date = this.dateconverter(this.state.date, this.state.time)
  if (!this.state.client){
    this.setState({...this.state, error:"Client not selected"})
    return;
  }
  var data = {
      title:this.state.title,
      tags:`${this.state.member}|${this.state.client}`,
      type:this.state.priority,
      description:this.state.description,
      due_tag:date
  }
  if (inputvalidated(data,["member","tags"])){
      this.props.createAssignment(data)
      this.props.close()
      }
  else{
    this.setState({...this.state, error:"Fill the forms properly" })
  }
}


  render() {
    
    return (
      <div className="AssignContainer">
      <div className="calender">
      <Calendar
        onChange={this.onChange}
        value={this.state.date}
      />
      <TimePicker
          onChange={this.onChangeT}
          value={this.state.time}
        />
        </div>
        <div className="Assignform">
          <h2> Create Assignment </h2>
          <form className="Assign-Form" method="post" onSubmit={this.submitHandler}>
            <div className="grid-container-As">
              <div className="Assignform-Title">
                <p><label htmlFor="name"> Title </label></p>
                <p><input type="text" name="title" value={this.state.title} onChange={this.changeHandler}></input></p>
              </div>
              <div className="member-select-dropbox">
                <p> Members </p>
                <div>
                  <p>{this.state.time}</p>
                  <p> {`${this.state.date.getDate()} , ${this.months[this.state.date.getMonth()]} ${this.state.date.getFullYear()}`} </p>
                </div>
                <span>
                  <div>
                  {this.showMembers()}
                  </div>
                  <div className="detail-section" >
                  <div id="plus" onClick={this.onClickMem}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div id="select-members" style={{display:`${this.state.memstyle}`}}>
                        <div onClick={this.closeMem} id="close-modal">
                          X
                        </div>
                        <div>
                          <input name="member_query" onChange={this.onChangeI} value={this.state.member_query}></input>
                        </div>
                        <div style={{maxHeight:"6em", overflowY:"scroll"}}>
                        {this.displayMembers()}
                      </div>
                  </div>
                </div>
                </span>
              </div>
              <div className="client-select-dropbox">
                <p> > Select Client </p>
                <span>
                  <div>
                  {this.state.client &&
                  <img src={this.state.pic_c} width="30px" height="30px"></img>
                  }
                  </div>
                  <div className="detail-section">
                  <div id="plus" onClick={this.onClickClient}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div id="select-clients" style={{display:`${this.state.clientstyle}`}}>
                      <div onClick={this.closeClient} id="close-modal">
                        X
                      </div>
                      <div>
                        <input name="client_query" onChange={this.onChangeI} value={this.state.client_query}></input>
                      </div>
                      <div  style={{height:"6em", overflowY:"scroll"}}>
                      {this.displayClients()}
                    </div>
                  </div>
                </div>
                </span>
              </div>

              <div className="priority-type">
                <p> Priority </p>
                <div id="priorities">
                {this.displayPriorities()}
                </div>
              </div>
              <div className="Objective">
                <p><label>description</label></p>
                <p><textarea name="description" value={this.state.value} onChange={this.changeHandler} row={10}></textarea></p>
              </div>
            </div>
            <div>
            <input type="submit" value="Create"></input>
            <input type="submit" value="Cancel" onClick={this.close}></input>
            </div>
          </form>
          <p id="assign-error">{this.state.error ? `*${this.state.error}`:""}</p>
      </div>
    </div>
    );
  }

}

const mapStateToProps = state =>({
  clients:state.ClientReducer,
  profiles:state.EmployeeReducer,
  assignment:state.AssignmentReducer
})

export default connect(mapStateToProps, {getAllProfiles, createAssignment})(Assignment);
