import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DeleteIcon from '@material-ui/icons/Delete'

const MiniPaletteContainer = styled.div`
  background: white;
  border: 1px solid goldenrod;
  border-radius: 5px;
  padding: .5rem;
  position: relative;
  cursor: pointer;

  & .colors {
    background-color: #dae1e4;
    height: 150px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 20%);
    grid-template-rows: repeat(4, 25%);
    border-radius: 5px;
    overflow: hidden;
  }

  & .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    color: black;
    padding-top: .5rem;
    font-size: 1rem;
    position: relative;
  }

  & .emoji {
    margin-left: .5rem;
    font-size: 1.5rem;
  }

  & .deleteIcon {
    color: white;
    background-color: #eb3d30;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px;
    z-index: 10;
    opacity: 0;
    /* transform: all .25s ease-in-out; */
  }
  &:hover .deleteIcon {
    opacity: 1;
  }

`

const MiniColor = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  position: relative;
  /* margin-bottom: -3.5px; */
  background: ${props => props.background};
`

const MiniPalette = ({ 
  id, emoji, colors, paletteName, handleClick, deletePalette,
}) => {
  const miniColorBoxes = colors.map(item => (
    <MiniColor key={item.name} background={item.color} />
  ))
  return (
    <MiniPaletteContainer onClick={() => handleClick(id)}>
      <DeleteIcon
        className="deleteIcon"
        style={{ transition: 'all .2s ease-in-out' }}
        onClick={e => {
          e.stopPropagation()
          deletePalette(id)
        }}
      />
      <div className="colors">
        {miniColorBoxes}
      </div>
      <h5 className="title">{paletteName} <span className="emoji">{emoji}</span>  </h5>
    </MiniPaletteContainer>
  )
}

export default MiniPalette

MiniPalette.propTypes = {
  paletteName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
  colors: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  })).isRequired,
  handleClick: PropTypes.func.isRequired,
  deletePalette: PropTypes.func.isRequired,
}