import React from 'react';

export default function ModalBase({ show, onClose, children }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-zinc-800 rounded-lg shadow-lg w-full max-w-lg p-6 relative text-white">
        <button onClick={onClose} className="absolute top-2 right-3 text-gray-400 hover:text-red-500 text-xl">
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
