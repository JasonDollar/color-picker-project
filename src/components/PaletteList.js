import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import MiniPalette from './MiniPalette'
import { mediaUp, mediaDown } from './styles/sizes'

const PaletteListRoot = styled.div`
  background-color: blue;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  & .container {
    width: 50%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    flex-wrap: wrap;
    ${mediaDown.xl`
      width: 80%;
    `}
    ${mediaDown.xs`
      width: 75%;
    `}
  }

  & .nav {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    color: white;
    & a {
      /* text-decoration: none; */
      color: white;
    }
  }

  & .palettes {
    box-sizing: border-box;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 30%);
    gap: 2.5rem;
    ${mediaDown.md`
      grid-template-columns: repeat(2, 50%);
    `}
    ${mediaDown.xs`
      grid-template-columns: 100%;
      gap: 1rem;
    `}
  }
`


const PaletteList = ({ palettes, deletePalette, ...props }) => {
  const goToPalette = id => props.history.push(`/palette/${id}`)
  return (
    <PaletteListRoot>
      <div className="container">
        <nav className="nav">
          <h1>React Colors</h1>
          <Link to="/palette/new">Create Palette</Link>
        </nav>
        <div className="palettes">
          {palettes && palettes.map(item => (
            <MiniPalette key={item.id} {...item} handleClick={goToPalette} deletePalette={deletePalette} />
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
    emoji: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })).isRequired,
  })).isRequired,
  deletePalette: PropTypes.func.isRequired,
}