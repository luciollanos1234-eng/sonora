import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { Button } from "../components/ui/Button";
import AuthCard from "../components/auth/AuthCard";
import FormAlert from "../components/auth/FormAlert";
import FormField from "../components/auth/FormField";
import { useAuth } from "../context/useAuth";
import { useToast } from "../context/useToast";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

const Register = () => {
  const { register: createAccount, emailExists } = useAuth();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm<RegisterForm>();

  const errorCount = Object.keys(errors).length;

  const onSubmit = (data: RegisterForm) => {
    const session = createAccount(data.name, data.email, data.password);

    if (!session) {
      setError("email", { message: "Ya hay una cuenta con este email." });
      return;
    }

    showToast(`¡Listo, ${session.name}! Ya creaste tu cuenta`);
  };

  return (
    <AuthCard title="Creá tu cuenta" subtitle="Gratis. Te sirve para guardar tu playlist.">
      {errorCount > 0 && (
        <FormAlert>
          {errorCount === 1
            ? "Revisá el campo marcado para crear tu cuenta."
            : `Revisá los ${errorCount} campos marcados para crear tu cuenta.`}
        </FormAlert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 flex flex-col gap-4">
        <FormField
          id="name"
          label="Nombre"
          placeholder="Cómo te llamás"
          autoComplete="name"
          error={errors.name?.message}
          registration={register("name", {
            validate: (value) => value.trim() !== "" || "Ingresá tu nombre.",
          })}
        />

        <FormField
          id="email"
          label="Email"
          type="email"
          placeholder="tu@email.com"
          autoComplete="email"
          error={errors.email?.message}
          registration={register("email", {
            required: "Ingresá tu email.",
            pattern: { value: /^\S+@\S+\.\S+$/, message: "Ingresá un email válido." },
            validate: (value) => !emailExists(value) || "Ya hay una cuenta con este email.",
          })}
        />

        <FormField
          id="password"
          label="Contraseña"
          type="password"
          placeholder="Mínimo 8 caracteres"
          autoComplete="new-password"
          helper="Mínimo 8 caracteres."
          error={errors.password?.message}
          registration={register("password", {
            required: "Ingresá una contraseña.",
            minLength: { value: 8, message: "Tiene que tener al menos 8 caracteres." },
          })}
        />

        <FormField
          id="confirm"
          label="Repetí la contraseña"
          type="password"
          placeholder="Repetí tu contraseña"
          autoComplete="new-password"
          error={errors.confirm?.message}
          registration={register("confirm", {
            required: "Repetí la contraseña.",
            validate: (value) => value === getValues("password") || "Las contraseñas no coinciden.",
          })}
        />

        <Button type="submit" className="mt-2 w-full rounded-[var(--radius-pill)]">
          Crear cuenta
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-[var(--text-muted)]">
        ¿Ya tenés cuenta?{" "}
        <Link to="/login" className="-my-3.5 inline-flex min-h-11 items-center font-semibold text-[var(--primary-text)] hover:underline">
          Iniciá sesión
        </Link>
      </p>
    </AuthCard>
  );
};

export default Register;
