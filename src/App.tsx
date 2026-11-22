
import { ToastProvider } from "./context/ToastContext";
import { PlayerProvider } from "./context/PlayerContext";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <ToastProvider>
      <PlayerProvider>
        <AppRouter />
      </PlayerProvider>
    </ToastProvider>
  );
}

export default App;
