import React from 'react'
import seedColors from './seedColors'
import Palette from './components/Palette'
import { generatePalette } from './colorHelpers'

function App() {
  return (
    <div>
      <Palette palette={generatePalette(seedColors[5])} />
    </div>
  )
}

export default App