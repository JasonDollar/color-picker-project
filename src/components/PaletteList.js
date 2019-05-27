import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import MiniPalette from './MiniPalette'


const PaletteList = ({ palettes }) => {
  return (
    <div>
      <h1>React Colors</h1>
      {palettes.map(item => (
        <Link key={item.id} to={`palette/${item.id}`}>
          <MiniPalette {...item} />
        </Link>
      ))}
    </div>
  )
}

export default PaletteList

PaletteList.propTypes = {
  palettes: PropTypes.arrayOf(PropTypes.shape({
    paletteName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    emoji: PropTypes.string.isRequired,
    colors: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })).isRequired,
  })).isRequired,
}