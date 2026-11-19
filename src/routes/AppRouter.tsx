
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Playlist from "../pages/Playlist";
import About from "../pages/About";
import { UIShowcase } from "../pages/UIShowcase";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/ui-showcase" element={<UIShowcase />} />

      <Route path="/playlist" element={<Playlist />} />
      <Route path="/about" element={<About />} />

      <Route
        path="*"
        element={
          <main className="flex min-h-screen items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold">404</h1>
              <p>La página que buscás no existe.</p>
            </div>
          </main>
        }
      />
    </Routes>
  );
};

export default AppRouter;
