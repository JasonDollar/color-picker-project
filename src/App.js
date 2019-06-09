import React, { useState, useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Route, Switch, Redirect } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
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

const PageCSS = createGlobalStyle`
  .page {
    height: 100vh;
    position: fixed;
    width: 100%;
  }
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
      <PageCSS />
      <Route render={({ location }) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="fade" timeout={500}> 
            <Switch location={location}>
              <Route
                path="/palette/new"
                exact
                render={props => (
                  <div className="page">

                  <NewPaletteForm 
                    {...props}
                    savePalette={savePalette}
                    palettes={palettes}
                  />
                  </div>
                )}
              />
              <Route path="/" exact render={props => <div className="page"><PaletteList {...props} palettes={palettes} deletePalette={deletePalette} /></div>} />
              <Route path="/palette/:id" exact render={props => <div className="page"><Palette {...props} palette={generatePalette(findPalette(props.match.params.id))} /></div>} />
              <Route path="/palette/:paletteId/:colorId" render={props => <div className="page"><SinglePalette {...props} palette={generatePalette(findPalette(props.match.params.paletteId))} colorId={props.match.params.colorId} /></div>} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )} 
      />
      
      
    </AppContainer>
  )
}

export default App