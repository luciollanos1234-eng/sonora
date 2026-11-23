
import { useCallback, useState } from "react";

import { Logo } from "../components/ui/Logo";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { IconButton } from "../components/ui/IconButton";
import { Modal } from "../components/ui/Modal";

import { useToast } from "../context/useToast";

import "../styles/ui-showcase.css";

const colors = [
  { name: "--bg", value: "var(--bg)", description: "Fondo" },
  { name: "--surface", value: "var(--surface)", description: "Sidebar, cards, player" },
  { name: "--surface-2", value: "var(--surface-2)", description: "Inputs, card activa" },
  { name: "--surface-3", value: "var(--surface-3)", description: "Botones suaves, etiquetas" },
  { name: "--border", value: "var(--border)", description: "Bordes" },
  { name: "--text", value: "var(--text)", description: "Texto principal" },
  { name: "--text-muted", value: "var(--text-muted)", description: "Texto secundario" },
  { name: "--primary", value: "var(--primary)", description: "Botones" },
  { name: "--primary-light", value: "var(--primary-light)", description: "Borde de canción sonando" },
  { name: "--primary-text", value: "var(--primary-text)", description: "Links y estados activos" },
  { name: "--glow", value: "var(--glow)", description: "Final del progreso" },
  { name: "--danger", value: "var(--danger)", description: "Eliminar y errores" },
];

const genres = [
  "Todos",
  "Rock",
  "Rock nacional",
  "Pop",
  "Electrónica",
  "Jazz",
  "Punk",
  "Folklore",
];

