import React, { Component} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Auth from '../Auth';
import Dashboard from '../Dashboard';
import store from '../Store';
import './app.css';

import Error from '../Error'

class App extends Component {

  render() {
    return (

      <Provider store = {store}>
      <Router>
      <div className="error-block">
      <Error/>
      </div>
      <Switch>
          <Route exact path = '/login' component={Auth}/>
          <Route exact path = '/' component={Dashboard}/>
      </Switch>
      </Router>
      </Provider>
    );
  }

}


export default App;
