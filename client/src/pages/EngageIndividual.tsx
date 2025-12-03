import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Heart, Gift, Users } from 'lucide-react';
import { useLocation } from 'wouter';

/**
 * Engage Individual Page
 * Design: Noël Chaleureux & Inclusif
 * Page pour les particuliers souhaitant s\'engager
 */

export default function EngageIndividual() {
  const [, setLocation] = useLocation();

  const options = [
    {
      icon: Heart,
      title: 'Donner de l\'argent',
      description: 'Contribuez financièrement à notre campagne. Chaque euro compte et bénéficie d\'une réduction d\'impôt de 66%.',
      features: [
        'Don ponctuel ou régulier',
        'Réduction d\'impôt garantie',
        'Suivi de l\'impact',
        'Reçu fiscal',
      ],
      action: 'Faire un don',
      actionUrl: '/donate',
    },
    {
      icon: Gift,
      title: 'Choisir un cadeau spécifique',
      description: 'Sélectionnez un cadeau dans notre catalogue et offrez-le directement à un enfant qui en a besoin.',
      features: [
        'Catalogue varié',
        'Cadeaux neufs de qualité',
        'Livraison garantie',
        'Confirmation de réception',
      ],
      action: 'Choisir un cadeau',
      actionUrl: '/select-gift',
    },
    {
      icon: Users,
      title: 'Parrainer un enfant',
      description: 'Établissez une connexion durable en parrainant un enfant pour l\'année. Recevez des mises à jour régulières.',
      features: [
        'Engagement annuel',
        'Mises à jour personnalisées',
        'Impact mesurable',
        'Relation durable',
      ],
      action: 'Devenir parrain',
      actionUrl: '/sponsor-child',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-16">
          <div className="container">
            <h1 className="text-5xl font-bold mb-4">Je suis un particulier</h1>
            <p className="text-xl opacity-90">
              Vous souhaitez agir contre le gaspillage et offrir Noël à un enfant ? Découvrez comment contribuer selon vos moyens.
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
                    <div className="bg-gradient-to-br from-orange-100 to-red-100 p-8 flex justify-center">
                      <Icon className="w-16 h-16 text-orange-500" />
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <h2 className="text-2xl font-bold text-foreground mb-3">{option.title}</h2>
                      <p className="text-muted-foreground mb-6">{option.description}</p>

                      {/* Features */}
                      <ul className="space-y-2 mb-8">
                        {option.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-orange-500 font-bold mt-1">✓</span>
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Button */}
                      <Button
                        onClick={() => setLocation(option.actionUrl)}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3"
                      >
                        {option.action}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Why Engage Section */}
            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-12">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Pourquoi s\'engager avec nous ?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Impact Réel</h3>
                  <p className="text-muted-foreground">
                    Chaque don a un impact direct et mesurable. Nous vous tenons informé de la façon dont votre contribution 
                    change la vie des enfants.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Transparence Totale</h3>
                  <p className="text-muted-foreground">
                    Nous croyons en la transparence. Vous pouvez voir exactement où va votre argent et comment il est utilisé.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Avantages Fiscaux</h3>
                  <p className="text-muted-foreground">
                    Bénéficiez d\'une réduction d\'impôt de 66% sur vos dons. C\'est une façon intelligente de contribuer tout en 
                    optimisant vos impôts.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Communauté Engagée</h3>
                  <p className="text-muted-foreground">
                    Rejoignez une communauté de personnes partageant les mêmes idées qui croient en la solidarité et l\'action 
                    collective.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Témoignages de Donateurs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-orange-50 rounded-lg p-6">
                <p className="text-muted-foreground mb-4 italic">
                  "Faire un don à Noël de Solidarité m\'a permis de contribuer à une cause importante tout en bénéficiant 
                  d\'une réduction d\'impôt. C\'est gagnant-gagnant !"
                </p>
                <p className="font-bold text-foreground">- Anne, Marseille</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-6">
                <p className="text-muted-foreground mb-4 italic">
                  "J\'ai parrainé un enfant et c\'était une expérience incroyable. Recevoir des mises à jour sur son 
                  parcours m\'a vraiment touchée."
                </p>
                <p className="font-bold text-foreground">- Marc, Guadeloupe</p>
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
                  Combien de temps faut-il pour que mon don soit utilisé ?
                  <span className="text-orange-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-muted-foreground mt-4">
                  Nous traitons les dons rapidement. La plupart sont utilisés dans les 2-3 semaines suivant leur réception.
                </p>
              </details>
              <details className="bg-white rounded-lg p-6 cursor-pointer group">
                <summary className="font-bold text-foreground flex items-center justify-between">
                  Puis-je annuler mon don régulier ?
                  <span className="text-orange-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-muted-foreground mt-4">
                  Bien sûr ! Vous pouvez annuler votre don régulier à tout moment sans frais supplémentaires. Il suffit de 
                  nous contacter.
                </p>
              </details>
              <details className="bg-white rounded-lg p-6 cursor-pointer group">
                <summary className="font-bold text-foreground flex items-center justify-between">
                  Comment puis-je suivre l\'impact de mon don ?
                  <span className="text-orange-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-muted-foreground mt-4">
                  Vous recevrez des mises à jour régulières par email. Vous pouvez également vous connecter à votre compte 
                  pour voir l\'impact en temps réel.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <div className="container max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Prêt à faire la différence ?</h2>
            <p className="text-xl opacity-90 mb-8">
              Choisissez votre façon de contribuer et rejoignez notre mission
            </p>
            <Button
              onClick={() => setLocation('/donate')}
              className="bg-white text-orange-500 hover:bg-gray-100 font-bold px-8 py-3 text-lg"
            >
              Commencer Maintenant
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
