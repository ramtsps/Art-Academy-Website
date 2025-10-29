import { Palette, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps = { onNavigate: undefined }) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Palette className="w-8 h-8 text-purple-400" />
              <span className="text-xl">Primiya's Art</span>
            </div>
            <p className="text-gray-400">
              Inspiring young minds through art education since 2015
            </p>
          </div>

          <div>
            <h3 className="mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button 
                  onClick={() => onNavigate?.('home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate?.('about')}
                  className="hover:text-white transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate?.('products')}
                  className="hover:text-white transition-colors"
                >
                  Classes
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate?.('locations')}
                  className="hover:text-white transition-colors"
                >
                  Locations
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate?.('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4">Programs</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Painting</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Drawing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sculpture</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Digital Art</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4">Connect With Us</h3>
            <div className="flex gap-4 mb-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <p className="text-gray-400">
              contact@primiyasart.com<br />
              (206) 555-0100
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Primiya's Art. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
