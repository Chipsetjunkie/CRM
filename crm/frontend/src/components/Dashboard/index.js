import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { getProfile } from "../Actions/profile";
import {getClients} from "../Actions/client";
import Sidepanel from "../Sidepanel";
import Profile from "../Profile";
import Option from "../Cards/Option";
import ClientForm from "../Cards/Client";
import ClientCard from "../Cards/cCard";
import ClientAddFile from "../Client/clientfiles";
import ClientAddNote from "../Client/clientnotes";
import UpdateClient from "../Client/clientupdate";

import "./dash.css";

//
import InfoPanel from "./infopanel";
// Client
import Client from "../Client";
import Employee from "../Employee";
import Calender from "../Calender";
import Performance from "../Performance";
import Files from "../Files";

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
  }
  }


  changeState = menu =>{
    this.setState({...this.state, active:menu})
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
          return(
            <>
            <div className="Dashboard-content">
            {this.props.client.clients.length > 0?
              this.props.client.clients.map((client,id) =>(
                  <span key={id}>
                  <ClientCard color="green" client_id={client.id} name={client.company} est={String(client.est_value).slice(0,5)} days="null"/>
                  </span>
              )
            ):""
            }
            </div>
            <div className="Dashboard-footer">

            </div>
            </>
        )
      }
    }
    if (this.state.active==="client"){
      const {pic,name,sector,company, contact, position}= this.props.client.client

      switch (this.state.body) {
        case "update":
        return(
          <>
          <InfoPanel pic={pic} name={name} sector={sector} company={company} contact={contact}/>

          </>
        )
        case "file":
        return(
          <>
          <InfoPanel pic={pic} name={name} sector={sector} company={company} contact={contact}/>

          </>
        )
        case "notes":
        return(
          <>
          <InfoPanel pic={pic} name={name} sector={sector} company={company} contact={contact}/>

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
        default:
        return(
          <>
          <InfoPanel pic={pic} name={name} sector={sector} company={company} contact={contact}/>
          <Client group={false} />
          </>
        )
      }

    }
    if (this.state.active==="employee"){
      const {pic, name, address, contact, position}= Object.values(this.props.profile.profile)[0]
      return(
        <InfoPanel pic={pic} name={name} sector={address} company="Cynerza Inc" contact={contact}/>
      )

    }
    if (this.state.active === "calender"){
      return(
        <Calender/>
      )

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


  renderMeta = () =>{
    if (this.state.active === "main"){
      return(
        <>
        <Option color="green" text="create client" parentClickHandler={()=>this.changeBody("client-create")}/>
        <Option color="purple" text="create files" parentClickHandler={()=>this.changeBody("create-files")}/>
        </>
      )
    }
    if (this.state.active==="client"){
      return(
        <>
        <Option color="green" text="update client" parentClickHandler={()=>this.changeBody("update-form")}/>
        <Option color="purple" text="Add files" parentClickHandler={()=>this.changeBody("file-form")}/>
        <Option color="blue" text="Add notes" parentClickHandler={()=>this.changeBody("notes-form")}/>
        </>
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

          <Sidepanel changeState={this.changeState} activeState={this.state.active}/>

          <div className="Dashboard-body">

            { this.props.profile && this.props.profile.loading ? <div> loading </div> :
              <>
              {this.props.profile.profile.length < 1? <Profile/>  :
                this.renderData()}
                </>
              }


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
          </div>
      </>
      )
  }

}

const mapStateToProps = state =>({
  auth: state.AuthReducer,
  profile: state.EmployeeReducer,
  client:state.ClientReducer
})

export default connect(mapStateToProps,{getProfile, getClients})(Dashboard);
