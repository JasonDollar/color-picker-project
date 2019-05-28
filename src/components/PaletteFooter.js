import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

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

const PaletteFooter = ({ paletteName, emoji }) => {
  return (
    <Footer>
        {paletteName}
        <span className="emoji">{emoji}</span>
    </Footer>
  )
}

export default PaletteFooter

PaletteFooter.propTypes = {
  paletteName: PropTypes.string.isRequired,
  emoji: PropTypes.string,
}

PaletteFooter.defaultProps = {
  emoji: '',
}
