/* globals describe it */

import React from 'react'

import chai, { expect } from 'chai'

import chaiEnzyme from 'chai-enzyme'

chai.use(chaiEnzyme())

import { shallow } from 'enzyme'

import { createStore } from 'redux'

import { App } from '../src/containers'
import { Header } from '../src/components'

import { reducer } from '../src/redux/modules/reducer.js'

describe('<App/>', () => {
  it('includes the Header', () => {
    const wrapper = shallow(<App><p/></App>)

    expect(wrapper).to.contain(<Header/>)
  })
})

// Test the reducer
describe('reducer', () => {
  it('increments the count when an INCREMENT action is dispatched', () => {
    const store = createStore(reducer)
    const action = { type: 'INCREMENT' }

    store.dispatch(action)
    store.dispatch(action)
    store.dispatch(action)

    expect(store.getState().count).to.equal(3)
  })

  it('increments the count when an DECREMENT action is dispatched', () => {
    const store = createStore(reducer)
    const action = { type: 'DECREMENT' }

    store.dispatch(action)
    store.dispatch(action)
    store.dispatch(action)

    expect(store.getState().count).to.equal(-3)
  })
})
