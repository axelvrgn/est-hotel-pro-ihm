import {
  createContext,
  useCallback,
  useContext,
  useState,
  PropsWithChildren,
  useRef,
  ComponentProps,
} from "react";
import Toast from "../components/Toast/Toast";

type Params = ComponentProps<typeof Toast> & { duration?: number };
type ToastItem = ComponentProps<typeof Toast> & { id: number };

let toastId = 0;

const defaultPush = (_toast: Params) => {
  //it's intentional
};

const defaultValue = {
  pushToastRef: { current: defaultPush },
};

const ToastContext = createContext(defaultValue);

export const ToastContextProvider = ({ children }: PropsWithChildren) => {
  const pushToastRef = useRef(defaultPush);
  return (
    <ToastContext.Provider value={{ pushToastRef }}>
      <Toasts />
      {children}
    </ToastContext.Provider>
  );
};

export const useToasts = () => {
  const { pushToastRef } = useContext(ToastContext);
  return {
    pushToast: useCallback(
      (toast: Params) => {
        pushToastRef.current(toast);
      },
      [pushToastRef]
    ),
  };
};

const Toasts = () => {
  const [toasts, setToasts] = useState([] as ToastItem[]);
  const { pushToastRef } = useContext(ToastContext);
  pushToastRef.current = ({ duration, ...props }: Params) => {
    const id = toastId++;
    const toast = { ...props, id };
    setToasts((v) => [...v, toast]);
    setTimeout(() => {
      setToasts((v) => v.filter((t) => t !== toast));
    }, (duration ?? 6) * 1000);
  };
  const onRemove = (toast: ToastItem) => {
    const newToasts = toasts.filter((t) => t.id !== toast.id);
    setToasts(newToasts);
  };

  return (
    <div
      className="absolute flex flex-col top-14 right-0 px-2 w-90"
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        top: "14px",
        right: "0",
        width: "300px",
      }}
    >
      {toasts.map((toast) => (
        <Toast {...toast} key={toast.id} onDismiss={() => onRemove(toast)} />
      ))}
    </div>
  );
};
