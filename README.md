# React Redux Intermediate

1. Create the git repo and clone it
2. Add or update the `.gitignore` file

  ```
  .DS_Store
  node_modules/
  *.log
  ```

3. Run `npm init -y` then update it, or leave off the `-y` and answer the questions at the command line
4. Install webpack locally as a devDependency with `npm i -D webpack`
5. Create the folder and file structure

  ```sh
  mkdir app
  mkdir app/components
  mkdir build
  mkdir test
  touch app/index.jsx
  touch app/main.css
  touch app/components/app.jsx
  touch build/bootstrap.css
  touch build/index.html
  touch test/mocha.opts
  touch test/setup.js
  touch test/tests.js
  touch webpack.config.js
  ```

  There are as many ways to set up your folder hierarchy as there are developers, it seems. This way is pretty arbitrary and I've used many others. Some prefer to call the `app` folder `src`. Some prefer to call the `build` folder `dist` or `public` or (confusingly) `app`. Some use the `jsx` extension, others prefer to keep it to `js`. The `main.css` file could be `styles.css` or `index.css` or `app.css` or something else I haven't thought of.

  Some developers like to use `PascalCase` or `camelCase` for the file names. As not all filesystems are case sensitive, I'm not a huge fan of that practice (though I've used it occasionally). I prefer `train-case`.

6. Add the HTML:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Setup</title>

    <link rel="icon" href="/favicon.png">

    <link rel="stylesheet" href="/bootstrap.css">
  </head>
  <body>
    <script src="/app.js"></script>
  </body>
</html>
```

- Add the `bootstrap.css` from bootswatch
- Add some CSS from myth.io:

```css
:root {
  --red: #ff0000;
  --large: 10px;
}

p {
  color: var(--red);
  padding: var(--large);
}
```

- `npm i -D webpack-merge`
- Install `babel` and presets:

```sh
npm i -D babel-core babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-1 babel-register
```

- Configure webpack:

```js
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const TARGET = process.env.npm_lifecycle_event

process.env.BABEL_ENV = TARGET

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
}

const common = {
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: 'app.js'
  }
}

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {})
}

if (TARGET === 'build') {
  module.exports = merge(common, {})
}
```

- We're going to need React:

```sh
npm i -S react react-dom
```

- Add `/app/index.jsx`:

```jsx
import React from 'react'
import { render } from 'react-dom'

import './main.css'

import App from './components/app.jsx'

const div = document.createElement('div')

document.body.appendChild(div)

render(<App/>, div)
```

- Add `/app/components/app.jsx`:

```jsx
import React from 'react'

const App = () => <p>Welcome to the App!</p>

export default App

```

- Install eslint:

```sh
npm i -D eslint eslint-config-standard eslint-config-standard-jsx eslint-config-standard-react eslint-loader eslint-plugin-promise eslint-plugin-react eslint-plugin-standard
```

- Add `.eslintignore`:

```
build/
```

- Add `.eslintrc`:

```
{
  "extends": [
    "standard",
    "standard-react"
  ],
  "parserOptions": {
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "jsx": true
    },
    "sourceType": "module"
  },
  "env": {
    "browser": true,
    "node": true,
    "mocha": true
  },
  "plugins": [
    "react"
  ]
}
```

- While we're at it, add the `.editorconfig`:

```
# EditorConfig: http://EditorConfig.org

root = true

[*]
indent_style = space
indent_size = 2

end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
```

- And add the `babel` settings to the `package.json` file:

```json
"babel": {
  "presets": [
    "es2015",
    "stage-1",
    "react"
  ],
  "env": {
    "start": {
      "presets": [
        "react-hmre"
      ]
    }
  }
}
```

- Let's also get ready for testing. Add `/test/mocha.opts`:

```
--require ./test/setup
--full-trace
--compilers js:babel-core/register
```

- Add our `/test/setup.js` file:

```js
import jsdom from 'jsdom'

const DEFAULT_HTML = '<html><body></body></html>'

