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
import { Header, SliderContainer } from './styles/NavbarStyles'


const Navbar = ({
  level, changeSliderLevel, handleSelectChange, format, showingAllColors,
}) => { 
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