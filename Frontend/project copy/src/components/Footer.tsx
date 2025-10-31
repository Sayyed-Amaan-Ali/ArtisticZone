import React from 'react';
import { Link } from 'react-router-dom';
import { Palette, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Palette className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-amber-400 bg-clip-text text-transparent">
                Artistic Zone
              </span>
            </Link>
            <p className="text-stone-300 mb-6 max-w-md leading-relaxed">
              Empowering creative minds to achieve their dreams. We provide comprehensive coaching for NIFT, NID, UCEED, NATA, and fine arts with personalized mentorship and proven results.
            </p>
            <div className="flex space-x-4">
              {[
                { Icon: Facebook, href: '#', color: 'hover:text-blue-400' },
                { Icon: Instagram, href: '#', color: 'hover:text-pink-400' },
                { Icon: Twitter, href: '#', color: 'hover:text-blue-400' },
                { Icon: Youtube, href: '#', color: 'hover:text-red-400' }
              ].map(({ Icon, href, color }) => (
                <a
                  key={Icon.name}
                  href={href}
                  className={`p-3 bg-stone-800 rounded-lg transition-all duration-300 hover:scale-110 ${color}`}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'All Courses', path: '/courses' },
                { name: 'Contact', path: '/contact' },
                { name: 'Join Now', path: '/signup' }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-stone-300 hover:text-amber-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-amber-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-amber-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-stone-300">
                    123 Creative Street, Art District<br />
                    New Delhi, India - 110001
                  </p>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-amber-400 flex-shrink-0" />
                <a href="tel:+919876543210" className="text-stone-300 hover:text-amber-400 transition-colors duration-300">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-amber-400 flex-shrink-0" />
                <a href="mailto:info@artisticzone.com" className="text-stone-300 hover:text-amber-400 transition-colors duration-300">
                  info@artisticzone.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-stone-400 text-sm mb-4 md:mb-0">
            © 2025 Artistic Zone. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <Link to="/terms" className="text-stone-400 hover:text-amber-400 transition-colors duration-300">
              Terms & Conditions
            </Link>
            <Link to="/privacy" className="text-stone-400 hover:text-amber-400 transition-colors duration-300">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;