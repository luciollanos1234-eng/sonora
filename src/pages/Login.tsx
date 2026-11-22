import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FiAlertCircle, FiChevronLeft } from "react-icons/fi";

import { Logo } from "../components/ui/Logo";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/useAuth";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const { login } = useAuth();
  const [loginError, setLoginError] = useState(false);

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
    }
  };

  const fieldClass = (hasError: boolean) => `
    flex items-center gap-3 min-h-11 px-4
    rounded-[var(--radius-control)] border bg-[var(--surface-2)]
    focus-within:border-[var(--primary-light)]
    ${hasError ? "border-[var(--danger)]" : "border-[var(--border)]"}
  `;

  const inputClass = `
    w-full min-w-0 bg-transparent outline-none text-sm text-[var(--text)]
    placeholder:text-[var(--text-muted)] focus-visible:outline-none
  `;

  return (
    <main className="relative min-h-screen bg-[var(--bg)] px-4 py-6 text-[var(--text)] bg-[radial-gradient(ellipse_at_top,color-mix(in_srgb,var(--primary)_28%,transparent),transparent_55%)]">
      <Link
        to="/"
        className="inline-flex items-center gap-1 rounded-[var(--radius-pill)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs font-semibold hover:bg-[var(--surface-2)] sm:ml-8"
      >
        <FiChevronLeft aria-hidden="true" />
        Volver al inicio
      </Link>

      <section className="mx-auto mt-8 w-full max-w-sm rounded-[var(--radius-modal)] border border-[var(--border)] bg-[var(--surface)] px-6 py-8 shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <Logo className="flex-col gap-2" />
          <h1 className="mt-5 font-[var(--font-display)] text-2xl font-extrabold">
            Iniciá sesión
          </h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Entrá para escuchar y armar tu playlist.
          </p>
        </div>

        {loginError && (
          <div
            role="alert"
            className="mt-6 flex gap-3 rounded-[var(--radius-control)] border border-[var(--danger)]/40 bg-[var(--danger)]/10 p-4 text-sm"
          >
            <FiAlertCircle aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--danger)]" />
            <div>
              <p className="font-semibold">No pudimos iniciar sesión</p>
              <p className="mt-1 text-[var(--text-muted)]">
                El email o la contraseña no coinciden. Revisalos y probá de nuevo.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <div className={fieldClass(loginError || !!errors.email)}>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="tu@email.com"
                aria-invalid={loginError || !!errors.email}
                className={inputClass}
                {...register("email", {
                  required: "Ingresá tu email",
                  pattern: { value: /^\S+@\S+\.\S+$/, message: "Ingresá un email válido" },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-[var(--danger)]">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-semibold">
              Contraseña
            </label>
            <div className={fieldClass(loginError || !!errors.password)}>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Tu contraseña"
                aria-invalid={loginError || !!errors.password}
                className={inputClass}
                {...register("password", { required: "Ingresá tu contraseña" })}
              />
            </div>
            {errors.password && (
              <p className="text-sm text-[var(--danger)]">{errors.password.message}</p>
            )}
          </div>

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
      </section>
    </main>
  );
};

export default Login;
