import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { ChromePicker } from 'react-color'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'


const ColorPickerContainer = styled.aside`
  .picker {
    width: 100% !important;
    margin-top: 2rem;
  }
  .addColor {
    width: 100%;
    padding: 1rem;
    margin-top: 1rem;
    font-size: 2rem;
  }
  .colorNameInput {
    width: 100%;
    height: 70px;
  }
`

const ColorPickerForm = ({
  currentColor, setCurrentColor, addNewColor, newColorName, setNewColorName, paletteIsFull,
}) => {
  return (
    <ColorPickerContainer>
      <ChromePicker
        className="picker"
        color={currentColor} 
        onChangeComplete={newColor => setCurrentColor(newColor.hex)}
      />
        <ValidatorForm onSubmit={addNewColor} instantValidate={false}>
          <TextValidator 
            className="colorNameInput"
            value={newColorName}
            placeholder="Color Name"
            variant="filled"
            margin="normal"
            onChange={e => setNewColorName(e.target.value)}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={['This field is required', 'Color name must be unique', 'Color already used']}
          />
          <Button 
            className="addColor"
            type="submit"
            variant="contained"
            color="primary"
            style={{ background: paletteIsFull ? 'grey' : currentColor }}
            disabled={paletteIsFull}
          >{paletteIsFull ? 'Palette Full' : 'Add Color'}
          </Button>
        </ValidatorForm>
    </ColorPickerContainer>
  )
}

export default ColorPickerForm

ColorPickerForm.propTypes = {
  currentColor: PropTypes.string.isRequired,
  setCurrentColor: PropTypes.func.isRequired,
  addNewColor: PropTypes.func.isRequired,
  newColorName: PropTypes.string.isRequired,
  setNewColorName: PropTypes.func.isRequired,
  paletteIsFull: PropTypes.bool.isRequired,
}