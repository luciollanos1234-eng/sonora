import {  Route, Routes } from "react-router-dom"
import Playlist from "../pages/Playlist"
import About from "../pages/About"
import Home from "../pages/Home"

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/playlist" element={<Playlist />} />
      <Route path="/about" element={<About />} />
      <Route path="/Home" element={<Home />} />
    </Routes>
  )
}

export default AppRouter
