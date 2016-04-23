/* globals describe it */

import React from 'react'

// Chai.js is a BDD / TDD assertion library for node and the browser
// http://chaijs.com/
import chai, { expect } from 'chai'

// chai-enzyme: Chai.js assertions and convenience functions for testing
// React components with Enzyme
// https://github.com/producthunt/chai-enzyme
import chaiEnzyme from 'chai-enzyme'

// Sinon.js provides standalone test spies, stubs and mocks (
// http://sinonjs.org/
// import sinon from 'sinon'

// Add the chaiEnzyme plugin to chai
chai.use(chaiEnzyme())

// Enzyme is a JavaScript Testing utility for React that makes it easier
// to assert, manipulate, and traverse your React Components' output
// http://airbnb.io/enzyme/
import { shallow } from 'enzyme'

// There are three ways to "render" your React components
// These are mount, render, and shallow

// Shallow rendering is useful to constrain yourself to testing a component
// as a unit, and to ensure that your tests aren't indirectly asserting on
// behavior of child components
// http://airbnb.io/enzyme/docs/api/shallow.html

// Full DOM rendering (mount) is ideal for use cases where you have components
// that may interact with DOM apis, or may require the full lifecycle in order
// to fully test the component (ie, componentDidMount etc.)
// http://airbnb.io/enzyme/docs/api/mount.html

// Enzyme's render function is used to render react components to static HTML
// and analyze the resulting HTML structure (uses cheerio for traversal)
// http://airbnb.io/enzyme/docs/api/render.html
// http://cheeriojs.github.io/cheerio/

// Import the components we'll be testing
import App from '../app/components/app.jsx'
import Header from '../app/components/header.jsx'

// Create a BDD-style describe block
describe('<App/>', () => {
  // Add a specification to check whether the App when shallowly rendered
  // includes the Header - shallow means the Header's render method is not
  // called
  it('includes the Header', () => {
    const wrapper = shallow(<App><p/></App>)

    // We imported expect from the chai library
    // to and contain are provided by chai and chai-enzyme
    expect(wrapper).to.contain(<Header/>)
  })
})
