import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, Building2, Handshake, ArrowRight } from 'lucide-react';

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
}

function ActionCard({ icon, title, description, actions, cta, color }: ActionCardProps) {
  const colorClasses = {
    primary: 'border-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10',
    secondary: 'border-secondary/20 hover:border-secondary/50 hover:shadow-lg hover:shadow-secondary/10',
    accent: 'border-accent/20 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10',
  };

  const buttonClasses = {
    primary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
    secondary: 'bg-secondary hover:bg-secondary/90 text-secondary-foreground',
    accent: 'bg-accent hover:bg-accent/90 text-accent-foreground',
  };

  return (
    <Card className={`p-8 border-2 transition-all duration-300 ${colorClasses[color]}`}>
      <div className="flex items-start gap-4 mb-6">
        <div className={`p-3 rounded-lg ${color === 'primary' ? 'bg-primary/10' : color === 'secondary' ? 'bg-secondary/10' : 'bg-accent/10'}`}>
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">{title}</h3>
        </div>
      </div>

      <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>

      <div className="space-y-2 mb-8">
        {actions.map((action, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <ArrowRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
            <span className="text-sm text-foreground">{action}</span>
          </div>
        ))}
      </div>

      <Button className={`w-full font-semibold ${buttonClasses[color]}`}>
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
      cta: 'Je contacte l\'équipe',
      color: 'secondary' as const,
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
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Qui peut agir ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
            />
          ))}
        </div>
      </div>
    </section>
  );
}
