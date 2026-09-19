import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
      
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-teal-400">SmallDigital web</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Hum aapke business ko digital grow karne me madad karte hain. Behtareen services aur 24/7 support.
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">LinkedIn</a>
            <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Instagram</a>
          </div>
        </div>

      
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-teal-400 transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">Services</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">Contact</a></li>
          </ul>
        </div>

       
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">Refund Policy</a></li>
          </ul>
        </div>

     
        <div className="space-y-2 text-sm">
          <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
          <p><span className="font-medium text-gray-200">Email:</span> SmallDigital@company.com</p>
          <p><span className="font-medium text-gray-200">Phone:</span> +91 98765 43210</p>
          <p><span className="font-medium text-gray-200">Location:</span> Patna, mohali, India</p>
        </div>

      </div>
      
    </footer>
  );
};

export default Footer;