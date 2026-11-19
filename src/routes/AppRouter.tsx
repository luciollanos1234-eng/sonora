import { Navigate, Route, Routes } from "react-router-dom"
import Playlist from "../pages/Playlist"
import About from "../pages/About"

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/playlist" element={<Playlist />} />
      <Route path="/about" element={<About />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRouter
