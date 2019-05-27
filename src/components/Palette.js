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

const Footer = styled.footer`
  background: #eee;
  height: 4vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-weight: bold;

  & .emoji {
    font-size: 1.5rem;
    margin: 0 1rem;
  }
`


const Palette = ({ palette }) => {
  const [level, setLevel] = useState(500)
  const [format, setFormat] = useState('hex')

  const changeSliderLevel = newLevel => {
    setLevel(newLevel)
  }

  return (
    <PaletteDiv className="Palette">
      <Navbar changeSliderLevel={changeSliderLevel} level={level} handleSelectChange={e => setFormat(e.target.value)} format={format} />
      <div className="Palette-colors">
        {palette.colors[level].map(item => (
          <ColorBox 
            key={item.id}
            id={item.id}
            paletteId={palette.id}
            background={item[format]}
            name={item.name}
          />
        ))}
      </div>
      <Footer>
        {palette.paletteName}
        <span className="emoji">{palette.emoji}</span>
      </Footer>
    </PaletteDiv>
  )
}

export default Palette

Palette.propTypes = { 
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
}

