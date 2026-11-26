import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/useAuth";

import Layout from "../components/layout/Layout";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import Home from "../pages/Home";
import Playlist from "../pages/Playlist";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import Detail from "../pages/Detail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Admin from "../pages/Admin";
import { UIShowcase } from "../pages/UIShowcase";

const PageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "Inicio",
      "/playlist": "Mi Playlist",
      "/about": "Acerca de nosotros",
      "/login": "Iniciar sesión",
      "/registro": "Registro",
      "/admin": "Administración",
    };

    const title = location.pathname.startsWith("/detalle/")
      ? "Detalle"
      : location.pathname === "/ui-showcase"
        ? "UI Kit"
        : titles[location.pathname] ?? "Página no encontrada";

    document.title = `${title} · Sonora`;
  }, [location.pathname]);

  return null;
};

const AppRouter = () => {
  const { user } = useAuth();

  return (
    <>
      <PageTitle />

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/detalle/:id" element={<Detail />} />
          <Route
            path="/playlist"
            element={
              <ProtectedRoute>
                <Playlist />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="/ui-showcase" element={<UIShowcase />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route
          path="/registro"
          element={user ? <Navigate to="/" replace /> : <Register />}
        />
      </Routes>
    </>
  );
};

export default AppRouter;

