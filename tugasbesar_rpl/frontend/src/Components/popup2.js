// src/Components/popup.js
import React from 'react';
import '../css/popup2.css'; // pastikan import CSS di sini

function Popup({ title, message, onClose }) {
  return (
    <div className="popup-wrap transform-in">
      <div className="popup-box">
        <a className="close-btn" onClick={onClose} href="#">×</a>
        <h2>{title}</h2>
        <h3>{message}</h3>
      </div>
    </div>
  );
}

export default Popup;
