import { useEffect, type ReactNode } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { useToast } from "../../context/useToast";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const sinPermiso = !!user && requireAdmin && user.role !== "admin";

  // El setTimeout con cleanup evita que el aviso salga dos veces en modo estricto
  useEffect(() => {
    if (!sinPermiso) return;

    const timer = setTimeout(() => {
      showToast("No tenés permiso para entrar ahí");
      navigate("/", { replace: true });
    }, 0);

    return () => clearTimeout(timer);
  }, [sinPermiso, showToast, navigate]);

  // Sin sesión va al login y guarda a dónde quería ir
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // Con sesión pero sin rol admin: el efecto de arriba avisa y lo manda al inicio
  if (sinPermiso) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
