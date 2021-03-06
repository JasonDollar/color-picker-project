import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import chroma from 'chroma-js'
import { SortableElement } from 'react-sortable-hoc'
import DeleteIcon from '@material-ui/icons/Delete'
import { mediaDown } from './styles/sizes'

const Container = styled.div`
  background-color: ${props => props.background};

  width: 20%;
  height: 25%;
  margin: 0 auto;
  display: inline-block;
  position: relative;
  cursor: pointer;
  margin-bottom: -6px;
  ${mediaDown.lg`
    width: 25%;
    height: 20%;
  `}
  ${mediaDown.md`
    width: 50%;
    height: 10%;
  `}
  ${mediaDown.sm`
    width: 100%;
    height: 7%;
  `}

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
    color: ${props => (chroma(props.background).luminance() <= 0.12 ? 'white' : '#00000080')};
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