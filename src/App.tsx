import { ToastProvider } from "./context/ToastContext";
import { PlayerProvider } from "./context/PlayerContext";
import { AuthProvider } from "./context/AuthContext";
import { PlayerProvider } from "./context/PlayerContext";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <ToastProvider>
      <PlayerProvider>
        <AppRouter />
      </PlayerProvider>
      <AuthProvider>
        <PlayerProvider>
          <AppRouter />
        </PlayerProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
