import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { getProfile } from "../Actions/profile";
import {getClients} from "../Actions/client";
import {updateAssignment} from "../Actions/assignment";
import {getTime} from "../Actions/time";
import {updateClient} from "../Actions/client";
import Sidepanel from "../Sidepanel";
import Profile from "../Profile";
import Option from "../Cards/Option";
import ClientForm from "../Cards/Client";
import ClientCard from "../Cards/cCard";
import {DragDropContext} from 'react-beautiful-dnd';
import Panel from "../Panels";
// Client meta functions
import ClientAddFile from "../Client/clientfiles";
import ClientAddNote from "../Client/clientnotes";
import UpdateClient from "../Client/clientupdate";
import ClientOrder from "../Client/clientorders";
//Employee Meta function
import EmployeeAddFile from "../Employee/emplFile";
import EmployeeAddNote from "../Employee/emplNotes";
import UpdateEmployee from "../Employee/emplUpdate";
import Assignment from "../Employee/assignment";

import InfoPanel from "./infopanel";
import NavBar from "./navbar"
// Client
import Client from "../Client";
import Employee from "../Employee";
import Performance from "../Performance";
import Files from "../Files";

import "./styles/dash.css";


class Dashboard extends Component {
  state= {
    initialcheck:false,
    active:"main",
    body:"main"
  }

  componentDidMount(){
    if (this.props.auth){
    if(!this.state.initialcheck){
      this.check_Profile()
      this.setState({...this.state, initialcheck:true})
    }
    if (this.props.time.time.length===0){
      this.props.getTime()
    }
  }
  }


  changeState = menu =>{
    this.setState({...this.state, active:menu})
  }


  changeStateCard = () =>{
    this.setState({...this.state, active:"client", body:"notes"})
  }

  changeStatecSide = () =>{
    this.setState({...this.state, active:"client", body:"main"})
  }

  check_Profile  = () =>{

    this.props.getProfile()
    this.props.getClients()
  }


  changeBody = tag => {
    this.setState({...this.state, body:tag})
  }

  renderData = () =>{
    if (this.state.active ==="main"){
      switch (this.state.body) {
        case "client-create":
          return(
            <ClientForm close={()=>this.changeBody("main")}/>
          )

          default:
          if (this.state.body !== "main"){
            this.setState({...this.state, body:"main"})
          }
          return(
            <>
            <div className="Dashboard-content">
              <Client active="dashboard"/>
            </div>
            <div className="Dashboard-footer">

            </div>
            </>
        )
      }
    }
    if (this.state.active==="client"){
      if (this.props.client.client){
      const {id,pic,name,sector,company, contact, position}= this.props.client.client

      switch (this.state.body) {
        case "orders":
        return(
          <>
          <InfoPanel pic={pic} name={name} sector={sector} company={company} contact={contact}/>
          <NavBar id={2} page={"client"} changepage={this.changeBody}/>
          <Client active="orders"/>
          </>
        )
        case "files":
        return(
          <>
          <InfoPanel pic={pic} name={name} sector={sector} company={company} contact={contact}/>
          <NavBar id={1} page={"client"} changepage={this.changeBody}/>
          <Client active="files"/>
          </>
        )

        case "assignments":
        return(
          <>
          <InfoPanel pic={pic} name={name} sector={sector} company={company} contact={contact}/>
          <NavBar id={3} page={"client"} changepage={this.changeBody}/>
          <Client active="assignments"/>
          </>
        )


        case "update-form":
        return(
          <>
          <InfoPanel pic={pic} name={name} sector={sector} company={company} contact={contact}/>
          <UpdateClient close={()=>this.changeBody("main")}/>
          </>
        )
        case "file-form":
        return(
          <>
          <InfoPanel pic={pic} name={name} sector={sector} company={company} contact={contact}/>
          <ClientAddFile close={()=>this.changeBody("main")}/>
          </>
        )
        case "notes-form":
        return(
          <>
          <InfoPanel pic={pic} name={name} sector={sector} company={company} contact={contact}/>
          <ClientAddNote close={()=>this.changeBody("main")}/>
          </>
        )

        case "order-form":
        return(
          <>
          <InfoPanel pic={pic} name={name} sector={sector} company={company} contact={contact}/>
          <ClientOrder close={()=>this.changeBody("main")}/>
          </>
        )
        default:
        return(
          <>
          <InfoPanel pic={pic} name={name} sector={sector} company={company} contact={contact}/>
          <NavBar id={0}  page={"client"} changepage={this.changeBody}/>
          <Client active="notes" currentstate= {this.state.body} changeBody = {this.changeBody}/>
          </>
        )
        }
      }
      else{
        return(
          <div>
          <Client active="main" changeState = {this.changeState} changeBody = {this.changeBody}/>
          </div>
        )
      }
      }

    if (this.state.active==="employee"){
      const {pic, name, address, contact, position}= Object.values(this.props.profile.profile)[0]
      switch (this.state.body) {
        case "files":
        return(
          <>
          <InfoPanel pic={pic} name={name} sector={address} company="Cynerza Inc" contact={contact}/>
          <NavBar id={1} page={"employee"} changepage={this.changeBody}/>
          <Employee active="files"/>
          </>
        )

        case "assignments":
        return(
          <>
          <InfoPanel pic={pic} name={name} sector={address} company="Cynerza Inc" contact={contact}/>
          <NavBar id={2}  page={"employee"} changepage={this.changeBody}/>
          <Employee active="assignment"/>
          </>
        )


        case "update-form":
        return(
          <>
          <InfoPanel pic={pic} name={name} sector={address} company="Cynerza Inc" contact={contact}/>
          <UpdateEmployee close={()=>this.changeBody("main")}/>
          </>
        )
        case "file-form":
        return(
          <>
          <InfoPanel pic={pic} name={name} sector={address} company="Cynerza Inc" contact={contact}/>
          <EmployeeAddFile close={()=>this.changeBody("main")}/>
          </>
        )
        case "notes-form":
        return(
          <>
          <InfoPanel pic={pic} name={name} sector={address} company="Cynerza Inc" contact={contact}/>
          <EmployeeAddNote close={()=>this.changeBody("main")}/>
          </>
        )

        case "Assignment-form":
        return(
          <>
          <InfoPanel pic={pic} name={name} sector={address} company="Cynerza Inc" contact={contact}/>
          <Assignment close={()=>this.changeBody("main")}/>
          </>
        )

        default:
        return(
          <>
          <InfoPanel pic={pic} name={name} sector={address} company="Cynerza Inc" contact={contact}/>
          <NavBar id={0} page={"employee"} changepage={this.changeBody}/>
          <Employee active="notes"/>
          </>
        )
        }

    }


    if (this.state.active==="files"){
      return(
        <Files/>
      )

    }
    if (this.state.active==="performance"){
      return(
        <Performance/>
      )

    }

  }


