import React from 'react'
import seedColors from './seedColors'
import Palette from './components/Palette'

function App() {
  return (
    <div>
      <Palette palette={seedColors[5]} />
    </div>
  )
}

export default App