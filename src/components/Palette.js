import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Navbar from './Navbar'

import ColorBox from './ColorBox'

const PaletteDiv = styled.div`
  height: 100vh;
  .Palette-colors {
    height: 90%;
  }
`


const Palette = ({ palette }) => {
  const [level, setLevel] = useState(500)

  const changeSliderLevel = newLevel => {
    setLevel(newLevel)
  }
  return (
    <PaletteDiv className="Palette">
      <Navbar changeSliderLevel={changeSliderLevel} level={level} />
      <div className="Palette-colors">
        {palette.colors[level].map(item => (
          <ColorBox key={item.color} background={item.hex} name={item.name} />
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