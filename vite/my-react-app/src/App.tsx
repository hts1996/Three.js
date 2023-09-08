import { useState } from 'react'
import './App.css'
import Card from './Card.tsx'
import Pinball from './Pinball.tsx'
import Test from './Test.tsx'
import Game from './Game.tsx'
import Home from './Home.tsx'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Navbar from './components/Navebar.tsx'
function App() {

  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/pinball/" element={<Pinball/>}></Route>
        <Route path="/game/" element={<Game/>}></Route>
        <Route path="/card/" element={<Card/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
