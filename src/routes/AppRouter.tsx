
import { Routes, Route } from "react-router";

import { Home } from "../pages/Home";
import { UIShowcase } from "../pages/UIShowcase";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Página de pruebas */}
      <Route
        path="/ui-showcase"
        element={<UIShowcase />}
      />

      {/* Aquí conservamos las demás rutas del proyecto */}
    </Routes>
  );
};
