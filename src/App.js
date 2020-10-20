import React from 'react';
import { HashRouter, Switch, Route } from "react-router-dom"
import './App.scss';

import Login from "./views/account/login"
import Home from "./views/home/index"

// 私有组件
import PrivateRouter from "./components/privateRouter/index"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact render={() => <Login />} path="/"></Route>
          <PrivateRouter component={Home} path="/home"></PrivateRouter>
        </Switch>
      </HashRouter>
    )
  }
}

export default App
