import {
  useCallback,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import { Toast } from "../components/ui/Toast";
import { ToastContext } from "./toast-context";

interface ToastItem {
  message: string;
}

interface ToastState {
  current: ToastItem | null;
  queue: ToastItem[];
}

type ToastAction =
  | { type: "enqueue"; toast: ToastItem }
  | { type: "dismiss" };

const initialState: ToastState = {
  current: null,
  queue: [],
};

const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
  if (action.type === "enqueue") {
    if (state.current === null) {
      return { ...state, current: action.toast };
    }

    return { ...state, queue: [...state.queue, action.toast] };
  }

  const [next, ...remaining] = state.queue;
  return { current: next ?? null, queue: remaining };
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const showToast = useCallback((message: string) => {
    dispatch({ type: "enqueue", toast: { message } });
  }, []);

  const current = state.current;

  useEffect(() => {
    if (current === null) return;

    const timer = setTimeout(() => {
      dispatch({ type: "dismiss" });
    }, 3000);

    return () => clearTimeout(timer);
  }, [current]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {current !== null && <Toast message={current.message} />}
    </ToastContext.Provider>
  );
};
