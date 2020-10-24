import React, { Component } from 'react';
import "./styles/nav.css";

class NavBar extends Component {

  state = {
    active:this.props.id,
    vals:{
      'client': ["notes", "files", "orders"],
      'employee': ["notes", "files", "assignments"]
    }
  }

  clickHandler = i =>{
    console.log(this.state.page, "check")
    const vals = this.state.vals[this.props.page]
    console.log(vals[i])
    this.props.changepage(vals[i])
    this.setState({...this.state,active:i})
  }


  display = () => {
    console.log(this.state.page, "check")
    const vals = this.state.vals[this.props.page]
    return vals.map((value,id) => id===this.state.active ?(
      <span key={id+value} id="active" onClick= {()=>this.clickHandler(id)}>{value}</span>
    ):(
      <span key={id+value} onClick= {()=>this.clickHandler(id)}>{value}</span>
    )
    )
  }

  render() {
    return (
      <div className="custom-navbar">
        {this.display()}
      </div>
    );
  }

}

export default NavBar;
