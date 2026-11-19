import Navbar from "./components/layout/Navbar";
import AppRouter from "./routes/AppRouter";
import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    <ToastProvider>
      <div className="flex min-h-screen">
        <Navbar />

        <main className="min-w-0 flex-1 overflow-y-auto">
          <AppRouter />
        </main>
      </div>
    </ToastProvider>
  );
}

export default App;