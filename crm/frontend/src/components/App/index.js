import React, { Component } from 'react';
import Login from '../Login';
import Register from '../Register';
import {Spring, animated , config} from 'react-spring/renderprops';
import './App.css';

class App extends Component {
  state = {
    flipped:false
  }

  toggle = e => {
    this.setState(prevState=>({flipped:!prevState.flipped}));
  }

  render() {
    return (
      <>
      <div className="reveals-main">
      <Spring
      native
      from={{y:0}}
      to = {{y:this.state.flipped?180:0}}
      config = {config.wobbly}
      >
      {({o, y}) =>(
        <><animated.div
          style={{
            transform: y.interpolate(y=> `rotateY(${y}deg) `),
            opacity:this.state.flipped?0:1

          }}
          >
          <div className="loginDiv">
          <Login toggle={this.toggle}/>
          </div>
          </animated.div>
          <animated.div
            style={{
              transform: y.interpolate(y=> `rotateY(${y+180}deg) `),
              opacity:this.state.flipped?1:0,
              display:this.state.flipped?'':'None',
            }}
            >
            <div className="registerDiv">
            <Register toggle={this.toggle}/>
            </div>
            </animated.div>
            </>)}
      </Spring>
      </div>
      </>
    );
  }

}

export default App;

//
