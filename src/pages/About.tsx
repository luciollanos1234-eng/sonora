const About = () => {
  return (
    <section className="px-4 pb-10 pt-20 sm:px-8 lg:pt-8">
      <div className="relative flex min-h-40 flex-col justify-center overflow-hidden rounded-lg bg-[image:var(--gradient-button)] p-6 text-[var(--text)] sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="relative z-10 flex flex-col gap-2">
          <p className="text-sm font-semibold">Acerca de nosotros</p>
          <h2 className="mb-2 font-extrabold sm:text-3xl lg:text-5xl font-family-[var(--font-family-title)]">
            Quienes hacemos <span className="text-[var(--primary-text)]">Sonora</span>
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
    </section>
  );
};

export default About;
