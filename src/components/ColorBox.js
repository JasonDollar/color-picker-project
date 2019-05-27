import React from 'react'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import PropTypes from 'prop-types'


const ColorBoxDiv = styled.div`
  width: 20%;
  height: 25%;
  margin: 0 auto;
  display: inline-block;
  position: relative;
  cursor: pointer;
  margin-bottom: -4px;
  .copy-button {
  width: 100px;
  height: 30px;
  position: absolute;
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  outline: none;
  background: rgba(255,255,255,.3);
  font-size: 1rem;
  line-height: 30px;
  text-transform: uppercase;
  border: none;
  opacity: 0;
}
.ColorBox:hover .copy-button {
  opacity: 1;
  transition: opacity .3s;
}
.box-content {
  position: absolute;
  padding: 10px;
  width: 100%;
  left: 0;
  bottom: 0;
  color: black;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-size: 12px;
}
.see-more {
  background: rgba(255,255,255,.3);
  position: absolute;
  border: none;
  right: 0;
  bottom: 0;
  color: white;
  width: 60px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  text-transform: uppercase;
}
`


const ColorBox = ({ background, name }) => {
  return (
    <CopyToClipboard text={background}>
      <ColorBoxDiv className="ColorBox" style={{ background }}>
        <div className="copy-container">
          <div className="box-content">
            <span>{name}</span>
            
          </div>
          <button type="button" className="copy-button">Copy</button>
        </div>
        <span className="see-more">MORE</span>
      </ColorBoxDiv>

    </CopyToClipboard>
  )
}

export default ColorBox

ColorBox.propTypes = {
  background: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}