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
        <a>Didactic Doodle</a>
      </IndexLinkContainer>
    </Navbar.Brand>
  </Navbar.Header>
  <Nav>
    <IndexLinkContainer to={{ pathname: '/' }}>
      <NavItem eventKey={1}>Home</NavItem>
    </IndexLinkContainer>
    <LinkContainer to={{ pathname: '/about' }}>
      <NavItem eventKey={2}>About</NavItem>
    </LinkContainer>
  </Nav>
</Navbar>

export default Header
