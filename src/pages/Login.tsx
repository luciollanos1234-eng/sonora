import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation } from "react-router-dom";
import { FiAlertCircle, FiChevronLeft, FiEye, FiEyeOff } from "react-icons/fi";

import { Button } from "../components/ui/Button";
import AuthCard from "../components/auth/AuthCard";
import FormAlert from "../components/auth/FormAlert";
import FormField from "../components/auth/FormField";
import { useAuth } from "../context/useAuth";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const { user, login } = useAuth();
  const location = useLocation();
  // ProtectedRoute guarda en el state la página que se quería ver
  const from = (location.state as { from?: string } | null)?.from;
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [justLoggedIn, setJustLoggedIn] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    const session = login(data.email, data.password);

    if (!session) {
      // Un solo aviso: no decimos si falló el email o la contraseña
      setLoginError(true);
      setValue("password", "");
      return;
    }

    setJustLoggedIn(true);
  };

  // Si recién ingresó vuelve a la página que quería ver; si no, admin al panel y el resto al inicio
  if (user) {
    let destino = "/";

    if (justLoggedIn && from) {
      destino = from;
    } else if (justLoggedIn && user.role === "admin") {
      destino = "/admin";
    }

    return <Navigate to={destino} replace />;
  }

  return (
    <AuthCard title="Iniciá sesión" subtitle="Entrá para escuchar y armar tu playlist.">
      {loginError && (
        <FormAlert title="No pudimos iniciar sesión">
          El email o la contraseña no coinciden. Revisalos y probá de nuevo.
        </FormAlert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 flex flex-col gap-4">
        <FormField
          id="email"
          label="Email"
          type="email"
          placeholder="tu@email.com"
          autoComplete="email"
          invalid={loginError}
          error={errors.email?.message}
          registration={register("email", {
            required: "Ingresá tu email",
            pattern: { value: /^\S+@\S+\.\S+$/, message: "Ingresá un email válido" },
          })}
        />

        <FormField
          id="password"
          label="Contraseña"
          type="password"
          placeholder="Tu contraseña"
          autoComplete="current-password"
          invalid={loginError}
          error={errors.password?.message}
          registration={register("password", { required: "Ingresá tu contraseña" })}
        />

        <Button type="submit" className="mt-2 w-full rounded-[var(--radius-pill)]">
          Ingresar
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-[var(--text-muted)]">
        ¿No tenés cuenta?{" "}
        <Link to="/registro" className="font-semibold text-[var(--primary-text)] hover:underline">
          Registrate
        </Link>
      </p>
    </AuthCard>
  );
};

export default Login;
