import {hot} from "react-hot-loader/root";
import React, {useState} from "react";
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import PortalBuilder from './views/PortalBuilder'
import Header from "./views/components/Header";
import {ProfileContext} from './ProfileContext'

export default hot((): JSX.Element => {
    const settingProfile = useState([
      {
        profileId: 'profile_2',
        name: 'Minh 2',
        domain: 'minh-sc-2.cybozu-dev.com',
        username: 'minh2',
        password: 'ahihi'
      },{
      profileId: 'profile_1',
      name: 'Minh 1',
      domain: 'minh-sc-1.cybozu-dev.com',
      username: 'minh1',
      password: 'ahihi'
    }]);
  return (
    <Router>
      <ProfileContext.Provider value = {settingProfile} >
        <Header/>
        <Switch>
          <Route path="/">
            <PortalBuilder />
          </Route>
        </Switch>
      </ProfileContext.Provider>
    </Router>
  )}
  );