  dragEnd = result =>{
      const {destination, source, draggableId} = result;
      if(destination.droppableId === "win"){
        this.props.updateAssignment({completed:true}, draggableId)
      }
      if(destination.droppableId === "fail"){
        console.log("oh no")
      }
  }


  renderMeta = () =>{
    if (this.state.active === "main"){
      return(
        <>
        <Option color="green" text="create client" parentClickHandler={()=>this.changeBody("client-create")}/>
        </>
      )
    }
    if (this.state.active==="client" && this.state.body !== "main"){
      //red option
      return(
        <>
        <Option color="green" text="update client" parentClickHandler={()=>this.changeBody("update-form")}/>
        {this.state.body === "files"?
        <Option color="purple" text="Add files" parentClickHandler={()=>this.changeBody("file-form")}/>
        :""}
        {this.state.body === "notes"?
        <Option color="blue" text="Add notes" parentClickHandler={()=>this.changeBody("notes-form")}/>
        :""}
        {this.state.body === "orders"?
        <Option color="orange" text="Add order" parentClickHandler={()=>this.changeBody("order-form")}/>
        :""}
        {this.state.body === "assignments"?
        <div className="Dashboard-body-footer">
            <Panel color={"green"} id="win"/>
            <Panel color={"red"} id="fail"/>
        </div>
        :""}
        </>
      )
    }

    if (this.state.active==="employee"){
      //red option
      return(
        <>
        <Option color="green" text="Update Profile" parentClickHandler={()=>this.changeBody("update-form")}/>
        <Option color="purple" text="Add files" parentClickHandler={()=>this.changeBody("file-form")}/>
        <Option color="blue" text="Add notes" parentClickHandler={()=>this.changeBody("notes-form")}/>
        <Option color="orange" text="Add assignment" parentClickHandler={()=>this.changeBody("Assignment-form")}/>

        </>
      )
    }

  }

  renderFooter = () => {
    if(this.state.active === "main" && this.state.body ==="main"){
      return(
          <div className="Dashboard-body-footer">
              <Panel color={"green"} id="win"/>
              <Panel color={"red"} id="fail"/>
          </div>
        )
      }
    }


  render() {
    if (this.props.auth && !this.props.auth.isAuthenticated){
     return <Redirect to="/login"/>;
  }



    return (
      <>
      <div className="Dashboard-Container">

          <Sidepanel changeState={this.changeState} activeState={this.state.active} clientpage={this.changeStatecSide}/>
          <DragDropContext
            onDragEnd = {this.dragEnd}
          >
          <div className="Dash-body">
              <div className="Dashboard-body">
                { this.props.profile && this.props.profile.loading ? <div> loading </div> :
                  <>
                  {this.props.profile.profile.length < 1? <Profile/>  :
                    this.renderData()}
                    </>
                  }
                </div>
            </div>
            <div className="Dashboard-MetaPanel">
            { this.props.profile && this.props.profile.loading ? "" :
              <>
              {this.props.profile.profile.length < 1?""  :
                  this.renderMeta()
              }
              </>
            }
            </div>
          </DragDropContext>
      </div>
      </>
      )
  }

}

const mapStateToProps = state =>({
  auth: state.AuthReducer,
  profile: state.EmployeeReducer,
  client:state.ClientReducer,
  time:state.TimeReducer
})

export default connect(mapStateToProps,{getProfile, getClients, getTime, updateClient, updateAssignment})(Dashboard);
