import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { ChromePicker } from 'react-color'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'


const ColorPickerForm = ({
  currentColor, setCurrentColor, addNewColor, newColorName, setNewColorName, paletteIsFull,
}) => {
  return (
    <Fragment>
      <ChromePicker color={currentColor} onChangeComplete={newColor => setCurrentColor(newColor.hex)} />
        <ValidatorForm onSubmit={addNewColor}>
          <TextValidator 
            value={newColorName}
            onChange={e => setNewColorName(e.target.value)}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={['This field is required', 'Color name must be unique', 'Color already used']}
          />
          <Button 
            type="submit"
            variant="contained"
            color="primary"
            style={{ background: paletteIsFull ? 'grey' : currentColor }}
            disabled={paletteIsFull}
          >{paletteIsFull ? 'Palette Full' : 'Add Color'}
          </Button>
        </ValidatorForm>
    </Fragment>
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