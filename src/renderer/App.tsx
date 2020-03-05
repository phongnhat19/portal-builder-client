import {hot} from "react-hot-loader/root";
import React from "react";
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import PortalBuilder from './views/PortalBuilder'
import Header from "./views/components/Header";

export default hot((): JSX.Element => 
  (
    <Router>
      <Header/>
      <Switch>
        <Route path="/">
          <PortalBuilder />
        </Route>
      </Switch>
    </Router>
  ));