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
    <section className="relative bg-gradient-to-br from-white via-orange-50 to-white overflow-hidden py-16 md:py-24">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-200/10 rounded-full blur-3xl -z-10"></div>

      <div className="container grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="flex flex-col gap-6 z-10">
          <div className="space-y-4">
            <div className="inline-block bg-orange-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">
              ⏰ {daysUntilChristmas} jours avant Noël
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-red-800 leading-tight">
              Offrez Noël à un enfant défavorisé
            </h1>

            <p className="text-lg text-gray-700 leading-relaxed">
              Marseille et Guadeloupe - Novembre-Décembre 2025. Ensemble, transformons la période de Noël en moment de partage et d'espoir pour les enfants vivant en situation de précarité.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-base"
            >
              <Heart className="w-5 h-5 mr-2" />
              Faire un don maintenant
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-red-600 text-red-600 hover:bg-red-50"
            >
              <Gift className="w-5 h-5 mr-2" />
              Parrainer un enfant
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap gap-6 pt-6 border-t border-orange-200">
            <div>
              <p className="text-2xl font-bold text-red-700">100%</p>
              <p className="text-sm text-gray-600">Transparent</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-700">500+</p>
              <p className="text-sm text-gray-600">Enfants aidés</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-700">2 régions</p>
              <p className="text-sm text-gray-600">Marseille & Guadeloupe</p>
            </div>
          </div>
        </div>

        {/* Right Visual - Placeholder for image */}
        <div className="relative h-96 md:h-full min-h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-orange-200 to-red-200 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
          <div className="text-center z-10">
            <Gift className="w-24 h-24 text-red-600 mx-auto mb-4" />
            <p className="text-gray-700 font-semibold">Image d'impact à venir</p>
          </div>
        </div>
      </div>
    </section>
  );
}