global.document = jsdom.jsdom(DEFAULT_HTML)
global.window = document.defaultView
global.navigator = window.navigator
```

- And we'll need to install all the dependencies we need:

```sh
npm i -D chai chai-enzyme cheerio enzyme jsdom mocha react-addons-test-utils sinon
```

- Add the imports to the `/test/tests.js` file:

```js
/* global describe it */

import React from 'react'

import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import sinon from 'sinon'

chai.use(chaiEnzyme())

import { mount, render, shallow } from 'enzyme'

import App from '../app/components/app.jsx'

describe('<App/>', () => {
  it ('displays the welcome message', () => {
    const wrapper = render(<App/>)

    expect(wrapper.text()).to.contain('Welcome')
  })
})
```

- Add the npm scripts:

```js
"build": "webpack",
"lint": "eslint . --ext .js --ext .jsx --cache || true",
"test": "mocha --opts ./test/mocha.opts test/tests.js"
```

- Set up HMR:

```sh
npm i -D webpack-dev-server
```

- Add it to our start script:

```js
"start": "webpack-dev-server"
```

- Add it to our webpack configuration:

```js
if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      contentBase: PATHS.build,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  })
}
```

- We'll need to configure babel as well. Add the extensions to resolve:

```js
resolve: {
  extensions: [ '', '.js', '.jsx' ]
}
```

- Add the preloaders:

```js
module: {
  preLoaders: [
    {
      test: /\.jsx?$/,
      loaders: [ 'eslint' ],
      include: PATHS.app
    }
  ],
  loaders: [
    {
      test: /\.jsx?$/,
      loaders: [ 'babel?cacheDirectory' ],
      include: PATHS.app
    }
  ]
}
```

- While we're at it, let's add the CSS loaders, too:

```js
const stylelint = require('stylelint')

module: {
  preLoaders: [
    {
      test: /\.css$/,
      loaders: [ 'postcss' ],
      include: PATHS.app
    },
    {
      test: /\.jsx?$/,
      loaders: [ 'eslint' ],
      include: PATHS.app
    }
  ],
  loaders: [
    {
      test: /\.css$/,
      loaders: [ 'style', 'css', 'myth' ],
      include: PATHS.app
    },
    {
      test: /\.jsx?$/,
      loaders: [ 'babel?cacheDirectory' ],
      include: PATHS.app
    }
  ]
},
postcss: function () {
  return [stylelint({
    rules: {
      'color-hex-case': 'lower'
    }
  })]
}
```

- We'll need to add the loaders:

```sh
npm i -D css-loader myth-loader postcss-loader style-loader stylelint
```

- And we'll need to install hmre plugin, too:

```sh
npm i -D babel-preset-react-hmre
```

- Now it should run with `npm start` and you can see the app at [http://localhost:8080/](http://localhost:8080/)
- If we make changes and save them, the app reloads instantly
- Let's add `react-bootstrap` and have some fun:

```sh
npm i -S react-bootstrap
```

- We can add a header. In `/app/components/header.jsx` add:

```jsx
import React from 'react'

import {
  Nav,
  Navbar,
  NavItem
} from 'react-bootstrap'

const Header = () => <Navbar>
  <Navbar.Header>
    <Navbar.Brand>
      <a href='#'>Setup</a>
    </Navbar.Brand>
  </Navbar.Header>
  <Nav>
    <NavItem eventKey={1} href='#'>Link</NavItem>
    <NavItem eventKey={2} href='#'>Link</NavItem>
  </Nav>
</Navbar>

export default Header
```

- And we'll update our `/app/components/app.jsx` file to this:

```jsx
import React from 'react'

import { Grid } from 'react-bootstrap'

import Header from './header.jsx'

const App = () => <div>
  <Header/>
  <Grid><p>Welcome to the Zapp!</p></Grid>
</div>

export default App
```

- Take a look at our app now and we should see a nice navbar at the top
- Now, let's add some pages:

```jsx
// /app/components/home.jsx
import React from 'react'

import { Col, Row } from 'react-bootstrap'

const Home = () => <Row>
  <Col xs={12}>
    <h1>Home</h1>
  </Col>
</Row>

export default Home
```

```jsx
// /app/components/about.jsx
import React from 'react'

import { Col, Row } from 'react-bootstrap'

