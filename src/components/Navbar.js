import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { 
  Select, MenuItem, Snackbar, IconButton, 
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
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

  .select-container {
    margin-left: auto;
    margin-right: 1rem;
  }
`
const SliderContainer = styled.div`
  width: 340px;
  margin: 0 10px;
  display: inline-block;

  .rc-slider-track {
    background: transparent;
    margin-left: 7px;
  }
  .rc-slider-rail {
    height: 8px;
    margin-left: 7px;
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
  level, changeSliderLevel, handleSelectChange, format, showingAllColors,
}) => { 
  console.log(format)
  const [openSnackbar, toggleOpenSnackbar] = useState(false)
  return (
    <Header>
      <div className="logo">
        <Link to="/">reactcolorpicker</Link>
      </div>
      {showingAllColors && (
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
      )}
      <div value={format} className="select-container">
        <Select onChange={e => {
          handleSelectChange(e)
          toggleOpenSnackbar(true)
        }}
        >
          <MenuItem value="hex">HEX - #ffffff</MenuItem>
          <MenuItem value="rgb">RGB - rgb(255, 255, 255) </MenuItem>
          <MenuItem value="rgba">RGBA - rgb(255, 255, 255, 1.0) </MenuItem>
        </Select>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={openSnackbar}
        autoHideDuration={3000}
        message={<span id="message-id">Format Changed to {format.toUpperCase()}</span>}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        onClose={() => toggleOpenSnackbar(false)}
        action={[
          <IconButton onClick={() => toggleOpenSnackbar(false)} color="inherit" key="close" aria-label="close">
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </Header>
  ) 
}

export default Navbar

Navbar.propTypes = {
  level: PropTypes.number,
  changeSliderLevel: PropTypes.func,
  handleSelectChange: PropTypes.func.isRequired,
  format: PropTypes.string.isRequired,
  showingAllColors: PropTypes.bool,
}

Navbar.defaultProps = {
  showingAllColors: true,
  level: 500,
  changeSliderLevel: null,
}