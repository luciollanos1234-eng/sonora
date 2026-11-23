import { ToastProvider } from "./context/ToastContext";
import { PlayerProvider } from "./context/PlayerContext";
import { AuthProvider } from "./context/AuthContext";
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
