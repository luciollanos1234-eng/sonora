
import { BrowserRouter, Routes, Route } from "react-router";

import { ToastProvider } from "./context/ToastContext";
import { UIShowcase } from "./pages/UIShowcase";

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          {/* Página temporal de pruebas */}
          <Route path="/" element={<UIShowcase />} />

          {/* Acceso directo a la página de pruebas */}
          <Route path="/ui-showcase" element={<UIShowcase />} />

          {/* Ruta para páginas inexistentes */}
          <Route
            path="*"
            element={
              <main className="
                min-h-screen flex items-center justify-center
                bg-[var(--bg)] text-[var(--text)]
              ">
                <div className="text-center space-y-4">
                  <h1 className="text-4xl font-bold">404</h1>
                  <p className="text-[var(--text-muted)]">
                    Página no encontrada.
                  </p>
                  <a
                    href="/"
                    className="text-[var(--primary-text)] underline"
                  >
                    Volver al inicio
                  </a>
                </div>
              </main>
            }
          />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
