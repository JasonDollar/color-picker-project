import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

const PaletteFormNav = ({
  classes, open, handleDrawerOpen, handleSubmit, newPaletteName, setNewPaletteName, palettes,
}) => {
  useEffect(() => {

    ValidatorForm.addValidationRule('isPaletteNameUnique', value => (
      palettes.every(item => item.paletteName.toLowerCase() !== newPaletteName.toLowerCase())
    ))
  })
  return (
    <Fragment>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="default"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography>
          <ValidatorForm onSubmit={handleSubmit}>

            <TextValidator 
              label="Palette Name"
              value={newPaletteName}
              onChange={e => setNewPaletteName(e.target.value)}
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={['You must provide palette name', 'Palette name must be unique']}
            />
            <Button variant="contained" color="primary" type="submit">Save Palette</Button>
            <Link to="/">
              <Button variant="contained" color="secondary">
                Go back
              </Button>
            </Link>
          </ValidatorForm>
        </Toolbar>
      </AppBar>
    </Fragment>
  )
}

export default PaletteFormNav

PaletteFormNav.propTypes = {
  open: PropTypes.bool.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  newPaletteName: PropTypes.string.isRequired,
  setNewPaletteName: PropTypes.func.isRequired,
  palettes: PropTypes.arrayOf(PropTypes.shape({
    paletteName: PropTypes.string,
    id: PropTypes.string,
    emoji: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      color: PropTypes.string,
      hex: PropTypes.string,
      rgb: PropTypes.string,
      rgba: PropTypes.string,
    })),
  }).isRequired).isRequired,

}
