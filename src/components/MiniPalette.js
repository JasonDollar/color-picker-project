import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withStyles } from '@material-ui/styles'

const MiniPaletteContainer = styled.div`
  background: white;
  border: 1px solid goldenrod;
  border-radius: 5px;
  padding: .5rem;
  position: relative;
  &:hover {
    cursor: pointer;
  }

  & .colors {
    background: forestgreen;
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
`

const MiniPalette = ({ 
  id, emoji, colors, paletteName, 
}) => {
  return (
    <MiniPaletteContainer>
      <div className="colors">
        s
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
}