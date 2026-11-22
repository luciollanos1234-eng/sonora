import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Player from "../player/Player";


const Layout = () => {
  return (
    <div className="flex min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar />

      <div className="flex min-w-0 flex-1 flex-col">
        <main className="min-w-0 flex-1 pb-28">
          <Outlet />
        </main>

        <div className="fixed bottom-0 left-0 right-0 z-30 lg:left-64">
          <Player />
        </div>
      </div>
    </div>
  );
};

export default Layout;
