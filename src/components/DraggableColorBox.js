import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

const Container = styled.div`
  background-color: ${props => props.background};

  width: 20%;
  height: 25%;
  margin: 0 auto;
  display: inline-block;
  position: relative;
  cursor: pointer;
  margin-bottom: -4px;
`

const DraggableColorBox = ({ color, name }) => {
  return (
    <Container background={color}>
      {name}
    </Container>
  )
}

export default DraggableColorBox

DraggableColorBox.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}