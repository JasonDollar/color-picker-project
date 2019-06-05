import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { SortableContainer } from 'react-sortable-hoc'

import DraggableColorBox from './DraggableColorBox'

const List = styled.ul`
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
`

const DraggableColorList = ({ colors, removeColor }) => {
  console.log(colors)
  return (
    <List>
      {colors.map((item, i) => (
        <DraggableColorBox key={item.name} index={i} color={item.color} name={item.name} handleClick={() => removeColor(item.name)} />
      ))}

    </List>
  )
}


export default SortableContainer(DraggableColorList)

DraggableColorList.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string,
    name: PropTypes.string,
  })),
  removeColor: PropTypes.func.isRequired,
}

DraggableColorList.defaultProps = {
  colors: [],
}