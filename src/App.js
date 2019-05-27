import React from 'react'
import styled from 'styled-components'
import { Route, Switch, Redirect } from 'react-router-dom'
import seedColors from './seedColors'
import PaletteList from './components/PaletteList'
import Palette from './components/Palette'
import { generatePalette } from './colorHelpers'

const AppContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
`

function App() {
  const findPalette = id => {
    const palette = seedColors.find(item => item.id === id)
    console.log(palette)
    return palette
  }
  return (
    <AppContainer>
      <Switch>
        <Route path="/" exact render={props => <PaletteList {...props} palettes={seedColors} />} />
        <Route path="/palette/:paletteId" exact render={props => <Palette {...props} palette={generatePalette(findPalette(props.match.params.paletteId))} />} />

      </Switch>
      
    </AppContainer>
  )
}

export default App