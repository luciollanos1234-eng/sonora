import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="px-4 pb-10 pt-20 sm:px-8 lg:pt-8">
      <div className="relative flex min-h-40 flex-col justify-center overflow-hidden rounded-lg bg-[image:var(--gradient-button)] p-6 text-[var(--text)] sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="relative z-10 flex flex-col gap-2">
          <p className="text-sm font-semibold">Acerca de nosotros</p>
          <h2 className="mb-2 font-extrabold sm:text-3xl lg:text-5xl font-family-[var(--font-family-title)]">
            Quienes hacemos{" "}
            <span className="text-[var(--primary-text)]">Sonora</span>
          </h2>
          <div>
            <p className="max-w-xl text-left text-xs font-semibold sm:text-sm">
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
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-4 lg:flex-row lg:gap-4">
          <div className="card w-96 bg-[var(--surface)] shadow-xl flex flex-col gap-4 rounded-lg border border-[var(--border)]">
            <div className="card-body">
              <span className="avatar">
                <img
                  className="avatar-img rounded-full h-20 m-5"
                  src="https://github.com/lioneldebortoli.png"
                  alt="avatar de Lionel Debortoli"
                />
              </span>
              <div className="flex flex-col gap-1 m-5">
                <h3 className="font-extrabold text-xl ">Lionel Debortoli</h3>
                <p className="text-xs font-bold text-[var(--primary-light)]">
                  Scrum Master y Desarrollador
                </p>
                <p className="text-sm text-[var(--primary-text)]">
                  (que hizo en el proyecto)
                </p>
                <span className="chip flex items-center gap-2 rounded-full bg-[var(--surface-2)] px-3 py-1 m-1 h-10 w-auto text-xs font-semibold text-[var(--text)]  transition hover:bg-[var(--surface-3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-color)]">
                  <img
                    src="https://github.com/lioneldebortoli.png"
                    className="chip-img h-5 rounded-full"
                    alt="github avatar"
                  />
                  <Link
                    to="https://github.com/lioneldebortoli"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub: lioneldebortoli
                  </Link>
                </span>
              </div>
            </div>
          </div>
          <div className="card w-96 bg-[var(--surface)] shadow-xl flex flex-col gap-4 rounded-lg border border-[var(--border)]">
            <div className="card-body">
              <span className="avatar">
                <img
                  className="avatar-img rounded-full h-20 m-5"
                  src="https://github.com/luciollanos1234-eng.png"
                  alt="avatar de Lucio llanos"
                />
              </span>
              <div className="flex flex-col gap-1 m-5">
                <h3 className="font-extrabold text-xl ">Lucio Llanos</h3>
                <p className="text-xs font-bold text-[var(--primary-light)]">
                  Lider tecnico y Desarrollador
                </p>
                <p className="text-sm text-[var(--primary-text)]">
                  (que hizo en el proyecto)
                </p>

                <span className="chip flex items-center gap-2 rounded-full bg-[var(--surface-2)] px-3 py-1 m-1 h-10 w-auto text-xs font-semibold text-[var(--text)]  transition hover:bg-[var(--surface-3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-color)]">
                  <img
                    src="https://github.com/luciollanos1234-eng.png"
                    className="chip-img h-5 rounded-full"
                    alt="github avatar"
                  />
                  <Link
                    to="https://github.com/luciollanos1234-eng"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub: luciollanos1234-eng
                  </Link>
                </span>
              </div>
            </div>
          </div>
          <div className="card w-96 bg-[var(--surface)] shadow-xl flex flex-col gap-4 rounded-lg border border-[var(--border)]">
            <div className="card-body">
              <span className="avatar">
                <img
                  className="avatar-img rounded-full h-20 m-5"
                  src="https://github.com/facualvarez829-afk.png"
                  alt="avatar de Facundo"
                />
              </span>
              <div className="flex flex-col gap-1 m-5">
                <h3 className="font-extrabold text-xl ">Facundo Alvarez</h3>
                <p className="text-xs font-bold text-[var(--primary-light)]">
                  Desarrollador
                </p>
                <p className="text-sm text-[var(--primary-text)]">
                  (que hizo en el proyecto)
                </p>
                <span className="chip flex items-center gap-2 rounded-full bg-[var(--surface-2)] px-3 py-1 m-1 h-10 w-auto text-xs font-semibold text-[var(--text)]  transition hover:bg-[var(--surface-3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-color)]">
                  <img
                    src="https://github.com/facualvarez829-afk.png"
                    className="chip-img h-5 rounded-full"
                    alt="github avatar"
                  />
                  <Link
                    to="https://github.com/facualvarez829-afk"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub: facualvarez829-afk
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
