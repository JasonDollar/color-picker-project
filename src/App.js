import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Route, Switch, Redirect } from 'react-router-dom'
import seedColors from './seedColors'
import PaletteList from './components/PaletteList'
import Palette from './components/Palette'
import SinglePalette from './components/SinglePalette'
import NewPaletteForm from './components/NewPaletteForm'
import { generatePalette } from './colorHelpers'

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
`

function App() {
  const [palettes, setPalettes] = useState(() => JSON.parse(localStorage.getItem('palettes')) || seedColors)

  useEffect(() => {
    localStorage.setItem('palettes', JSON.stringify(palettes))
  }, [palettes])

  const findPalette = id => {
    const palette = palettes.find(item => item.id === id)
    return palette
  }

  const savePalette = newPalette => {
    setPalettes([...palettes, newPalette])
  }

  const deletePalette = id => {
    setPalettes(palettes.filter(item => item.id !== id))
  }
  return (
    <AppContainer>
      <Switch>
        <Route
          path="/palette/new"
          exact
          render={props => (
            <NewPaletteForm 
              {...props}
              savePalette={savePalette}
              palettes={palettes}
            />
          )}
        />
        <Route path="/" exact render={props => <PaletteList {...props} palettes={palettes} deletePalette={deletePalette} />} />
        <Route path="/palette/:id" exact render={props => <Palette {...props} palette={generatePalette(findPalette(props.match.params.id))} />} />
        <Route path="/palette/:paletteId/:colorId" render={props => <SinglePalette {...props} palette={generatePalette(findPalette(props.match.params.paletteId))} colorId={props.match.params.colorId} />} />
      </Switch>
      
    </AppContainer>
  )
}

export default App