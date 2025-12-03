import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Briefcase, Users, TrendingUp } from 'lucide-react';
import { useLocation } from 'wouter';

/**
 * Engage Business Page
 * Design: Noël Chaleureux & Inclusif
 * Page pour les entreprises souhaitant s\'engager
 */

export default function EngageBusiness() {
  const [, setLocation] = useLocation();

  const options = [
    {
      icon: Briefcase,
      title: 'Faire un don collectif',
      description: 'Votre entreprise peut faire un don collectif pour soutenir notre campagne. Renforcez votre image de marque et votre engagement RSE.',
      features: [
        'Déduction fiscale pour l\'entreprise',
        'Visibilité et reconnaissance',
        'Rapport d\'impact détaillé',
        'Certificat de partenariat',
      ],
      action: 'Faire un don collectif',
      actionUrl: '/donate',
    },
    {
      icon: TrendingUp,
      title: 'Sponsoriser la campagne',
      description: 'Devenez sponsor principal de notre campagne Noël 2025. Bénéficiez d\'une visibilité maximale et d\'un partenariat stratégique.',
      features: [
        'Logo sur tous les supports',
        'Présence médiatique',
        'Événements de lancement',
        'Partenariat annuel',
      ],
      action: 'Devenir sponsor',
      actionUrl: '/contact',
    },
    {
      icon: Users,
      title: 'Mobiliser les salariés',
      description: 'Impliquez vos équipes dans notre mission. Organisez des événements de collecte, des journées de bénévolat ou des défis internes.',
      features: [
        'Renforcement de la cohésion',
        'Activités de team-building',
        'Engagement RSE renforcé',
        'Événements organisés',
      ],
      action: 'Mobiliser les équipes',
      actionUrl: '/contact',
    },
  ];

  const benefits = [
    {
      title: 'Renforcer votre RSE',
      description: 'Démontrez votre engagement envers la responsabilité sociale et environnementale.',
    },
    {
      title: 'Améliorer votre image',
      description: 'Renforcez votre réputation auprès des clients, partenaires et collaborateurs.',
    },
    {
      title: 'Mobiliser vos équipes',
      description: 'Créez une cohésion interne autour d\'une cause commune et significative.',
    },
    {
      title: 'Avantages fiscaux',
      description: 'Bénéficiez de déductions fiscales sur vos dons et contributions.',
    },
    {
      title: 'Impact mesurable',
      description: 'Recevez des rapports détaillés montrant l\'impact exact de votre contribution.',
    },
    {
      title: 'Partenariat durable',
      description: 'Établissez une relation à long terme avec une organisation de confiance.',
    },
  ];

  const cases = [
    {
      company: 'TechCorp',
      contribution: 'Sponsor principal 2024',
      impact: '200 enfants aidés',
      quote: 'Partenaire avec Noël de Solidarité a renforcé notre engagement RSE et créé une belle cohésion au sein de nos équipes.',
    },
    {
      company: 'RetailGroup',
      contribution: 'Don collectif + mobilisation salariés',
      impact: '150 enfants aidés',
      quote: 'Une expérience enrichissante qui a vraiment marqué nos collaborateurs et renforcé nos valeurs d\'entreprise.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
          <div className="container">
            <h1 className="text-5xl font-bold mb-4">Je suis une entreprise</h1>
            <p className="text-xl opacity-90">
              Mobilisez vos équipes et renforcez votre engagement RSE en participant à cette campagne solidaire.
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
                    <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-8 flex justify-center">
                      <Icon className="w-16 h-16 text-blue-600" />
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <h2 className="text-2xl font-bold text-foreground mb-3">{option.title}</h2>
                      <p className="text-muted-foreground mb-6">{option.description}</p>

                      {/* Features */}
                      <ul className="space-y-2 mb-8">
                        {option.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold mt-1">✓</span>
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Button */}
                      <Button
                        onClick={() => setLocation(option.actionUrl)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3"
                      >
                        {option.action}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Benefits Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-12 mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Avantages du Partenariat</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="bg-white rounded-lg p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Case Studies */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Nos Partenaires Témoignent</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {cases.map((caseStudy, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-8">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-foreground">{caseStudy.company}</h3>
                      <p className="text-sm text-muted-foreground">{caseStudy.contribution}</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 mb-4">
                      <p className="text-lg font-bold text-blue-600">{caseStudy.impact}</p>
                    </div>
                    <p className="text-muted-foreground italic">"{caseStudy.quote}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Comment Ça Fonctionne</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white font-bold text-lg">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Prenez Contact</h3>
                  <p className="text-muted-foreground">
                    Contactez-nous pour discuter de vos objectifs et de vos possibilités de partenariat.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white font-bold text-lg">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Définissez Votre Engagement</h3>
                  <p className="text-muted-foreground">
                    Ensemble, nous définissons le type de partenariat qui correspond à votre entreprise et vos valeurs.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white font-bold text-lg">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Lancez Votre Campagne</h3>
                  <p className="text-muted-foreground">
                    Nous vous aidons à lancer votre campagne auprès de vos équipes et partenaires.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white font-bold text-lg">
                    4
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Mesurez l\'Impact</h3>
                  <p className="text-muted-foreground">
                    Recevez des rapports détaillés montrant l\'impact exact de votre contribution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Prêt à Renforcer Votre RSE ?</h2>
            <p className="text-xl opacity-90 mb-8">
              Contactez-nous pour discuter de votre partenariat avec Noël de Solidarité
            </p>
            <Button
              onClick={() => setLocation('/contact')}
              className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-3 text-lg"
            >
              Nous Contacter
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
