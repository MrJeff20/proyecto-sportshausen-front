import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

export const WelcomeModal = ({ userName, onClose, duration = 2500 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 md:p-12 max-w-md w-full text-center animate-fadeIn">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle size={48} className="text-green-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-sportshausen-dark mb-4">
          ¡Bienvenido!
        </h2>

        {/* Message */}
        <p className="text-lg md:text-xl text-gray-700 mb-2">
          <span className="font-semibold text-sportshausen-red">{userName}</span>
        </p>
        <p className="text-gray-600 text-base">
          a <span className="font-semibold text-sportshausen-red">SportsHausen</span>
        </p>

        {/* Loading indicator */}
        <div className="mt-8 flex justify-center gap-2">
          <div className="w-2 h-2 bg-sportshausen-red rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-sportshausen-red rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-sportshausen-red rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default WelcomeModal;
