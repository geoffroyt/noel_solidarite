import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

/**
 * Contact Page
 * Design: Noël Chaleureux & Inclusif
 * Page de contact pour les utilisateurs
 */

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'contact@noel-solidarite.fr',
      description: 'Nous répondons généralement en 24-48h',
    },
    {
      icon: Phone,
      title: 'Téléphone',
      value: '+33 (0)4 91 XX XX XX',
      description: 'Lundi-Vendredi, 9h-17h',
    },
    {
      icon: MapPin,
      title: 'Adresse',
      value: 'Marseille & Guadeloupe',
      description: 'Deux sites pour mieux vous servir',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-16">
          <div className="container">
            <h1 className="text-5xl font-bold mb-4">Nous Contacter</h1>
            <p className="text-xl opacity-90">
              Une question ? Un projet ? Nous sommes là pour vous aider
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="bg-white rounded-lg shadow-md p-8 text-center">
                    <Icon className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-foreground mb-2">{info.title}</h3>
                    <p className="text-lg font-semibold text-foreground mb-2">{info.value}</p>
                    <p className="text-sm text-muted-foreground">{info.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-md p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-foreground mb-8">Envoyez-nous un Message</h2>

              {submitted && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 text-green-700">
                  <p className="font-semibold">Merci ! Votre message a été envoyé avec succès.</p>
                  <p className="text-sm">Nous vous répondrons dès que possible.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                      Nom complet <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Votre nom"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="votre.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                      Téléphone
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+33 1 23 45 67 89"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-2">
                      Sujet <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-input rounded-md bg-white text-foreground"
                    >
                      <option value="">Sélectionner un sujet</option>
                      <option value="donation">Question sur un don</option>
                      <option value="partnership">Partenariat</option>
                      <option value="volunteer">Bénévolat</option>
                      <option value="feedback">Retour/Suggestion</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Votre message..."
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-input rounded-md bg-white text-foreground"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="consent"
                    required
                    className="w-4 h-4"
                  />
                  <label htmlFor="consent" className="text-sm text-muted-foreground">
                    J'accepte que mes données soient utilisées pour répondre à ma demande
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Envoyer le Message
                </Button>
              </form>
            </div>

            {/* FAQ Section */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Questions Fréquentes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-orange-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2">Quel est le délai de réponse ?</h3>
                  <p className="text-muted-foreground">
                    Nous nous efforçons de répondre à tous les messages dans les 24-48 heures. Les demandes urgentes 
                    sont traitées en priorité.
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2">Comment puis-je suivre mon don ?</h3>
                  <p className="text-muted-foreground">
                    Une fois votre don effectué, vous recevrez un email de confirmation avec un lien de suivi. 
                    Vous pouvez aussi consulter votre compte personnel.
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2">Puis-je annuler mon don ?</h3>
                  <p className="text-muted-foreground">
                    Pour les dons réguliers, vous pouvez annuler à tout moment sans frais. Contactez-nous pour 
                    les dons ponctuels.
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2">Avez-vous des bureaux physiques ?</h3>
                  <p className="text-muted-foreground">
                    Oui, nous avons des bureaux à Marseille et en Guadeloupe. Vous pouvez nous visiter sur 
                    rendez-vous.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section (Placeholder) */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Nos Locaux</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-xl font-bold text-foreground mb-4">🇫🇷 Marseille</h3>
                <p className="text-muted-foreground mb-4">
                  123 Rue de la Solidarité<br />
                  13000 Marseille<br />
                  France
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Horaires :</strong><br />
                  Lundi-Vendredi : 9h-17h<br />
                  Samedi : 10h-13h
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-xl font-bold text-foreground mb-4">🇬🇵 Guadeloupe</h3>
                <p className="text-muted-foreground mb-4">
                  456 Avenue de la Générosité<br />
                  97100 Basse-Terre<br />
                  Guadeloupe
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Horaires :</strong><br />
                  Lundi-Vendredi : 9h-17h<br />
                  Samedi : 10h-13h
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
