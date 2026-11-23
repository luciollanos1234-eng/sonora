const About = () => {
  return (
    <section className="px-4 pb-10 pt-20 sm:px-8 lg:pt-8">
      <div className="mx-auto max-w-3xl rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary-text)]">
          Acerca de nosotros
        </p>
        <h1 className="mt-2 text-3xl font-extrabold">Tu música, tu espacio</h1>
        <div className="mt-6 space-y-4 leading-relaxed text-[var(--text-muted)]">
          <p>
            Sonora es una aplicación web creada para explorar canciones, descubrir
            artistas y guardar una playlist propia.
          </p>
          <p>
            El proyecto funciona con datos locales y ofrece una experiencia
            responsiva en escritorio y dispositivos móviles.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
