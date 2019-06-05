import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import arrayMove from 'array-move'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Button from '@material-ui/core/Button'
import { ChromePicker } from 'react-color'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import DraggableColorList from './DraggableColorList'

const drawerWidth = 340

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  list: {
    height: '100%',
  },
}))

const NewPaletteForm = ({ savePalette, palettes, ...props }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [currentColor, setCurrentColor] = useState('teal')
  const [colors, setColors] = useState([])
  const [newColorName, setNewColorName] = useState('')
  const [newPaletteName, setNewPaletteName] = useState('')

  useEffect(() => {
    ValidatorForm.addValidationRule('isColorNameUnique', value => (
      colors.every(item => item.name.toLowerCase() !== value.toLowerCase())
    ))
    ValidatorForm.addValidationRule('isColorUnique', value => (
      colors.every(item => item.color !== currentColor)
    ))
    ValidatorForm.addValidationRule('isPaletteNameUnique', value => (
      palettes.every(item => item.paletteName.toLowerCase() !== newPaletteName.toLowerCase())
    ))
  })

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMove(colors, oldIndex, newIndex))
    // this.setState(({items}) => ({
    //   items: arrayMove(items, oldIndex, newIndex),
    // }))
  }

  function handleDrawerOpen() {
    setOpen(true)
  }

  function handleDrawerClose() {
    setOpen(false)
  }

  const addNewColor = e => {
    e.preventDefault()
    const newColor = { color: currentColor, name: newColorName }
    setColors([...colors, newColor])
    setNewColorName('')
  }

  const handleSubmit = () => {
    // let newPaletteName = 'New Test palette'
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, '-'),
      colors,
    }

    savePalette(newPalette)
    props.history.push('/')
  }

  const removeColor = colorName => {
    const filteredColors = colors.filter(item => item.name !== colorName)
    setColors(filteredColors)
  }
  
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
          </ValidatorForm>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <Typography variant="h4">
          Design Your Palette
        </Typography>
        <div>
          <Button variant="contained" color="secondary">Clear Palette</Button>
          <Button variant="contained" color="primary">Random Color</Button>

        </div>
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
            style={{ background: currentColor }}
          >Add Color
          </Button>
        </ValidatorForm>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList colors={colors} className={classes.list} removeColor={removeColor} axis="xy" onSortEnd={onSortEnd} />  
      </main>
    </div>
  )
}

export default NewPaletteForm

NewPaletteForm.propTypes = {
  savePalette: PropTypes.func.isRequired,
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