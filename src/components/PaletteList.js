import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import MiniPalette from './MiniPalette'

const PaletteListRoot = styled.div`
  background-color: blue;
  height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  & .container {
    width: 50%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    flex-wrap: wrap;
  }

  & .nav {
    display: flex;
    width: 100%;
    justify-content: space-between;
    color: white;
  }

  & .palettes {
    box-sizing: border-box;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 30%);
    gap: 5%;
  }
`


const PaletteList = ({ palettes, ...props }) => {
  const goToPalette = id => props.history.push(`/palette/${id}`)
  return (
    <PaletteListRoot>
      <div className="container">
        <nav className="nav">
          <h1>React Colors</h1>
        </nav>
        <div className="palettes">
          {palettes.map(item => (
            <MiniPalette key={item.id} {...item} handleClick={goToPalette} />
          ))}

        </div>
      </div>
    </PaletteListRoot>
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