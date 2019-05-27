import React, { useState, useEffect } from 'react'

import { CopyToClipboard } from 'react-copy-to-clipboard'
import PropTypes from 'prop-types'
import './ColorBox.css'



const ColorBox = ({ background, name }) => {
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
    <div className="ColorBox" style={{ background }}>
      <div style={{ background }} className={` copy-overlay ${copied && 'show'}`} />
      <div className={`copy-message ${copied && 'show'}`}>
        <h1>copied!</h1>
        <p>{background}</p>
      </div>
        <div className="copy-container">
          <div className="box-content">
            <span>{name}</span>
            
          </div>
          <button type="button" className="copy-button">Copy</button>
        </div>
        <span className="see-more">MORE</span>
    </div>

    </CopyToClipboard>
  )
}

export default ColorBox

ColorBox.propTypes = {
  background: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}