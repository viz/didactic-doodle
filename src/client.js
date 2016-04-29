import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

import React from 'react'
import { render } from 'react-dom'
import { browserHistory, IndexRoute, Route, Router } from 'react-router'
import { combineReducers, createStore } from 'redux'
import { routerReducer, syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'

import './theme/main.css'

import { App, Counter, Home, Topic } from './containers'

import { reducer } from './redux/modules/reducer.js'

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey='ctrl-h' changePositionKey='ctrl-q'>
    <LogMonitor theme='tomorrow' preserveScrollTop={false} />
  </DockMonitor>
)

const reducers = combineReducers({
  reducer,
  routing: routerReducer
})

const store = createStore(
  reducers,
  DevTools.instrument()
)

const div = document.createElement('div')

document.body.appendChild(div)

const history = syncHistoryWithStore(browserHistory, store)

render(<Provider store={store}>
  <div>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={Home}/>
        <Route path='counter' component={Counter}/>
        <Route path='topic/:topicId' component={Topic}/>
      </Route>
    </Router>
    <DevTools/>
  </div>
</Provider>, div)
