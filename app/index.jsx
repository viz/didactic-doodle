import React from 'react'

// We'll use destructuring assignment to grab only what we need
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
import { render } from 'react-dom'
import { browserHistory, IndexRoute, Route, Router } from 'react-router'

// Import our components
import App from './components/app.jsx'
import Home from './components/home.jsx'
import About from './components/about.jsx'

// We can import CSS directly using the webpack style-loader
import './main.css'

const div = document.createElement('div')

document.body.appendChild(div)

render(<Router history={browserHistory}>
  <Route path='/' component={App}>
    <IndexRoute component={Home}/>
    <Route path='about' component={About}/>
  </Route>
</Router>, div)
