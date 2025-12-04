import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, Building2, Handshake, ArrowRight } from 'lucide-react';
import { useLocation } from 'wouter';

/**
 * Action Segmentation Component
 * Design: Noël Chaleureux & Inclusif
 * - Three distinct user personas
 * - Clear action paths for each segment
 * - Warm, inclusive messaging
 */

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actions: string[];
  cta: string;
  color: 'primary' | 'secondary' | 'accent';
  href: string;
}

function ActionCard({ icon, title, description, actions, cta, color, href }: ActionCardProps) {
  const [, setLocation] = useLocation();
  const colorClasses = {
    primary: 'border-green-300 hover:border-green-500 hover:shadow-lg hover:shadow-green-200',
    secondary: 'border-blue-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-200',
    accent: 'border-purple-300 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-200',
  };

  const buttonClasses = {
    primary: 'bg-green-600 hover:bg-green-700 text-white',
    secondary: 'bg-blue-600 hover:bg-blue-700 text-white',
    accent: 'bg-purple-600 hover:bg-purple-700 text-white',
  };

  return (
    <Card className={`p-8 border-2 transition-all duration-300 ${colorClasses[color]}`}>
      <div className="flex items-start gap-4 mb-6">
        <div className={`p-3 rounded-lg ${color === 'primary' ? 'bg-green-100' : color === 'secondary' ? 'bg-blue-100' : 'bg-purple-100'}`}>
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>
      </div>

      <p className="text-gray-700 mb-6 leading-relaxed">{description}</p>

      <div className="space-y-2 mb-8">
        {actions.map((action, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <ArrowRight className={`w-4 h-4 ${color === 'primary' ? 'text-green-600' : color === 'secondary' ? 'text-blue-600' : 'text-purple-600'} mt-1 flex-shrink-0`} />
            <span className="text-sm text-gray-800">{action}</span>
          </div>
        ))}
      </div>

      <Button 
        onClick={() => setLocation(href)}
        className={`w-full font-semibold ${buttonClasses[color]}`}
      >
        {cta}
      </Button>
    </Card>
  );
}

export default function ActionSegmentation() {
  const segments = [
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: 'Je suis un particulier',
      description: 'Vous souhaitez agir contre le gaspillage et offrir Noël à un enfant ? Découvrez comment contribuer selon vos moyens.',
      actions: [
        'Donner de l\'argent',
        'Choisir un cadeau spécifique',
        'Parrainer un enfant',
      ],
      cta: 'Je m\'engage',
      color: 'primary' as const,
      href: '/engage-particulier',
    },
    {
      icon: <Building2 className="w-6 h-6 text-secondary" />,
      title: 'Je suis une entreprise',
      description: 'Mobilisez vos équipes et renforcez votre engagement RSE en participant à cette campagne solidaire.',
      actions: [
        'Faire un don collectif',
        'Sponsoriser la campagne',
        'Mobiliser les salariés',
      ],
      cta: 'Je contacte l\'\u00e9quipe',
      color: 'secondary' as const,
      href: '/engage-entreprise',
    },
    {
      icon: <Handshake className="w-6 h-6 text-accent" />,
      title: 'Je suis une association',
      description: 'Partenaires locaux à Marseille et Guadeloupe : enregistrez les enfants et recevez les cadeaux.',
      actions: [
        'Enregistrer les enfants',
        'Recevoir les cadeaux',
        'Rapporter les histoires',
      ],
      cta: 'Devenir partenaire',
      color: 'accent' as const,
      href: '/engage-association',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Qui peut agir ?
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Que vous soyez particulier, entreprise ou association, il existe un rôle pour vous dans cette campagne solidaire.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {segments.map((segment, idx) => (
            <ActionCard
              key={idx}
              icon={segment.icon}
              title={segment.title}
              description={segment.description}
              actions={segment.actions}
              cta={segment.cta}
              color={segment.color}
              href={segment.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
