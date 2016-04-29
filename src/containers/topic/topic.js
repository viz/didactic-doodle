import React, { PropTypes } from 'react'

import { Col, Row, Table } from 'react-bootstrap'

import { connect } from 'react-redux'

import { addIndex, filter, find, map, propEq } from 'ramda'

import { Link } from 'react-router'

const indexedMap = addIndex(map)

const mapStateToProps = (state) => {
  return {
    cards: state.reducer.cards,
    topics: state.reducer.topics
  }
}
const renderRows = (cards) => indexedMap((card, idx) => {
  const path = `/topic/${card.topicId}/card/${card.id}`

  return <tr key={idx}>
    <td><Link to={path}>{card.word}</Link></td>
  </tr>
}, cards)

const Topic = ({ cards, topics, params, dispatch }) => {
  const finder = find(propEq('id', parseInt(params.topicId, 10)))

  return <Row>
    <Col xs={6}>
      <h1>{finder(topics).title}</h1>

      <Table striped bordered condensed hover>
        <tbody>
          {renderRows(filter((card) => card.topicId === parseInt(params.topicId, 10), cards))}
        </tbody>
      </Table>
    </Col>
  </Row>
}

Topic.propTypes = {
  cards: PropTypes.array,
  topics: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
}

const TopicContainer = connect(mapStateToProps)(Topic)

export default TopicContainer
