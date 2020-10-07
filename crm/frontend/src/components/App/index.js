import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Auth from '../Auth';
import Dashboard from '../Dashboard';
import store from '../Store';
import './app.css';

class App extends Component {

  render() {
    return (
      <Provider store = {store}>
      <Router>
      <Switch>
          <Route exact path = '/' component={Auth}/>
          <Route exact path = '/dash' component={Dashboard}/>
      </Switch>
      </Router>
      </Provider>
    );
  }

}


export default App;
