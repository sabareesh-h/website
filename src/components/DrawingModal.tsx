import React from 'react';
import { X } from 'lucide-react';

interface DrawingModalProps {
  imageUrl: string;
  onClose: () => void;
}

export function DrawingModal({ imageUrl, onClose }: DrawingModalProps) {
  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[100] flex items-center justify-center" onClick={onClose}>
      <div className="relative max-w-screen max-h-screen">
        <img src={imageUrl} alt="Full screen drawing" className="max-w-full max-h-full" />
        <button onClick={onClose} className="absolute top-4 right-4 text-white">
          <X size={32} />
        </button>
      </div>
    </div>
  );
}