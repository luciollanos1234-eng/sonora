import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
  type ReactNode,
} from "react";

import { Toast } from "../components/ui/Toast";

interface ToastItem {
  id: number;
  message: string;
}

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [queue, setQueue] = useState<ToastItem[]>([]);
  const [current, setCurrent] = useState<ToastItem | null>(null);
  const idRef = useRef(0);

const showToast = useCallback((message: string) => {
  const id = ++idRef.current;

  setQueue((items) => [...items, { id, message }]);
}, []);

  useEffect(() => {
    if (!current && queue.length > 0) {
      setCurrent(queue[0]);
      setQueue((items) => items.slice(1));
    }
  }, [current, queue]);

  useEffect(() => {
    if (!current) return;

    const timer = setTimeout(() => {
      setCurrent(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [current]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {current && <Toast message={current.message} />}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast debe utilizarse dentro de ToastProvider");
  }

  return context;
};
