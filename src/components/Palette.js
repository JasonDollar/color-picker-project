import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import ColorBox from './ColorBox'

const PaletteDiv = styled.div`
  height: 100vh;
  .Palette-colors {
    height: 90%;
  }
`

const Palette = ({ palette }) => {
  return (
    <PaletteDiv className="Palette">
      <div className="Palette-colors">
        {palette.colors.map(item => (
          <ColorBox key={item.name} background={item.color} name={item.name} />
        ))}
      </div>
    </PaletteDiv>
  )
}

export default Palette

Palette.propTypes = {
  palette: PropTypes.shape({
    paletteName: PropTypes.string,
    id: PropTypes.string,
    emoji: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      color: PropTypes.string,
    })),
  }).isRequired,
}