import { Button } from "../components/ui/Button";

export const UIShowcase = () => {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6 md:p-12">

      <header className="mb-12">
        <h1 className="font-[var(--font-display)] text-3xl font-bold">
          SONORA UI Kit
        </h1>

        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Componentes reutilizables y estados visuales.
        </p>
      </header>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">
          Button · Variantes
        </h2>

        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary">
            Reproducir
          </Button>

          <Button variant="secondary">
            Cancelar
          </Button>

          <Button variant="outline">
            + Agregar
          </Button>

          <Button variant="added">
            En Mi Playlist
          </Button>

          <Button variant="danger">
            Eliminar
          </Button>

          <Button variant="danger-outline">
            Eliminar
          </Button>
        </div>
      </section>

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-semibold">
          Button · Estados
        </h2>

        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary">
            Normal
          </Button>

          <Button variant="primary" disabled>
            Deshabilitado
          </Button>

          <Button
            variant="primary"
            onClick={() => alert("Botón funcionando")}
          >
            Probar evento
          </Button>
        </div>

        <p className="text-sm text-[var(--text-muted)]">
          Utilizá Tab para recorrer los botones y comprobar
          el indicador de foco.
        </p>
      </section>

    </main>
  );
};
