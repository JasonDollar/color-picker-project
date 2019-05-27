import React from 'react'
import styled from 'styled-components'
import seedColors from './seedColors'
import Palette from './components/Palette'
import { generatePalette } from './colorHelpers'

const AppContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
`

function App() {
  return (
    <AppContainer>
      <Palette palette={generatePalette(seedColors[5])} />
    </AppContainer>
  )
}

export default App