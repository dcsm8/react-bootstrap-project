import React from "react";
import { Button } from "react-bootstrap";
import { ToastProvider, useToasts } from "./ToastManager";

const ToastDemo: React.FC = () => {
  const { addToast } = useToasts();

  return (
    <div>
      {["warning", "info", "success", "danger"].map((variant) => (
        <Button
          key={variant}
          variant={variant}
          className="me-2"
          onClick={() =>
            addToast(`This is a ${variant} message!`, variant as any)
          }
        >
          Show {variant} Toast
        </Button>
      ))}
    </div>
  );
};

function App() {
  return (
    <ToastProvider>
      <div className="m-4">
        <ToastDemo />
      </div>
    </ToastProvider>
  );
}

export default App;
