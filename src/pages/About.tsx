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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
