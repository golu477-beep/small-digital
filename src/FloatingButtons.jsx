import React, { useState } from 'react';
import { FaWhatsapp, FaFacebookMessenger, FaPhone } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const FloatingButtons = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-5 right-5 flex flex-col gap-4 items-center z-50">
    
      <a
        href="https://wa.me/7070414390"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl bg-[#25D366] shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-200"
        title="WhatsApp"
      >
        <FaWhatsapp />
      </a>

      {/* Messenger Button */}
      <a
        href="https://m.me/username"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl bg-[#0084FF] shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-200"
        title="Messenger"
      >
        <FaFacebookMessenger />
      </a>

      <a
        href="tel:7070414390"
        className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl bg-[#FF5722] shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-200"
        title="Call"
      >
        <FaPhone />
      </a>

      <button
        onClick={() => setIsOpen(false)}
        className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl bg-[#FF0033] shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-200"
        title="Close"
      >
        <IoClose />
      </button>
    </div>
  );
};

export default FloatingButtons;