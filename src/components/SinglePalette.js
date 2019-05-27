import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ColorBox from './ColorBox'

const Container = styled.div`
  min-height: 100vh;

  .colors {
    height: 90vh;
  }
`


const SinglePalette = ({ palette, colorId }) => {
  console.log(palette)
  
  const gatherShades = (paletteArr, colorToFilterBy) => {
    let shades = []
    let allColors = paletteArr.colors
    Object.keys(allColors).map(key => {
      shades = [
        ...shades, 
        ...allColors[key].filter(item => item.id === colorToFilterBy),
      ]
    })
    return shades.slice(1)
  }
  const colors = gatherShades(palette, colorId)
  console.log(colors)
  return (
    <Container>
      <h2>Single Color Palette</h2>
      <div className="colors">

        {colors.map(item => (
          <ColorBox key={item.id + item.hex} id={item.id} name={item.name} background={item.hex} showLink={false} />
        ))}
      </div>
    </Container>
  )
}

export default SinglePalette

SinglePalette.propTypes = {
  palette: PropTypes.shape({
    paletteName: PropTypes.string,
    id: PropTypes.string,
    emoji: PropTypes.string,
    colors: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      color: PropTypes.string,
      hex: PropTypes.string,
      rgb: PropTypes.string,
      rgba: PropTypes.string,
    }))),
  }).isRequired,
  colorId: PropTypes.string.isRequired,
}
