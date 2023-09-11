import { useState } from 'react'
import styles from './App.module.css'
import Card from './Card.tsx'
import Pinball from './Pinball.tsx'
import Test from './Test.tsx'
import Game from './Game.tsx'
import Home from './Home.tsx'
import Login from './Login.tsx'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Navbar from './components/Navebar.tsx'
function App() {

  return (
    <div className={styles.appContainer}>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/pinball/" element={<Pinball/>}></Route>
        <Route path="/game/" element={<Game/>}></Route>
        <Route path="/card/" element={<Card/>}></Route>
        <Route path="/login/" element={<Login/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
