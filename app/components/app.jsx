import React from 'react'

import { Grid } from 'react-bootstrap'

import Header from './header.jsx'

const App = ({ children }) => <div>
  <Header/>
  <Grid>
    {children}
  </Grid>
</div>

export default App
