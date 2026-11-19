import { useEffect, useRef, type ReactNode } from "react";

interface ModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
}

export const Modal = ({
  open,
  title,
  children,
  onClose,
  onConfirm,
}: ModalProps) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previousFocus.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "Tab") {
        const modal = closeRef.current?.closest("[role='dialog']");
        const elements = modal?.querySelectorAll<HTMLElement>(
          'button:not(:disabled), input:not(:disabled), [tabindex="0"]'
        );

        if (!elements?.length) return;

        const first = elements[0];
        const last = elements[elements.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-50 flex items-center justify-center
        bg-black/70 p-4
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="sonora-modal-title"
        className="
          w-full max-w-lg rounded-[var(--radius-modal)]
          border border-[var(--border)]
          bg-[var(--surface)] p-6 shadow-2xl
        "
      >
        <header className="flex items-center justify-between gap-4 mb-6">
          <h2
            id="sonora-modal-title"
            className="font-[var(--font-display)] text-xl font-bold"
          >
            {title}
          </h2>

          <button
            ref={closeRef}
            type="button"
            aria-label="Cerrar ventana"
            onClick={onClose}
            className="
              size-11 rounded-full text-xl
              hover:bg-[var(--surface-3)]
              focus-visible:outline-2
              focus-visible:outline-[var(--focus-color)]
            "
          >
            ×
          </button>
        </header>

        <div className="mb-6">
          {children}
        </div>

        <footer className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="
              min-h-11 px-4 rounded-xl
              bg-[var(--surface-3)]
              text-[var(--text)] text-sm font-semibold
              focus-visible:outline-2
              focus-visible:outline-[var(--focus-color)]
            "
          >
            Cancelar
          </button>

          {onConfirm && (
            <button
              type="button"
              onClick={onConfirm}
              className="
                min-h-11 px-4 rounded-xl
                bg-[var(--primary)] text-[var(--text)]
                text-sm font-semibold
                focus-visible:outline-2
                focus-visible:outline-[var(--focus-color)]
              "
            >
              Confirmar
            </button>
          )}
        </footer>
      </section>
    </div>
  );
};
