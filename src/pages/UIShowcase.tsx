
import { Button } from "../components/ui/Button";

export const UIShowcase = () => {
  return (
    <section>
      <h2>Botones SONORA</h2>

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

      <Button variant="primary" disabled>
        Deshabilitado
      </Button>
    </section>
  );
};
