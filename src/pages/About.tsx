import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import lioPhoto from "../assets/equipo/lio.jpg";
import facuPhoto from "../assets/equipo/facu.jpg";

const teamMembers = [
  {
    name: "Lionel Debortoli",
    role: "Scrum Master y Developer",
    tasks: "Coordinación del equipo y desarrollo de funcionalidades.",
    github: "lioneldebortoli",
    photo: lioPhoto,
  },
  {
    name: "Lucio Llanos",
    role: "Líder técnico y Developer",
    tasks: "Liderazgo técnico y desarrollo de la plataforma.",
    github: "luciollanos1234-eng",
  },
  {
    name: "Facundo Alvarez",
    role: "Developer",
    tasks: "Desarrollo de funcionalidades para la plataforma.",
    github: "facualvarez829-afk",
    photo: facuPhoto,
  },
];

const About = () => {
  return (
    <section className="px-4 pb-10 pt-20 sm:px-8 lg:pt-8">
      <div className="relative flex min-h-40 flex-col justify-center overflow-hidden rounded-lg bg-[image:var(--gradient-button)] p-6 text-[var(--text)] sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="relative z-10 flex flex-col gap-2">
          <p className="text-sm font-semibold">Acerca de nosotros</p>
          <h1 className="mb-2 text-2xl font-extrabold sm:text-3xl lg:text-5xl font-family-[var(--font-family-title)]">
            Quienes hacemos{" "}
            <span className="text-[var(--text)] underline decoration-[var(--primary-text)] decoration-4 underline-offset-8">Sonora</span>
          </h1>
          <div>
            <p className="max-w-xl text-left text-xs font-semibold sm:text-sm text-[var(--text)]">
              Sonora es una plataforma de música en línea que permite a los
              usuarios descubrir, escuchar y compartir canciones de diversos
              géneros. Nuestro objetivo es brindar una experiencia musical única
              y personalizada para cada usuario.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="font-extrabold sm:text-xl lg:text-xl ">El equipo</h2>
        <br />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <article
              key={member.github}
              className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xl"
            >
              <img
                className="h-20 w-20 rounded-full object-cover"
                src={member.photo ?? `https://github.com/${member.github}.png`}
                alt={`Avatar de ${member.name}`}
              />
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-extrabold">{member.name}</h3>
                <p className="text-sm font-bold text-[var(--focus-color)]">
                  {member.role}
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  {member.tasks}
                </p>
                <Link
                  className="chip m-2 flex min-h-11 w-fit items-center gap-2 rounded-full bg-[var(--surface-2)] px-3 py-1 text-xs font-semibold text-[var(--text)] transition hover:bg-[var(--surface-3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-color)]"
                  to={`https://github.com/${member.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub: {member.github}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <h3 className="font-bold text-lg flex">Con que lo hicimos</h3>
        <br />
        <div className="flex flex-wrap gap-2">
          <Link
            className="chip m-1 flex min-h-11 w-auto items-center gap-2 rounded-full bg-[var(--surface-2)] px-3 py-1 text-xs font-semibold text-[var(--text)] transition hover:bg-[var(--surface-3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-color)]"
            to="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </Link>
          <Link
            className="chip m-1 flex min-h-11 w-auto items-center gap-2 rounded-full bg-[var(--surface-2)] px-3 py-1 text-xs font-semibold text-[var(--text)] transition hover:bg-[var(--surface-3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-color)]"
            to="https://www.typescriptlang.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            TypeScript
          </Link>
          <Link
            className="chip m-1 flex min-h-11 w-auto items-center gap-2 rounded-full bg-[var(--surface-2)] px-3 py-1 text-xs font-semibold text-[var(--text)] transition hover:bg-[var(--surface-3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-color)]"
            to="https://tailwindcss.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tailwind CSS
          </Link>
          <Link
            className="chip m-1 flex min-h-11 w-auto items-center gap-2 rounded-full bg-[var(--surface-2)] px-3 py-1 text-xs font-semibold text-[var(--text)] transition hover:bg-[var(--surface-3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-color)]"
            to="https://vite.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite
          </Link>
          <Link
            className="chip m-1 flex min-h-11 w-auto items-center gap-2 rounded-full bg-[var(--surface-2)] px-3 py-1 text-xs font-semibold text-[var(--text)] transition hover:bg-[var(--surface-3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-color)]"
            to="https://reactrouter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Router
          </Link>
          <Link
            className="chip m-1 flex min-h-11 w-auto items-center gap-2 rounded-full bg-[var(--surface-2)] px-3 py-1 text-xs font-semibold text-[var(--text)] transition hover:bg-[var(--surface-3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-color)]"
            to="https://react.dev/learn/passing-data-deeply-with-context"
            target="_blank"
            rel="noopener noreferrer"
          >
            Context API
          </Link>
          <Link
            className="chip m-1 flex min-h-11 w-auto items-center gap-2 rounded-full bg-[var(--surface-2)] px-3 py-1 text-xs font-semibold text-[var(--text)] transition hover:bg-[var(--surface-3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-color)]"
            to="https://react-icons.github.io/react-icons/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Icons
          </Link>
          <Link
            className="chip m-1 flex min-h-11 w-auto items-center gap-2 rounded-full bg-[var(--surface-2)] px-3 py-1 text-xs font-semibold text-[var(--text)] transition hover:bg-[var(--surface-3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-color)]"
            to="https://react-hook-form.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Hook Form
          </Link>
          <Link
            className="chip m-1 flex min-h-11 w-auto items-center gap-2 rounded-full bg-[var(--surface-2)] px-3 py-1 text-xs font-semibold text-[var(--text)] transition hover:bg-[var(--surface-3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-color)]"
            to="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"
            target="_blank"
            rel="noopener noreferrer"
          >
            LocalStorage
          </Link>
          <p className="text-xs p-3 text-[var(--text-muted)]">
            Todo se guarda en el navegador con el LocalStorage, las portadas son
            ilustraciones propias.
          </p>
        </div>
      </div>
      <br />
      <div className="flex">
        <div className="m-2">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--surface-2)] px-6 py-3 text-sm font-semibold text-[var(--text)] transition-[var(--transition-duration)] hover:bg-[image:var(--gradient-button)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-color)]"
          >
            <FiSearch />
            Explorar el catálogo
          </Link>
        </div>
        <div className="m-2">
          <Link
            to="https://github.com/luciollanos1234-eng/sonora"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--surface-2)] px-6 py-3 text-sm font-semibold text-[var(--text)] transition-[var(--transition-duration)] hover:bg-[image:var(--gradient-button)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-color)]"
          >
            Ver el Repositorio
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
