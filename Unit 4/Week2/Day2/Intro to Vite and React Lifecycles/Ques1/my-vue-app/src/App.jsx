import { useState } from 'react'
import './App.css'
import Display from './components/Display'
import ButtonOne from "./components/ButtonOne";
import ButtonTwo from "./components/ButtonTwo";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Display count={count} />
      <ButtonOne setCount={setCount} />
      <ButtonTwo setCount={setCount} />
    </>
  )
}

export default App
