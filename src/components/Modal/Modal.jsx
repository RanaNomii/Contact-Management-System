// Modal.js
import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onRequestClose, contentLabel, children }) => {
  return (
    isOpen && (
      <div className="modal-overlay" onClick={onRequestClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="close-button" onClick={onRequestClose}>
          </span>
          {children}
        </div>
      </div>
    )
  );
};

export { Modal};
