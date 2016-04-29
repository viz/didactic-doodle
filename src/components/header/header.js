import React from 'react'

import { Nav, Navbar, NavItem } from 'react-bootstrap'

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
      <LinkContainer to={{ pathname: '/counter' }}>
        <NavItem eventKey={2} href='#'>Counter</NavItem>
      </LinkContainer>
    </Nav>
  </Navbar.Collapse>
</Navbar>

export default Header
