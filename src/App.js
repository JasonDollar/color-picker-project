import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Route, Switch, Redirect } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import seedColors from './seedColors'
import PaletteList from './components/PaletteList'
import Palette from './components/Palette'
import SinglePalette from './components/SinglePalette'
import NewPaletteForm from './components/NewPaletteForm'
import Page from './components/Page'
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
      <Route render={({ location }) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="page" timeout={500}> 
            <Switch location={location}>
              <Route
                path="/palette/new"
                exact
                render={props => (
                  <Page>
                    <NewPaletteForm 
                      {...props}
                      savePalette={savePalette}
                      palettes={palettes}
                    />
                  </Page>
                )}
              />
              <Route path="/" exact render={props => <Page><PaletteList {...props} palettes={palettes} deletePalette={deletePalette} /></Page>} />
              <Route path="/palette/:id" exact render={props => <Page><Palette {...props} palette={generatePalette(findPalette(props.match.params.id))} /></Page>} />
              <Route path="/palette/:paletteId/:colorId" render={props => <Page><SinglePalette {...props} palette={generatePalette(findPalette(props.match.params.paletteId))} colorId={props.match.params.colorId} /></Page>} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )} 
      />
      
      
    </AppContainer>
  )
}

export default App