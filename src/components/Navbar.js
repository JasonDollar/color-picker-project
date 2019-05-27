import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import styled from 'styled-components'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 6vh;

  & .logo {
    margin-right: 15px;
    padding: 0 13px;
    font-size: 22px;
    background-color: #eceff1;
    font-family: Roboto, sans-serif;
    height: 100%;
    display: flex;
    align-items: center;

    & a {
      text-decoration: none;
      color: black;
    }
  }
`
const SliderContainer = styled.div`
  width: 340px;
  margin: 0 10px;
  display: inline-block;

  .rc-slider-track {
    background: transparent;
  }
  .rc-slider-rail {
    height: 8px;
  }
  .rc-slider-handle,
  .rc-slider-handle:active, 
  .rc-slider-handle:hover,
  .rc-slider-handle:focus {
    background: green;
    border: 2px solid green;
    box-shadow: none;
    width: 13px;
    height: 13px;
    margin-left: 7px;
    margin-top: -3px;
  }

`

const Navbar = ({
  level, changeSliderLevel, handleSelectChange, format, 
}) => { 
  return (
    <Header>
      <div className="logo">
        <a href="#">reactcolorpicker</a>
      </div>
      <div className="slider-container">
        <span>Level: {level}</span>
        <SliderContainer>
        <Slider 
          defaultValue={level}
          min={100}
          max={900}
          onAfterChange={changeSliderLevel}
          step={100}
        />
        </SliderContainer>
      </div>
      <div value={format} className="select-container">
        <Select onChange={handleSelectChange}>
          <MenuItem value="hex">HEX - #ffffff</MenuItem>
          <MenuItem value="rgb">RGB - rgb(255, 255, 255) </MenuItem>
          <MenuItem value="rgba">RGBA - rgb(255, 255, 255, 1.0) </MenuItem>
        </Select>
      </div>
    </Header>
  ) 
}

export default Navbar

Navbar.propTypes = {
  level: PropTypes.number.isRequired,
  changeSliderLevel: PropTypes.func.isRequired,
  handleSelectChange: PropTypes.func.isRequired,
  format: PropTypes.string.isRequired,
}