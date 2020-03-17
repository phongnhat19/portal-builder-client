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
  const [profileList, setProfileList] = useState([
    {
      profileId: 'profile_2',
      name: 'Minh 2',
      domain: 'vuhuykhanh-3.cybozu-dev.com',
      username: 'cybozu',
      password: 'cybozu'
    },
    {
      profileId: 'profile_1',
      name: 'Minh 1',
      domain: 'minh-sc-1.cybozu-dev.com',
      username: 'minh1',
      password: 'ahihi'
    }
  ])

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