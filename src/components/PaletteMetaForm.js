import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'


const PaletteMetaForm = ({
  handleSubmit, newPaletteName, setNewPaletteName, formShowing, toggleFormShowing, 
}) => {

  return (
    <div>
      
      <Dialog open={formShowing} onClose={() => toggleFormShowing(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Choose a Pelette Name</DialogTitle>
        <ValidatorForm onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new beautiful palette. Make sure it is unique.
            </DialogContentText>

            <TextValidator 
              label="Palette Name"
              value={newPaletteName}
              onChange={e => setNewPaletteName(e.target.value)}
              validators={['required', 'isPaletteNameUnique']}
              fullWidth
              margin="normal"
              errorMessages={['You must provide palette name', 'Palette name must be unique']}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => toggleFormShowing(false)} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  )
}

export default PaletteMetaForm

PaletteMetaForm.propTypes = {
  setNewPaletteName: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired, 
  newPaletteName: PropTypes.string.isRequired,
  formShowing: PropTypes.bool.isRequired,
  toggleFormShowing: PropTypes.func.isRequired,
}