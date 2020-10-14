import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { getProfile } from "../Actions/profile";
import {getClient} from "../Actions/client";
import Sidepanel from "../Sidepanel";
import Profile from "../Profile";
import Option from "../Cards/Option";
import ClientForm from "../Cards/Client";
import ClientCard from "../Cards/cCard";
import "./dash.css";

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
    this.props.getClient()
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
            {this.props.client.clients.length>0?
            <>
            <ClientCard color="green" name={this.props.client.clients[0].company} est={String(this.props.client.clients[0].est_value).slice(0,5)} days="null"/>
            <ClientCard color="green" name={this.props.client.clients[0].company} est={String(this.props.client.clients[0].est_value).slice(0,5)} days="null"/>
            <ClientCard color="green" name={this.props.client.clients[0].company} est={String(this.props.client.clients[0].est_value).slice(0,5)} days="null"/>
            <ClientCard color="green" name={this.props.client.clients[0].company} est={String(this.props.client.clients[0].est_value).slice(0,5)} days="null"/>
            <ClientCard color="green" name={this.props.client.clients[0].company} est={String(this.props.client.clients[0].est_value).slice(0,5)} days="null"/>
            <ClientCard color="green" name={this.props.client.clients[0].company} est={String(this.props.client.clients[0].est_value).slice(0,5)} days="null"/>
            <ClientCard color="green" name={this.props.client.clients[0].company} est={String(this.props.client.clients[0].est_value).slice(0,5)} days="null"/>
            <ClientCard color="green" name={this.props.client.clients[0].company} est={String(this.props.client.clients[0].est_value).slice(0,5)} days="null"/>
            <ClientCard color="green" name={this.props.client.clients[0].company} est={String(this.props.client.clients[0].est_value).slice(0,5)} days="null"/>
            <ClientCard color="green" name={this.props.client.clients[0].company} est={String(this.props.client.clients[0].est_value).slice(0,5)} days="null"/>
            <ClientCard color="green" name={this.props.client.clients[0].company} est={String(this.props.client.clients[0].est_value).slice(0,5)} days="null"/>
            <ClientCard color="green" name={this.props.client.clients[0].company} est={String(this.props.client.clients[0].est_value).slice(0,5)} days="null"/>
            <ClientCard color="green" name={this.props.client.clients[0].company} est={String(this.props.client.clients[0].est_value).slice(0,5)} days="null"/>
            <ClientCard color="green" name={this.props.client.clients[0].company} est={String(this.props.client.clients[0].est_value).slice(0,5)} days="null"/>
            <ClientCard color="green" name={this.props.client.clients[0].company} est={String(this.props.client.clients[0].est_value).slice(0,5)} days="null"/>
            </>
            :""}
            </>
        )
      }
    }

    if (this.state.active=="client"){}
    if (this.state.active=="employee"){}
    if (this.state.active == "calender"){}
    if (this.state.active=="files"){}
    if (this.state.active=="performance"){}

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
            <div className="Dashboard-content">
            { this.props.profile && this.props.profile.loading ? <div> loading </div> :
              <>
              {this.props.profile.profile.length < 1? <Profile/>  :
                this.renderData()}
                </>
              }
              </div>
              <div className="Dashboard-footer">

              </div>
            </div>
            <div className="Dashboard-MetaPanel">
            { this.props.profile && this.props.profile.loading ? "" :
              <>
              {this.props.profile.profile.length < 1?""  :
              <>
              <Option color="green" text="create client" parentClickHandler={()=>this.changeBody("client-create")}/>
              <Option color="purple" text="create files" parentClickHandler={()=>this.changeBody("create-files")}/>
              </>
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

export default connect(mapStateToProps,{getProfile, getClient})(Dashboard);
