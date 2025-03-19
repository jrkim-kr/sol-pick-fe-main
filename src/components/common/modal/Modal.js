import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import modalBar from "../../../assets/modalBar.svg";
import "./Modal.css";

const Modal = ({ isOpen, onClose, title, children, height }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          <motion.div
            className="modal-container"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.5 }}
            style={{ height }}
          >
            <div className="bar-container" onClick={onClose}>
              <img src={modalBar} alt="Modal Bar" width="32" height="4" />
            </div>

            {title && <h1 className="modal-title bold">{title}</h1>}

            <div className="modal-content">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
