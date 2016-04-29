import React, { PropTypes } from 'react'

import { Col, Row, Table } from 'react-bootstrap'

import { connect } from 'react-redux'

import { addIndex, map } from 'ramda'

import { Link } from 'react-router'

const indexedMap = addIndex(map)

const mapStateToProps = (state) => {
  return {
    topics: state.reducer.topics
  }
}

const renderRows = (topics) => indexedMap((topic, idx) => {
  const path = `/topic/${topic.id}`

  return <tr key={idx}>
    <td><Link to={path}>{topic.title}</Link></td>
  </tr>
}, topics)

const Home = ({ topics, dispatch }) => {
  return <Row>
    <Col xs={6}>
      <h1>Topics</h1>

      <Table striped bordered condensed hover>
        <tbody>
          {renderRows(topics)}
        </tbody>
      </Table>
    </Col>
  </Row>
}

Home.propTypes = {
  topics: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

const HomeContainer = connect(mapStateToProps)(Home)

export default HomeContainer
