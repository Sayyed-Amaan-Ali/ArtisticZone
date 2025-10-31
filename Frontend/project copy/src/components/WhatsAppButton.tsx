import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappNumber = "919876543210";
  const message = "Hi! I'm interested in learning more about Artistic Zone coaching programs. Can you help me?";
  
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
    }`}>
      {/* Tooltip */}
      <div className={`absolute bottom-16 right-0 mb-2 transition-all duration-300 ${
        showTooltip ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2 pointer-events-none'
      }`}>
        <div className="bg-white rounded-lg shadow-lg border border-stone-200 p-3 min-w-48">
          <div className="flex items-start space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <MessageCircle className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-stone-800">Need help?</p>
              <p className="text-xs text-stone-600">Chat with us on WhatsApp!</p>
            </div>
            <button 
              onClick={() => setShowTooltip(false)}
              className="text-stone-400 hover:text-stone-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="absolute bottom-0 right-4 transform translate-y-full">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-pulse"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Ripple Effect */}
      <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
    </div>
  );
};

export default WhatsAppButton;