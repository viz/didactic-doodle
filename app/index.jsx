import React from 'react'
import { render } from 'react-dom'
import { browserHistory, IndexRoute, Route, Router } from 'react-router'

import App from './components/app.jsx'
import Home from './components/home.jsx'
import About from './components/about.jsx'

import './main.css'

const div = document.createElement('div')

document.body.appendChild(div)

render(<Router history={browserHistory}>
  <Route path='/' component={App}>
    <IndexRoute component={Home}/>
    <Route path='about' component={About}/>
  </Route>
</Router>, div)