export const UIShowcase = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Electrónica");

  const { showToast } = useToast();

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <main className="ui-showcase min-h-screen bg-(--bg) text-(--text)">
      <div className="ui-showcase__container">

        {/* ENCABEZADO */}
        <header className="ui-showcase__header">
          <Logo />

          <span className="ui-showcase__header-note">
            Diseño y estilo · valores de variables.css
          </span>
        </header>

        {/* PALETA Y TIPOGRAFÍA */}
        <section className="ui-showcase__top-grid">

          <div>
            <h2 className="ui-showcase__eyebrow">Paleta</h2>

            <div className="ui-showcase__palette">
              {colors.map((color) => (
                <div className="ui-showcase__color" key={color.name}>
                  <div
                    className="ui-showcase__swatch"
                    style={{ backgroundColor: color.value }}
                  />

                  <div className="ui-showcase__color-info">
                    <strong>{color.name}</strong>
                    <span>{color.description}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="ui-showcase__gradients">
              <div>
                <div className="ui-showcase__gradient ui-showcase__gradient--button" />
                <span>Botón · gradient-button</span>
              </div>

              <div>
                <div className="ui-showcase__gradient ui-showcase__gradient--progress" />
                <span>Progreso · gradient-progress</span>
              </div>
            </div>

            <p className="ui-showcase__palette-note">
              Los colores, fondos, bordes y estados se obtienen de las
              variables globales del proyecto.
            </p>
          </div>

          <div>
            <h2 className="ui-showcase__eyebrow">Tipografía</h2>

            <div className="ui-showcase__typography">
              <div className="ui-showcase__type-row">
                <span className="ui-showcase__display">Display</span>
                <small>Plus Jakarta Sans · 800</small>
              </div>

              <div className="ui-showcase__type-row">
                <h1>Título H1</h1>
                <small>Plus Jakarta Sans · 800</small>
              </div>

              <div className="ui-showcase__type-row">
                <h2>Título H2</h2>
                <small>Plus Jakarta Sans · 700</small>
              </div>

              <div className="ui-showcase__type-row">
                <strong>Nombre de canción</strong>
                <small>Plus Jakarta Sans · 700</small>
              </div>

              <div className="ui-showcase__type-row">
                <p>Texto de párrafo</p>
                <small>Inter · 400</small>
              </div>

              <div className="ui-showcase__type-row">
                <p className="ui-showcase__muted">Texto secundario</p>
                <small>Inter · 400</small>
              </div>

              <div className="ui-showcase__type-row">
                <span className="ui-showcase__label">ETIQUETA</span>
                <small>Inter · 600</small>
              </div>
            </div>
          </div>
        </section>

        {/* BOTONES, FILTROS E INPUTS */}
        <section className="ui-showcase__middle-grid">

          <div className="ui-showcase__controls">
            <h2 className="ui-showcase__eyebrow">
              Botones, filtros y campos
            </h2>

            <div className="ui-showcase__button-group">
              <Button variant="primary">▶ Reproducir</Button>
              <Button variant="secondary">Cancelar</Button>
              <Button variant="outline">＋ Agregar</Button>
              <Button variant="added">En Mi Playlist</Button>
              <Button variant="danger">Eliminar</Button>
              <Button variant="danger-outline">♜ Eliminar</Button>
              <Button disabled>Deshabilitado</Button>
            </div>

            <div className="ui-showcase__button-group">
              <IconButton aria-label="Reproducir">▶</IconButton>
              <IconButton variant="outline" aria-label="Agregar">＋</IconButton>
              <IconButton variant="primary" aria-label="Cerrar">×</IconButton>
              <IconButton variant="outline" aria-label="Eliminar">♜</IconButton>
            </div>

            <div className="ui-showcase__filters" aria-label="Filtros de género">
              {genres.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  className={`ui-showcase__filter ${
                    selectedGenre === genre ? "is-active" : ""
                  }`}
                  aria-pressed={selectedGenre === genre}
                  onClick={() => setSelectedGenre(genre)}
                >
                  {selectedGenre === genre && <span>✓ </span>}
                  {genre}
                </button>
              ))}
            </div>

            <div className="ui-showcase__inputs">
              <Input
                label="Campo"
                placeholder="tu@email.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                helperText="Ingresá tu correo electrónico."
              />

              <Input
                label="Campo con error"
                placeholder="Ingresá tu correo"
                type="email"
                error="Poné un correo electrónico válido."
              />
            </div>

            <div className="ui-showcase__actions">
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

          {/* CARDS DE EJEMPLO */}
          <div className="ui-showcase__songs">
            <h2 className="ui-showcase__eyebrow">Card de canción</h2>

            <div className="ui-showcase__song-grid">

              <article className="ui-showcase__song-card">
                <div className="ui-showcase__cover ui-showcase__cover--mountain">
                  <span className="ui-showcase__sun" />
                  <span className="ui-showcase__mountain mountain-one" />
                  <span className="ui-showcase__mountain mountain-two" />
                  <IconButton aria-label="Reproducir De Música Ligera">
                    ▶
                  </IconButton>
                </div>

                <strong>De Música Ligera</strong>
                <span>Soda Stereo</span>

                <Button variant="outline">＋ Agregar</Button>
                <small>Normal</small>
              </article>

              <article className="ui-showcase__song-card is-playing">
                <div className="ui-showcase__cover ui-showcase__cover--sunset">
                  <span className="ui-showcase__sunset-sun" />
                  <span className="ui-showcase__sunset-grid" />
                  <span className="ui-showcase__playing-label">▮▮ Sonando</span>
                  <IconButton variant="primary" aria-label="Pausar Blinding Lights">
                    Ⅱ
                  </IconButton>
                </div>

                <strong>Blinding Lights</strong>
                <span>The Weeknd</span>

                <Button variant="added">En Mi Playlist</Button>
                <small>Sonando + en Mi Playlist</small>
              </article>

              <article className="ui-showcase__song-card">
                <div className="ui-showcase__cover ui-showcase__cover--moon">
                  <span className="ui-showcase__moon" />
                  <span className="ui-showcase__star star-one" />
                  <span className="ui-showcase__star star-two" />
                  <IconButton variant="primary" aria-label="Reproducir Strobe">
                    ▶
                  </IconButton>
                </div>

                <strong>Strobe</strong>
                <span>deadmau5</span>

                <Button variant="added">En Mi Playlist</Button>
                <small>En Mi Playlist</small>
              </article>

            </div>
          </div>
        </section>

        {/* REPRODUCTOR */}
        <section className="ui-showcase__player-section">
          <h2 className="ui-showcase__eyebrow">Reproductor</h2>

          <div className="ui-showcase__player">
            <div className="ui-showcase__player-cover">
              <span />
            </div>

            <div className="ui-showcase__player-song">
              <strong>Blinding Lights</strong>
              <span>The Weeknd</span>
            </div>

            <div className="ui-showcase__player-controls">
              <IconButton aria-label="Canción anterior">|◀</IconButton>
              <IconButton variant="primary" aria-label="Pausar">Ⅱ</IconButton>
              <IconButton aria-label="Canción siguiente">▶|</IconButton>
            </div>

            <div className="ui-showcase__progress">
              <span>1:24</span>
              <div className="ui-showcase__progress-track">
                <div />
              </div>
              <span>3:20</span>
            </div>

            <div className="ui-showcase__volume">
              <span aria-hidden="true">◖))</span>
              <div />
            </div>
          </div>
        </section>
      </div>

      {/* MODAL */}
      <Modal
        open={modalOpen}
        title="Confirmar acción"
        onClose={closeModal}
        onConfirm={() => {
          closeModal();
          showToast("Acción confirmada");
        }}
      >
        <p className="text-sm text-(--text-muted)">
          ¿Estás seguro de que querés continuar?
        </p>
      </Modal>
    </main>
  );
};
