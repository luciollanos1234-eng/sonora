import { useState, useCallback } from "react";

import { Logo } from "../components/ui/Logo";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { IconButton } from "../components/ui/IconButton";
import { Modal } from "../components/ui/Modal";

import { useToast } from "../context/useToast";

export const UIShowcase = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  const { showToast } = useToast();

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <main className="
      min-h-screen bg-(--bg)
      text-(--text)
      px-6 py-12
      md:px-12
    ">

      <div className="max-w-7xl mx-auto">

        {/* ENCABEZADO */}

        <header className="mb-8">
          <Logo className="mb-8" />

          <h1 className="
            font-[family-name:var(--font-display)]
            text-2xl md:text-[32px]
            font-extrabold
            leading-[40px]
          ">
            Portadas ilustradas · 1:1
          </h1>

          <p className="
            mt-2 text-sm leading-5
            text-[var(--text-muted)]
          ">
            Ilustraciones propias para el catálogo y la portada
            de respaldo; las definitivas se cargan antes del deploy.
            Sin tapas comerciales ni fotos de artistas.
          </p>
        </header>

        {/* PORTADAS */}


        {/* COMPONENTES UI */}

        <section className="
          mt-16 pt-10
          border-t border-[var(--border)]
          space-y-8
        ">

          <h2 className="
            font-[var(--font-display)]
            text-2xl font-bold
          ">
            Componentes reutilizables
          </h2>

          {/* BUTTON */}

          <div className="space-y-4">
            <h3 className="font-semibold">
              Button
            </h3>

            <div className="flex flex-wrap gap-3">
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

              <Button disabled>
                Deshabilitado
              </Button>
            </div>
          </div>

          {/* ICON BUTTON */}

          <div className="space-y-4">
            <h3 className="font-semibold">
              IconButton
            </h3>

            <div className="flex gap-3">
              <IconButton aria-label="Reproducir">
                ▶
              </IconButton>

              <IconButton
                variant="outline"
                aria-label="Agregar"
              >
                +
              </IconButton>

              <IconButton
                variant="primary"
                aria-label="Eliminar"
              >
                ×
              </IconButton>
            </div>
          </div>

          {/* INPUT */}

          <div className="grid gap-6 md:grid-cols-2">
            <Input
              label="Correo electrónico"
              placeholder="tu@email.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              helperText="Ingresá tu correo electrónico."
            />

            <Input
              label="Campo con error"
              placeholder="Ingresá tu correo"
              error="El correo electrónico no es válido."
            />
          </div>

          {/* MODAL */}

          <div className="space-y-4">
            <h3 className="font-semibold">
              Modal y Toast
            </h3>

            <div className="flex flex-wrap gap-3">
              <Button onClick={() => setModalOpen(true)}>
                Abrir modal
              </Button>

              <Button
                variant="secondary"
                onClick={() => showToast("Canción agregada correctamente")}
              >
                Mostrar Toast
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  showToast("Primer aviso");
                  showToast("Segundo aviso");
                }}
              >
                Probar cola de avisos
              </Button>
            </div>
          </div>

        </section>
      </div>

      <Modal
        open={modalOpen}
        title="Confirmar acción"
        onClose={closeModal}
        onConfirm={() => {
          closeModal();
          showToast("Acción confirmada");
        }}
      >
        <p className="text-sm text-[var(--text-muted)]">
          ¿Estás seguro de que querés continuar?
        </p>
      </Modal>

    </main>
  );
};
