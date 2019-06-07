import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { ChromePicker } from 'react-color'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

const useStyles = makeStyles(theme => ({
  picker: {
    width: '100% !important',
    marginTop: '2rem',
  },
  addColor: {
    width: '100%',
    padding: '1rem',
    marginTop: '1rem',
    fontSize: '2rem',
  },
  colorNameInput: {
    width: '100%',
    height: '70px',
    
  },
}))


const ColorPickerForm = ({
  currentColor, setCurrentColor, addNewColor, newColorName, setNewColorName, paletteIsFull,
}) => {
  const classes = useStyles()
  return (
    <Fragment>
      <ChromePicker
        className={classes.picker}
        color={currentColor} 
        onChangeComplete={newColor => setCurrentColor(newColor.hex)}
      />
        <ValidatorForm onSubmit={addNewColor}>
          <TextValidator 
            className={classes.colorNameInput}
            value={newColorName}
            placeholder="Color Name"
            variant="filled"
            margin="normal"
            onChange={e => setNewColorName(e.target.value)}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={['This field is required', 'Color name must be unique', 'Color already used']}
          />
          <Button 
            className={classes.addColor}
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