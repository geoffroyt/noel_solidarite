import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Heart, Gift, Users, TrendingUp } from 'lucide-react';

/**
 * Impact Dashboard Component
 * Design: Noël Chaleureux & Inclusif
 * - Real-time statistics
 * - Visual progress indicators
 * - Animated counters
 */

interface StatItem {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix: string;
  color: 'primary' | 'secondary' | 'accent';
}

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / duration;

      if (progress < 1) {
        setCount(Math.floor(target * progress));
        animationId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [target, duration]);

  return <span>{count.toLocaleString('fr-FR')}</span>;
}

function StatCard({ icon, label, value, suffix, color }: StatItem) {
  const bgClasses = {
    primary: 'bg-primary/10',
    secondary: 'bg-secondary/10',
    accent: 'bg-accent/10',
  };

  const iconColorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
  };

  return (
    <Card className="p-6 text-center hover:shadow-lg transition-shadow">
      <div className={`${bgClasses[color]} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4`}>
        <div className={iconColorClasses[color]}>{icon}</div>
      </div>
      <p className="text-4xl font-bold text-foreground mb-2">
        <AnimatedCounter target={value} />
        <span className="text-lg text-muted-foreground ml-1">{suffix}</span>
      </p>
      <p className="text-muted-foreground font-medium">{label}</p>
    </Card>
  );
}

export default function ImpactDashboard() {
  const stats: StatItem[] = [
    {
      icon: <Heart className="w-6 h-6" />,
      label: 'Dons reçus',
      value: 487,
      suffix: '',
      color: 'primary',
    },
    {
      icon: <Gift className="w-6 h-6" />,
      label: 'Cadeaux offerts',
      value: 342,
      suffix: '',
      color: 'secondary',
    },
    {
      icon: <Users className="w-6 h-6" />,
      label: 'Enfants aidés',
      value: 285,
      suffix: '',
      color: 'accent',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: 'Montant collecté',
      value: 48500,
      suffix: '€',
      color: 'primary',
    },
  ];

  const targetAmount = 100000;
  const currentAmount = 48500;
  const progressPercentage = (currentAmount / targetAmount) * 100;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            L'impact de votre générosité
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Suivez en temps réel comment vos dons transforment Noël pour les enfants défavorisés.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <StatCard key={idx} {...stat} />
          ))}
        </div>

        {/* Progress Bar */}
        <Card className="p-8 bg-white border-2 border-border">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold text-foreground">Objectif de collecte</h3>
              <span className="text-2xl font-bold text-primary">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-primary to-secondary h-full transition-all duration-1000 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-3 text-sm text-muted-foreground">
              <span>{currentAmount.toLocaleString('fr-FR')}€ collectés</span>
              <span>Objectif : {targetAmount.toLocaleString('fr-FR')}€</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Marseille</p>
              <p className="text-2xl font-bold text-primary">156</p>
              <p className="text-xs text-muted-foreground">enfants aidés</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Guadeloupe</p>
              <p className="text-2xl font-bold text-secondary">129</p>
              <p className="text-xs text-muted-foreground">enfants aidés</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Autres régions</p>
              <p className="text-2xl font-bold text-accent">0</p>
              <p className="text-xs text-muted-foreground">enfants aidés</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
