import { ToastProvider } from "./context/ToastContext";
import { AuthProvider } from "./context/AuthContext";
import { PlayerProvider } from "./context/PlayerContext";
import { PlaylistProvider } from "./context/PlaylistContext";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <PlaylistProvider>
          <PlayerProvider>
            <AppRouter />
          </PlayerProvider>
        </PlaylistProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;