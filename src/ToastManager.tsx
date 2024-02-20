import React, { createContext, useContext, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

interface ToastMessage {
  id: string;
  content: string;
  variant: "primary" | "success" | "danger" | "warning" | "info";
}

interface ToastContextType {
  addToast: (content: string, variant: ToastMessage["variant"]) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToasts = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToasts must be used within a ToastProvider");
  }
  return context;
};

// Function to determine the text color class based on variant
const getTextColorClass = (variant: ToastMessage["variant"]) => {
  if (variant === "warning" || variant === "info") {
    return "text-dark"; // Use Bootstrap's class for darker text
  }
  return "text-white"; // Default to white text for other variants
};

export const ToastProvider: React.FC = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (content: string, variant: ToastMessage["variant"]) => {
    const id = Math.random().toString(36).substr(2, 9); // Simple unique ID
    setToasts((prevToasts) => [...prevToasts, { id, content, variant }]);
  };

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer
        className="position-fixed top-0 end-0 p-3"
        style={{ zIndex: 11 }}
      >
        {toasts.map(({ id, content, variant }) => (
          <Toast
            key={id}
            onClose={() => removeToast(id)}
            delay={5000}
            autohide
            className={`align-items-center bg-${variant} border-0`}
            style={{ minWidth: "250px" }}
          >
            <div className={`d-flex ${getTextColorClass(variant)}`}>
              <Toast.Body className="flex-grow-1">{content}</Toast.Body>
              <button
                type="button"
                className={`btn-close ${
                  variant === "warning" || variant === "info"
                    ? "btn-close-black"
                    : "btn-close-white"
                } me-2 m-auto`}
                onClick={() => removeToast(id)}
                aria-label="Close"
              ></button>
            </div>
          </Toast>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};
