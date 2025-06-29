import { useState } from 'react'

import './App.css'
import ThemeApp from './Components/ThemeApp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ThemeApp />;
    </>
  )
}


export default App
