import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { useLocation } from 'wouter';

/**
 * Footer Component
 * Design: Noël Chaleureux & Inclusif
 * - Comprehensive contact and navigation information
 * - Social media links
 * - Legal and transparency information
 */

export default function Footer() {
  const [, setLocation] = useLocation();
  const currentYear = new Date().getFullYear();

  const links = {
    navigation: [
      { label: 'Accueil', href: '/' },
      { label: 'À propos', href: '/about' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Nous contacter', href: '/contact' },
    ],
    legal: [
      { label: 'Mentions légales', href: '#' },
      { label: 'Politique de confidentialité', href: '#' },
      { label: 'Conditions d\'utilisation', href: '#' },
    ],
  };

  const socials = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gradient-to-r from-red-700 to-red-900 text-white">
      {/* Main Footer Content */}
      <div className="container py-16 md:py-20">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-foreground font-bold text-lg">🎁</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Noël de Solidarité</h3>
                <p className="text-sm text-white/70">Marseille & Guadeloupe</p>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Ensemble, transformons Noël en moment de partage et d'espoir pour les enfants défavorisés.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-bold mb-4 text-white">Navigation</h4>
            <ul className="space-y-2">
              {links.navigation.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setLocation(link.href);
                    }}
                    className="text-white/80 hover:text-yellow-300 transition-colors text-sm cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-bold mb-4 text-white">Légal</h4>
            <ul className="space-y-2">
              {links.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/80 hover:text-yellow-300 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4 text-white">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-yellow-300" />
                <div className="text-sm text-white/80">
                  <p>Marseille, France</p>
                  <p>Guadeloupe</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 flex-shrink-0 text-yellow-300" />
                <a href="tel:+33123456789" className="text-sm text-white/80 hover:text-yellow-300 transition-colors">
                  +33 1 23 45 67 89
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0 text-yellow-300" />
                <a href="mailto:contact@noelsolidarite.fr" className="text-sm text-white/80 hover:text-yellow-300 transition-colors">
                  contact@noelsolidarite.fr
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8 mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <p className="text-sm text-white/80">
            © {currentYear} Noël de Solidarité. Tous droits réservés.
          </p>

          {/* Social Media */}
          <div className="flex items-center gap-6">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-white/80 hover:text-yellow-300 transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Transparency Badge */}
          <div className="text-xs text-white/80 text-center md:text-right">
            <p className="font-semibold text-yellow-300 mb-1">100% Transparent</p>
            <p>Chaque don est documenté et tracé</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
