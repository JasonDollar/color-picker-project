import React, { useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group'
import Avatar from '@material-ui/core/Avatar'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'
import MiniPalette from './MiniPalette'
import PaletteListRoot from './styles/PaletteListStyle'


const FadeAnimation = createGlobalStyle`
  .fade-exit {
    opacity: 1;
  }
  .fade-exit-active {
    opacity: 0;
    transition: opacity 500ms ease-in;
  }`


const PaletteList = ({ palettes, deletePalette, ...props }) => {
  const [deleteDialogOpen, toggleDeleteDialog] = useState(false)
  const [deletingId, setDeletingId] = useState('')
  const openDialog = id => {
    toggleDeleteDialog(true)
    setDeletingId(id)
  }
  const closeDialog = () => toggleDeleteDialog(false)
  const goToPalette = id => props.history.push(`/palette/${id}`)

  return (
    <PaletteListRoot>
      <FadeAnimation />
      <div className="container">
        <nav className="nav">
          <h1>React Colors</h1>
          <Link to="/palette/new">Create Palette</Link>
        </nav>
        <TransitionGroup className="palettes">
            {palettes && palettes.map(item => (
              <CSSTransition key={item.id} classNames="fade" timeout={500}>
                <MiniPalette {...item} handleClick={goToPalette} deletePalette={deletePalette} openDialog={openDialog} />
              </CSSTransition>
            ))}
        </TransitionGroup>
      </div>
      <Dialog open={deleteDialogOpen} aria-labelledby="delete-dialog-title" onClose={closeDialog}>
        <DialogTitle id="delete-dialog-title">Delete this palette?</DialogTitle>
        <List>
          <ListItem
            button
            onClick={() => {
              deletePalette(deletingId)
              closeDialog()
            }}
          >
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                <CheckIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Delete" />
          </ListItem>
          <ListItem button onClick={closeDialog}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                <CloseIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Cancel" />
          </ListItem>
        </List>
      </Dialog>

    </PaletteListRoot>
  )
}

export default PaletteList

PaletteList.propTypes = {
  palettes: PropTypes.arrayOf(PropTypes.shape({
    paletteName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    emoji: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })).isRequired,
  })).isRequired,
  deletePalette: PropTypes.func.isRequired,
}