import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/useAuth";

import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import Playlist from "../pages/Playlist";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { UIShowcase } from "../pages/UIShowcase";

const Placeholder = ({ title }: { title: string }) => (
  <section className="p-8">
    <h1 className="text-3xl font-bold">{title}</h1>
  </section>
);

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
        {/* Rutas con Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/detalle/:id" element={<Placeholder title="Detalle de canción" />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Placeholder title="Administración" />} />
          <Route path="/ui-showcase" element={<UIShowcase />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Rutas sin Layout */}
        {/* Con sesión abierta, login y registro llevan al inicio (Login lo resuelve adentro) */}
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

