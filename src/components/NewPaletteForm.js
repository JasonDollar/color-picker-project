import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import arrayMove from 'array-move'
import clsx from 'clsx'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Button from '@material-ui/core/Button'
import { ValidatorForm } from 'react-material-ui-form-validator'
import DraggableColorList from './DraggableColorList'
import PaletteFormNav from './PaletteFormNav'
import ColorPickerForm from './ColorPickerForm'
import NewPaletteFormStyles from './styles/NewPaletteFormStyles'


const NewPaletteForm = ({
  savePalette, palettes, maxColors = 20, ...props 
}) => {
  const classes = NewPaletteFormStyles()
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

  const handleSubmit = emoji => {
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, '-'),
      colors,
      emoji,
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
        <div className={classes.container}>
          <Typography variant="h4" gutterBottom>
            Design Your Palette
          </Typography>
          <div className={classes.buttons}>
            <Button 
              className={classes.actionButton}
              variant="contained"
              color="secondary"
              onClick={() => setColors([])}
            >Clear Palette
            </Button>
            <Button 
              className={classes.actionButton}
              variant="contained"
              color="primary"
              disabled={paletteIsFull}
              onClick={addRandomColor}
            >Random Color
            </Button>

          </div>
          <ColorPickerForm
            currentColor={currentColor} 
            setCurrentColor={setCurrentColor} 
            addNewColor={addNewColor} 
            newColorName={newColorName} 
            setNewColorName={setNewColorName} 
            paletteIsFull={paletteIsFull} 
          />
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList colors={colors} className={classes.list} removeColor={removeColor} axis="xy" onSortEnd={onSortEnd} distance={20} />  
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
  maxColors: PropTypes.number,
}

NewPaletteForm.defaultProps = {
  maxColors: 20,
}