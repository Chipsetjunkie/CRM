import React, { Component } from 'react';
import "./styles/nav.css";

class NavBar extends Component {

  state = {
    vals:{
      'client': ["notes", "files", "orders", "assignments"],
      'employee': ["notes", "files", "assignments"]
    }
  }

  clickHandler = i =>{
    const vals = this.state.vals[this.props.page]
    this.props.changepage(vals[i])
    this.setState({...this.state,active:i})
  }


  display = () => {
    const vals = this.state.vals[this.props.page]
    return vals.map((value,id) => id===this.props.id ?(
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
