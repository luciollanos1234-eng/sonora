
import { ToastProvider } from "./context/ToastContext";
import { AuthProvider } from "./context/AuthContext";
import { PlayerProvider } from "./context/PlayerContext";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <PlayerProvider>
          <AppRouter />
        </PlayerProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
