import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import arrayMove from 'array-move'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Button from '@material-ui/core/Button'
import { ChromePicker } from 'react-color'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import DraggableColorList from './DraggableColorList'
import PaletteFormNav from './PaletteFormNav'
import ColorPickerForm from './ColorPickerForm'

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

const NewPaletteForm = ({
  savePalette, palettes, maxColors, ...props 
}) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [currentColor, setCurrentColor] = useState('teal')
  const [colors, setColors] = useState(palettes[0].colors)
  const [newColorName, setNewColorName] = useState('')
  const [newPaletteName, setNewPaletteName] = useState('')
  const paletteIsFull = colors.length >= maxColors


  useEffect(() => {
    ValidatorForm.addValidationRule('isColorNameUnique', value => (
      colors.every(item => item.name.toLowerCase() !== value.toLowerCase())
    ))
    ValidatorForm.addValidationRule('isColorUnique', value => (
      colors.every(item => item.color !== currentColor)
    ))
    // ValidatorForm.addValidationRule('isPaletteNameUnique', value => (
    //   palettes.every(item => item.paletteName.toLowerCase() !== newPaletteName.toLowerCase())
    // ))
  })

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMove(colors, oldIndex, newIndex))
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

  const addRandomColor = () => {
    const allColors = palettes.map(item => item.colors).flat()
    const rand = Math.floor(Math.random() * allColors.length)
    const randomColor = allColors[rand]
    const isAlreadyTaken = colors.findIndex(item => item.name.toLowerCase() === randomColor.name.toLowerCase())
    if (isAlreadyTaken > -1) {
      return addRandomColor()
    }
    return setColors([...colors, randomColor])
  }

  
  
  return (
    <div className={classes.root}>
      <PaletteFormNav
        classes={classes}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleSubmit={handleSubmit}
        newPaletteName={newPaletteName}
        setNewPaletteName={setNewPaletteName} 
        palettes={palettes}
      />
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
          <Button variant="contained" color="secondary" onClick={() => setColors([])}>Clear Palette</Button>
          <Button variant="contained" color="primary" disabled={paletteIsFull} onClick={addRandomColor}>Random Color</Button>

        </div>
        <ColorPickerForm
          currentColor={currentColor} 
          setCurrentColor={setCurrentColor} 
          addNewColor={addNewColor} 
          newColorName={newColorName} 
          setNewColorName={setNewColorName} 
          paletteIsFull={paletteIsFull} 
        />
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

NewPaletteForm.defaultProps = {
  maxColors: 20,
}