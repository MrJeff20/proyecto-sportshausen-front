import React from 'react';
import { Mail, Phone, MapPin, Share2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-sportshausen-dark text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-sportshausen-red rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <h3 className="text-xl font-bold">SportsHausen</h3>
            </div>
            <p className="text-gray-400 text-sm">Por y para los deportes</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Navegación</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/" className="hover:text-sportshausen-gold">Inicio</a></li>
              <li><a href="#" className="hover:text-sportshausen-gold">Luchadores</a></li>
              <li><a href="#" className="hover:text-sportshausen-gold">Bookers</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-sportshausen-gold">Términos</a></li>
              <li><a href="#" className="hover:text-sportshausen-gold">Privacidad</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>hola@sportshausen.cl</li>
              <li>+56 9 XXXX XXXX</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2026 SportsHausen. Todos los derechos reservados.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-sportshausen-red transition-colors">
                <Share2 size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-sportshausen-red transition-colors">
                <Mail size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-sportshausen-red transition-colors">
                <Phone size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
