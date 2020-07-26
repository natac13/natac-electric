import React from 'react'
import { Router, useLocation } from '@reach/router'
import Layout from '../components/Layout'

import Login from '../components/Login'
import UserProfile from '../components/UserProfile'
import Home from '../components/Home'
import PrivateRoute from '../components/PrivateRoute'

const App = () => {
  const location = useLocation()
  console.log(location)
  return (
    <Layout pathname="/app">
      <Router>
        <PrivateRoute path="/app/home" component={Home} />
        <PrivateRoute path="/app/profile" component={UserProfile} />
        <Login path="/app/login" />
      </Router>
    </Layout>
  )
}

export default App
