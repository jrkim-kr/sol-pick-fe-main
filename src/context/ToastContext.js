import React, { createContext, useState, useContext } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    duration: 3000,
  });

  const showToast = (message, duration = 3000) => {
    setToast({
      visible: true,
      message,
      duration,
    });

    setTimeout(() => {
      setToast((prev) => ({
        ...prev,
        visible: false,
      }));
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ toast, showToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
