import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import PropTypes from 'prop-types'
import chroma from 'chroma-js'
// import './ColorBox.css'

const ColorBoxContainer = styled.div`
  width: 20%;
  height: 25%;
  margin: 0 auto;
  display: inline-block;
  position: relative;
  cursor: pointer;
  margin-bottom: -4px;
  background: ${props => props.background};

  .copy-button,
  .back-button {
    width: 100px;
    height: 30px;
    position: absolute;
    display: inline-block;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    outline: none;
    background: rgba(255,255,255,.3);
    font-size: 1rem;
    line-height: 30px;
    text-transform: uppercase;
    border: none;
    text-align: center;
  }

  .copy-button {
    opacity: 0;
    color: ${props => chroma(props.background).luminance() >= 0.6 ? '#00000080' : 'white'};
  }

  &:hover .copy-button {
    opacity: 1;
    transition: opacity .3s;
  }

  .box-content {
    position: absolute;
    padding: 10px;
    width: 100%;
    left: 0;
    bottom: 0;
    color: ${props => chroma(props.background).luminance() <= 0.12 ? 'white' : 'black'};
    letter-spacing: 1px;
    text-transform: uppercase;
    font-size: 12px;
  }

    .copy-overlay {
    /* background: ${props => props.background}; */
    opacity: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    transition: transform .5s ease-in-out;
    transform: scale(.1);
  }
  .copy-overlay.show {
    opacity: 1;
    transform: scale(50);
    z-index: 10;
    position: absolute;

  }

  .see-more {
    background: rgba(255,255,255,.3);
    position: absolute;
    border: none;
    right: 0;
    bottom: 0;
    color: ${props => chroma(props.background).luminance() >= 0.6 ? '#00000080' : 'white'};
    width: 60px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    text-transform: uppercase;
  }



  .copy-message {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 4rem;
    transform: scale(0.1);
    color: white;
    opacity: 0;
  }

  .copy-message.show {
    opacity: 1;
    transform: scale(1);
    z-index: 25;
    transition: all .3s ease-in-out;
    transition-delay: .2s;
  }

  .copy-message h1 {
    font-weight: 400;
    text-shadow: 1px 2px black;
    text-transform: uppercase;
    background: rgba(255, 255, 255, .2);
    width: 100%;
    text-align: center;
    margin-bottom: 0;
    padding: 1rem;
  }
  .copy-message p {
    font-size: 2rem;
    font-weight: 100;
    color: ${props => chroma(props.background).luminance() >= 0.6 ? '#00000080' : 'white'}
  } 
`


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
    <ColorBoxContainer className="ColorBox" background={ background }>
      <div style={{ background }} className={` copy-overlay ${copied && 'show'}`} />
      <div className={`copy-message ${copied && 'show'}`}>
        <h1>copied!</h1>
        <p>{background}</p>
      </div>

      <div className="copy-container">
        <div className="box-content">
          <span>{name}</span>
          
        </div>
        <button type="button" className='copy-button'>Copy</button>
      </div>

      {showLink && (
      <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
        <span className='see-more'>MORE</span>
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