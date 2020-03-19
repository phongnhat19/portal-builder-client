import {hot} from "react-hot-loader/root";
import React, {useState, createContext} from "react";
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import PortalBuilder from './views/PortalBuilder'
import Header from "./views/components/Header";

type Profile = {
  profileId: string,
  name: string,
  domain: string,
  username: string,
  password: string
}

const ProfileContext = createContext({
  profiles: [] as Profile[],
  setProfiles: (profiles: Profile[]) => {}
});

const App = () => {
  let initProfiles = []
  const storageProfile = window.localStorage.getItem('profiles')
  
  if (storageProfile !== null) {
    initProfiles = JSON.parse(storageProfile);
  }
  const [profileList, setProfileList] = useState(initProfiles)
  
  return (
    <Router>
      <ProfileContext.Provider value = {{profiles: profileList, setProfiles: setProfileList}} >
        <Header/>
        <Switch>
          <Route path="/">
            <PortalBuilder />
          </Route>
        </Switch>
      </ProfileContext.Provider>
    </Router>
  )
}

export {ProfileContext, Profile}
export default hot(App);