import Navbar from "./components/layout/Navbar"
import AppRouter from "./routes/AppRouter"

function App() {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <main className="flex-1 overflow-y-auto">
        <AppRouter />
      </main>
    </div>
  )
}

export default App
