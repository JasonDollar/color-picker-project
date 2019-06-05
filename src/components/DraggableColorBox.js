import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { SortableElement } from 'react-sortable-hoc'
import DeleteIcon from '@material-ui/icons/Delete'

const Container = styled.div`
  background-color: ${props => props.background};

  width: 20%;
  height: 25%;
  margin: 0 auto;
  display: inline-block;
  position: relative;
  cursor: pointer;
  margin-bottom: -4px;

  &:hover svg {
    color: white;
    transform: scale(1.3);
  }

  .boxContent {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    padding: 10px;
    color: rgba(0,0,0,.5);
    letter-spacing: 1px;
    text-transform: uppercase;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .deleteIcon {
    transition: all .3s ease-in-out;
  }

  
`

const DraggableColorBox = ({ color, name, handleClick }) => {
  console.log(color)
  return (
    <Container background={color}>
      <div className="boxContent">
        <span>{name}</span>
        <DeleteIcon className="deleteIcon" onClick={handleClick} />
      </div>
    </Container>
  )
}

export default SortableElement(DraggableColorBox)

DraggableColorBox.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
}