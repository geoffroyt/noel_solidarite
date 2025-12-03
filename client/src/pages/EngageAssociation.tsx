import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Users, CheckCircle, FileText } from 'lucide-react';
import { useLocation } from 'wouter';

/**
 * Engage Association Page
 * Design: Noël Chaleureux & Inclusif
 * Page pour les associations souhaitant s\'engager
 */

export default function EngageAssociation() {
  const [, setLocation] = useLocation();

  const options = [
    {
      icon: FileText,
      title: 'Enregistrer les enfants',
      description: 'Identifiez et enregistrez les enfants de votre structure qui bénéficieront de notre aide. Nous collectons les informations nécessaires de manière sécurisée.',
      features: [
        'Plateforme sécurisée',
        'Formulaires simples',
        'Support technique',
        'Confidentialité garantie',
      ],
      action: 'Accéder à la plateforme',
      actionUrl: '/contact',
    },
    {
      icon: Users,
      title: 'Recevoir les cadeaux',
      description: 'Recevez les cadeaux directement dans votre structure. Nous nous chargeons de la logistique et de la coordination.',
      features: [
        'Livraison organisée',
        'Cadeaux adaptés',
        'Calendrier flexible',
        'Support logistique',
      ],
      action: 'Planifier la livraison',
      actionUrl: '/contact',
    },
    {
      icon: CheckCircle,
      title: 'Rapporter les histoires',
      description: 'Partagez les histoires et les témoignages des enfants aidés. Cela nous aide à mesurer l\'impact et à inspirer d\'autres donateurs.',
      features: [
        'Formulaires de feedback',
        'Photos et vidéos',
        'Témoignages',
        'Rapports d\'impact',
      ],
      action: 'Soumettre un témoignage',
      actionUrl: '/contact',
    },
  ];

  const requirements = [
    'Être une association reconnue d\'utilité publique ou d\'intérêt général',
    'Être basée à Marseille ou en Guadeloupe',
    'Accompagner des enfants en situation de précarité',
    'Accepter nos conditions de partenariat',
    'Participer au suivi et à la mesure d\'impact',
  ];

  const process = [
    {
      step: 1,
      title: 'Candidature',
      description: 'Soumettez votre candidature en ligne avec les informations de votre association.',
    },
    {
      step: 2,
      title: 'Évaluation',
      description: 'Notre équipe examine votre candidature et vous contacte pour discuter du partenariat.',
    },
    {
      step: 3,
      title: 'Signature',
      description: 'Signez l\'accord de partenariat et accédez à notre plateforme.',
    },
    {
      step: 4,
      title: 'Enregistrement',
      description: 'Enregistrez les enfants et coordonnez la livraison des cadeaux.',
    },
    {
      step: 5,
      title: 'Distribution',
      description: 'Distribuez les cadeaux et collectez les retours d\'impact.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
          <div className="container">
            <h1 className="text-5xl font-bold mb-4">Je suis une association</h1>
            <p className="text-xl opacity-90">
              Partenaires locaux à Marseille et Guadeloupe : enregistrez les enfants et recevez les cadeaux.
            </p>
          </div>
        </section>

        {/* Options Section */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {options.map((option, index) => {
                const Icon = option.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                  >
                    {/* Icon Background */}
                    <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-8 flex justify-center">
                      <Icon className="w-16 h-16 text-purple-600" />
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <h2 className="text-2xl font-bold text-foreground mb-3">{option.title}</h2>
                      <p className="text-muted-foreground mb-6">{option.description}</p>

                      {/* Features */}
                      <ul className="space-y-2 mb-8">
                        {option.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-purple-600 font-bold mt-1">✓</span>
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Button */}
                      <Button
                        onClick={() => setLocation(option.actionUrl)}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3"
                      >
                        {option.action}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Requirements Section */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-12 mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Conditions de Partenariat</h2>
              <ul className="space-y-4">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground text-lg">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Process Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Processus de Partenariat</h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {process.map((item, index) => (
                  <div key={index} className="relative">
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                      <div className="w-12 h-12 mx-auto mb-4 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {item.step}
                      </div>
                      <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    {index < process.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-purple-300"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Support Section */}
            <div className="bg-white rounded-lg shadow-md p-12">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Support et Ressources</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-foreground mb-3">Documentation</h3>
                  <p className="text-muted-foreground mb-4">
                    Accédez à nos guides complets et tutoriels pour utiliser la plateforme.
                  </p>
                  <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50">
                    Voir la documentation
                  </Button>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-foreground mb-3">Support Technique</h3>
                  <p className="text-muted-foreground mb-4">
                    Notre équipe technique est disponible pour vous aider en cas de problème.
                  </p>
                  <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50">
                    Contacter le support
                  </Button>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-foreground mb-3">Webinaires</h3>
                  <p className="text-muted-foreground mb-4">
                    Participez à nos webinaires de formation pour maximiser votre utilisation.
                  </p>
                  <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50">
                    S\'inscrire
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Questions Fréquentes</h2>
            <div className="space-y-4">
              <details className="bg-white rounded-lg p-6 cursor-pointer group">
                <summary className="font-bold text-foreground flex items-center justify-between">
                  Combien de temps prend le processus de candidature ?
                  <span className="text-purple-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-muted-foreground mt-4">
                  Généralement, le processus prend 2-3 semaines. Nous examinons votre candidature et vous contactons rapidement.
                </p>
              </details>
              <details className="bg-white rounded-lg p-6 cursor-pointer group">
                <summary className="font-bold text-foreground flex items-center justify-between">
                  Pouvons-nous enregistrer les enfants tout au long de l\'année ?
                  <span className="text-purple-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-muted-foreground mt-4">
                  Oui, vous pouvez enregistrer les enfants à tout moment. Cependant, nous recommandons de le faire avant septembre 
                  pour la campagne Noël.
                </p>
              </details>
              <details className="bg-white rounded-lg p-6 cursor-pointer group">
                <summary className="font-bold text-foreground flex items-center justify-between">
                  Y a-t-il des frais pour devenir partenaire ?
                  <span className="text-purple-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-muted-foreground mt-4">
                  Non, il n\'y a aucun frais pour devenir partenaire. Notre service est entièrement gratuit pour les associations.
                </p>
              </details>
              <details className="bg-white rounded-lg p-6 cursor-pointer group">
                <summary className="font-bold text-foreground flex items-center justify-between">
                  Comment sont sélectionnés les cadeaux pour les enfants ?
                  <span className="text-purple-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-muted-foreground mt-4">
                  Vous nous fournissez les informations sur les enfants (âge, intérêts, besoins). Nous sélectionnons des cadeaux 
                  adaptés et vous les livrons.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div className="container max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Prêt à Devenir Partenaire ?</h2>
            <p className="text-xl opacity-90 mb-8">
              Rejoignez notre réseau de partenaires et aidez les enfants en difficulté
            </p>
            <Button
              onClick={() => setLocation('/contact')}
              className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-3 text-lg"
            >
              Postuler Maintenant
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
