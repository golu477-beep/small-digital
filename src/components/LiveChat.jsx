import React from 'react';

export default function LiveChat() {

  const phoneNumber = "917070414390"; 
  const defaultMessage = encodeURIComponent("Hi Small Digital! I have an inquiry regarding your services.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 z-50 flex items-center justify-center group"
    >
      <svg
        className="w-7 h-7 fill-current"
        viewBox="0 0 24 24"
      >
        <path d="M12.031 2c-5.514 0-9.996 4.477-9.996 9.988 0 1.761.459 3.479 1.33 4.996l-1.413 5.163 5.285-1.385c1.455.794 3.103 1.214 4.794 1.214 5.515 0 9.997-4.478 9.997-9.988 0-5.512-4.482-9.988-9.997-9.988zm0 18.313c-1.547 0-3.051-.413-4.37-1.197l-.313-.186-3.251.851.867-3.168-.205-.328c-.867-1.388-1.326-2.997-1.326-4.646 0-4.59 3.733-8.322 8.327-8.322 4.592 0 8.326 3.732 8.326 8.322 0 4.59-3.734 8.324-8.327 8.324z" />
      </svg>
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-medium ml-0 group-hover:ml-2 text-sm">
        Chat with us
      </span>
    </a>
  );
}