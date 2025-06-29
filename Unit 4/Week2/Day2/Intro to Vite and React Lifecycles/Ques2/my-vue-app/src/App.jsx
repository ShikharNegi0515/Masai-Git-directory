import { useState } from 'react'

import './App.css'
import ToggleButton from './Components/ToggleButton'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div style={{ padding: '20px' }}>
        <ToggleButton label="Power:" />
        <br /><br />
        <ToggleButton label="Fan:" />
      </div>
    </>
  )
}

export default App
