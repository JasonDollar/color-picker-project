import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Button from '@material-ui/core/Button'
import { ValidatorForm } from 'react-material-ui-form-validator'
import PaletteMetaForm from './PaletteMetaForm'
import PaletteFormNavStyles from './styles/PaletteFormNavStyles'


const PaletteFormNav = ({
  open, handleDrawerOpen, handleSubmit, newPaletteName, setNewPaletteName, palettes,
}) => {
  const classes = PaletteFormNavStyles()
  const [formShowing, toggleFormShowing] = useState(false)
  useEffect(() => {

    ValidatorForm.addValidationRule('isPaletteNameUnique', value => (
      palettes.every(item => item.paletteName.toLowerCase() !== newPaletteName.toLowerCase())
    ))
  })
  return (
    <div className={classes.root}>
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
            <ChevronRightIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Create A Palette
          </Typography>
        </Toolbar>
        <div className={classes.navBtns}>
          
          <Link to="/">
            <Button className={classes.button} variant="contained" color="secondary">
              Go back
            </Button>
          </Link>
          <Button className={classes.button} variant="outlined" color="primary" onClick={() => toggleFormShowing(true)}>
            Save
          </Button>
        </div>
      </AppBar>
      {formShowing && <PaletteMetaForm handleSubmit={handleSubmit} newPaletteName={newPaletteName} setNewPaletteName={setNewPaletteName} formShowing={formShowing} toggleFormShowing={toggleFormShowing} />}
    </div>
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
