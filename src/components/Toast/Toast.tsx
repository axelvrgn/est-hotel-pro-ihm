import { SmallCloseIcon } from "@chakra-ui/icons";
import { INFO } from "../../data/constants";
import ToastIcon from "./ToastIcon";

export type ToastState = "SUCCESS" | "ERROR" | "INFO";

type ToastProps = {
  content: string;
  state?: ToastState;
  duration?: number;
  onDismiss?: () => void;
};

const Toast = ({ content, state = INFO, onDismiss }: ToastProps) => {
  return (
    <div
      className="flex items-center w-full max-w-xl p-2 mb-2 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8">
        <ToastIcon state={state} />
      </div>
      <div className="mx-3 text-sm font-normal">{content}</div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-purple-600 rounded-lg focus:ring-2 focus:ring-gray-300 p-4 hover:bg-gray-100 inline-flex items-center justify-center h-4 w-4 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        aria-label="Close"
        onClick={onDismiss}
      >
        <SmallCloseIcon />
      </button>
    </div>
  );
};

export default Toast;
