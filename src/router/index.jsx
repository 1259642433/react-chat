import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from '../pages/Home'
import Error404 from '../pages/Error404'
import Chat from '../pages/Chat/index'
const routes = [
  {
    path:'/',
    component: Home,
    exact:true
  },
  {
    path:'/home',
    component: Home,
    exact:true
  },
  {
    path:'/chat',
    component: Chat
  },
  {
    path:'',
    component: Error404
  },
]
function index() {
    return (
        <Router>
          <Switch>
            {routes.map(route => (
              <Route key={route.path} path={route.path} component={route.component}  exact={route.exact} />
            ))}
          </Switch>
        </Router>
    )  
  }
  
  export default index