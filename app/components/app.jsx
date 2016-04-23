import React, { PropTypes } from 'react'

import { Grid } from 'react-bootstrap'

import Header from './header.jsx'

const App = ({ children }) => <div>
  <Header/>
  <Grid>
    {children}
  </Grid>
</div>

App.propTypes = {
  children: PropTypes.object.isRequired
}

export default App
