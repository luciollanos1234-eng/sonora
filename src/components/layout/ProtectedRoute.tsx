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

  useEffect(() => {
    if (!sinPermiso) return;

    const timer = setTimeout(() => {
      showToast("No tenés permiso para entrar ahí");
      navigate("/", { replace: true });
    }, 0);

    return () => clearTimeout(timer);
  }, [sinPermiso, showToast, navigate]);

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (sinPermiso) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