const About = () => <Row>
  <Col xs={12}>
    <h1>About</h1>
  </Col>
</Row>

export default About
```

- Then we'll add in `react-router` and some routes and links (we'll also need `react-router-bootstrap`):

```sh
npm i -S react-router react-router-bootstrap
```

- Now we can update our `Header`:

```jsx
import React from 'react'

import {
  Nav,
  Navbar,
  NavItem
} from 'react-bootstrap'

import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap'

const Header = () => <Navbar>
  <Navbar.Header>
    <Navbar.Brand>
      <IndexLinkContainer to={{ pathname: '/' }}>
        <a>Setup</a>
      </IndexLinkContainer>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
    <Nav>
      <IndexLinkContainer to={{ pathname: '/' }}>
        <NavItem eventKey={1} href='#'>Home</NavItem>
      </IndexLinkContainer>
      <LinkContainer to={{ pathname: '/about' }}>
        <NavItem eventKey={2} href='#'>About</NavItem>
      </LinkContainer>
    </Nav>
  </Navbar.Collapse>
</Navbar>

export default Header
```

- And add our routes to `/app/index.jsx`:

```jsx
import React from 'react'
import { render } from 'react-dom'
import { browserHistory, IndexRoute, Route, Router } from 'react-router'

import './main.css'

import App from './components/app.jsx'
import Home from './components/home.jsx'
import About from './components/about.jsx'

const div = document.createElement('div')

document.body.appendChild(div)

render(<Router history={browserHistory}>
  <Route path='/' component={App}>
    <IndexRoute component={Home}/>
    <Route path='about' component={About}/>
  </Route>
</Router>, div)
```

- We should be able to switch between pages; let's add redux:

```sh
npm i -S redux react-redux react-router-redux
```

- We'll add a simple reducer that takes a single value in increments or decrements it in `app/reducer.js`:

```js
const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'

const reducer = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1
    case DECREMENT:
      return state - 1
    default:
      return state
  }
}

export default {
  reducer
}
```

- We'll use a Provider to pass this state into the context
- We'll also keep our route state in the store using `react-router-redux`

```js
import React from 'react'
import { render } from 'react-dom'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import { browserHistory, IndexRoute, Route, Router } from 'react-router'
import { routerReducer, syncHistoryWithStore } from 'react-router-redux'

import * as reducers from './reducers.js'

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  })
)

const history = syncHistoryWithStore(browserHistory, store)

import './main.css'

import App from './components/app.jsx'
import Home from './components/home.jsx'
import About from './components/about.jsx'

const div = document.createElement('div')

document.body.appendChild(div)

render(<Provider store={store}>
  <Router history={history}>
    <Route path='/' component={App}>
      <IndexRoute component={Home}/>
      <Route path='about' component={About}/>
    </Route>
  </Router>
</Provider>, div)
```

- Now let's add the Redux tools, `redux-devtools`, `redux-devtools-dock-monitor`, and `redux-devtools-log-monitor`:

```sh
npm i -D redux-devtools redux-devtools-dock-monitor redux-devtools-log-monitor
```

- Then update our `/app/index.jsx` file to this:

```jsx
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

import React from 'react'
import { render } from 'react-dom'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import { browserHistory, IndexRoute, Route, Router } from 'react-router'
import { routerReducer, syncHistoryWithStore } from 'react-router-redux'

import * as reducers from './reducers.js'

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey='ctrl-h' changePositionKey='ctrl-q'>
    <LogMonitor theme='tomorrow' preserveScrollTop={false} />
  </DockMonitor>
)

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
})

const store = createStore(
  reducer,
  DevTools.instrument()
)

const history = syncHistoryWithStore(browserHistory, store)

import './main.css'

import App from './components/app.jsx'
import Home from './components/home.jsx'
import About from './components/about.jsx'

const div = document.createElement('div')

document.body.appendChild(div)

render(<Provider store={store}>
  <div>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={Home}/>
        <Route path='about' component={About}/>
      </Route>
    </Router>
    <DevTools/>
  </div>
</Provider>, div)
```

- Now we should be able to see the dock.
