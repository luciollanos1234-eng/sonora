interface ToastProps {
  message: string;
}

export const Toast = ({ message }: ToastProps) => (
  <div
    role="status"
    aria-live="polite"
    className="
      fixed bottom-20 left-1/2 z-[100] md:bottom-32
      -translate-x-1/2
      flex items-center gap-3
      min-h-11 px-5 py-3
      rounded-xl border border-[var(--border)]
      bg-[var(--surface-3)]
      text-[var(--text)] text-sm font-medium
      shadow-xl
      animate-in fade-in slide-in-from-bottom-2
    "
  >
    <span
      aria-hidden="true"
      className="
        flex size-6 items-center justify-center
        rounded-full bg-[var(--primary)]
        text-[var(--text)]
      "
    >
      ✓
    </span>

    {message}
  </div>
);
