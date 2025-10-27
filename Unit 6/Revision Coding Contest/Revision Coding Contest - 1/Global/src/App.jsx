import React, { useState } from 'react'
import Home from './pages/Home.jsx'
import CountryDetails from './pages/CountryDetails.jsx'


export default function App() {
  const [selected, setSelected] = useState(null)
  const [favoritesView, setFavoritesView] = useState(false)


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Country Explorer</h1>
        <div className="flex gap-3 items-center">
          <button onClick={() => { setSelected(null); setFavoritesView(false) }}>Home</button>
          <button onClick={() => setFavoritesView(true)}>Favorites</button>
        </div>
      </header>


      {selected ? (
        <CountryDetails country={selected} onBack={() => setSelected(null)} />
      ) : (
        <Home onSelect={setSelected} favoritesView={favoritesView} />
      )}
    </div>
  )
}