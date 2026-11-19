
import { BrowserRouter } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import AppRouter from "./routes/AppRouter";
import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <div className="flex min-h-screen">
          <Navbar />

          <main className="flex-1 min-w-0 overflow-y-auto">
            <AppRouter />
          </main>
        </div>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
