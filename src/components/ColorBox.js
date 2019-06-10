import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import PropTypes from 'prop-types'
import ColorBoxContainer from './styles/ColorBoxStyles'


const ColorBox = ({
  background, name, id, paletteId, showLink,
}) => {
  const [copied, setCopied] = useState(false)

  const changeCopyState = () => {
    setCopied(true)
  }

  useEffect(() => {
    if (copied === true) {
      setTimeout(() => setCopied(false), 1500)
    }
  }, [copied])

  
  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
    <ColorBoxContainer className="ColorBox" background={background}>
      <div style={{ background }} className={clsx('copy-overlay', { show: copied })} />
      <div className={clsx('copy-message', { show: copied })}>
        <h1>copied!</h1>
        <p>{background}</p>
      </div>

      <div className="copy-container">
        <div className="box-content">
          <span>{name}</span>
          
        </div>
        <button type="button" className="copy-button">Copy</button>
      </div>

      {showLink && (
      <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
        <span className="see-more">MORE</span>
      </Link>
      )}
    </ColorBoxContainer>

    </CopyToClipboard>
  )
}

export default ColorBox

ColorBox.propTypes = {
  background: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  paletteId: PropTypes.string,
  showLink: PropTypes.bool,
}
ColorBox.defaultProps = {
  showLink: true,
  paletteId: '',
}