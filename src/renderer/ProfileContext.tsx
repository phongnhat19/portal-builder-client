import React from 'react'

type Theme = Array<{
    profileId: string,
    name: string,
    domain: string,
    username: string,
    password: string
}>

const ProfileContext = React.createContext<Theme>([{
    profileId: 'profile_1',
    name: 'Minh 1',
    domain: 'minh-sc-1.cybozu-dev.com',
    username: 'minh1',
    password: 'ahihi'
  }, () => {}]);
export {ProfileContext}