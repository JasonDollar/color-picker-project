import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ColorBox from './ColorBox'
import Navbar from './Navbar'
import PaletteFooter from './PaletteFooter'
import Container from './styles/PaletteStyles'


const SinglePalette = ({ palette, colorId }) => {
  const [format, setFormat] = useState('hex')
  
  const gatherShades = (paletteArr, colorToFilterBy) => {
    let shades = []
    let allColors = paletteArr.colors
    Object.keys(allColors).map(key => (
      shades = [
        ...shades, 
        ...allColors[key].filter(item => item.id === colorToFilterBy),
      ]
      
    ))
    return shades.slice(1)
  }
  const colors = gatherShades(palette, colorId)
  return (
    <Container>
      <Navbar format={format} handleSelectChange={e => setFormat(e.target.value)} showingAllColors={false} />
      <h2>Single Color Palette</h2>
      <div className="colors SingleColorPalette">

        {colors.map(item => (
          <ColorBox key={item.id + item.hex} id={item.id} name={item.name} background={item[format]} showLink={false} />
        ))}
        <div className="go-back ColorBox">
          <Link to={`/palette/${palette.id}`} className="back-button">Go back</Link>
        </div>
      </div>
      <PaletteFooter paletteName={palette.paletteName} emoji={palette.emoji} />
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
