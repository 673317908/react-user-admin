import React from 'react';
import { HashRouter, Switch, Route } from "react-router-dom"
import './App.scss';

import Login from "./views/account/login"
import Index from "./views/home/index"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state={}
  }
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact component={Index} path="/"></Route>
          <Route component={Login} path="/login"></Route>
        </Switch>
      </HashRouter>
    )
  }
}

export default App
