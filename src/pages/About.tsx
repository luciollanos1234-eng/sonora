

const About = () => {
  return (
    <section className="px-4 pb-10 pt-20 sm:px-8 lg:pt-8">
     <div className="relative flex min-h-40 flex-col justify-center overflow-hidden rounded-lg bg-[image:var(--gradient-button)] p-6 text-[var(--text)] sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="relative z-10">
            <p>Acerca de nosotros</p>
            <h2 className="mb-2 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
              Tu música. Tu espacio. Tu ritmo.
            </h2>

            <p className="text-base sm:text-lg">
              Buscá tu música favorita en nuestro catálogo
            </p>
          </div>

          {/* En celular el disco queda de fondo, atrás del texto */}
          <div className="absolute -bottom-4 -right-4 flex items-center gap-2 opacity-40 sm:static sm:gap-4 sm:opacity-100">
          
          </div>
        </div>
    </section>
  );
};

export default About;
