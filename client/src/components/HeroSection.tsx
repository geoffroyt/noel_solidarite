import { Button } from '@/components/ui/button';
import { Gift, Heart } from 'lucide-react';

/**
 * Hero Section Component
 * Design: Noël Chaleureux & Inclusif
 * - Warm color palette with emotional imagery
 * - Clear call-to-action
 * - Countdown timer and impact messaging
 */

export default function HeroSection() {
  const daysUntilChristmas = Math.ceil(
    (new Date(2025, 11, 25).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <section className="relative bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden py-16 md:py-24">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10"></div>

      <div className="container grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="flex flex-col gap-6 z-10">
          <div className="space-y-4">
            <div className="inline-block bg-secondary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold">
              ⏰ {daysUntilChristmas} jours avant Noël
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Offrez Noël à un enfant défavorisé
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Marseille et Guadeloupe - Novembre-Décembre 2025. Ensemble, transformons la période de Noël en moment de partage et d'espoir pour les enfants vivant en situation de précarité.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              size="lg"
              href="/donate" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base"
            >
              <Heart className="w-5 h-5 mr-2" />
              Faire un don maintenant
            </a>
            <a
              size="lg"
              role="button"
              href="/parrainer" className="border-2 border-primary text-primary hover:bg-primary/5"
            >
              <Gift className="w-5 h-5 mr-2" />
              Parrainer un enfant
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap gap-6 pt-6 border-t border-border">
            <div>
              <p className="text-2xl font-bold text-primary">100%</p>
              <p className="text-sm text-muted-foreground">Transparent</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">500+</p>
              <p className="text-sm text-muted-foreground">Enfants aidés</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">2 régions</p>
              <p className="text-sm text-muted-foreground">Marseille & Guadeloupe</p>
            </div>
          </div>
        </div>

        {/* Right Visual - Image d'impact */}
        <div className="relative h-96 md:h-full min-h-96 rounded-2xl overflow-hidden shadow-xl">
          <img
            src="/hero-impact.jpg"
            alt="Noël de la Solidarité - Image d'impact"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      </div>
    </section>
  );
}
