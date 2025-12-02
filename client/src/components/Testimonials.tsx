import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

/**
 * Testimonials Component
 * Design: Noël Chaleureux & Inclusif
 * - Authentic stories from beneficiaries
 * - Emotional connection with donors
 * - Real impact demonstration
 */

interface Testimonial {
  name: string;
  age: number;
  location: 'Marseille' | 'Guadeloupe';
  story: string;
  wish: string;
  image?: string;
}

function TestimonialCard({ name, age, location, story, wish }: Testimonial) {
  return (
    <Card className="p-8 bg-white border-2 border-border hover:shadow-lg transition-all duration-300">
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
        ))}
      </div>

      {/* Story */}
      <p className="text-foreground mb-6 leading-relaxed italic">
        "{story}"
      </p>

      {/* Wish */}
      <div className="bg-secondary/10 border-l-4 border-secondary p-4 mb-6 rounded">
        <p className="text-sm text-muted-foreground mb-1">Son souhait pour Noël :</p>
        <p className="text-foreground font-semibold">{wish}</p>
      </div>

      {/* Author Info */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div>
          <p className="font-bold text-foreground">{name}</p>
          <p className="text-sm text-muted-foreground">{age} ans • {location}</p>
        </div>
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
          {name.charAt(0)}
        </div>
      </div>
    </Card>
  );
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      name: 'Amira',
      age: 8,
      location: 'Marseille',
      story: 'Noël est ma période préférée de l\'année. J\'aime voir les lumières et les décorations partout. Cette année, je rêve de pouvoir célébrer comme tous les autres enfants.',
      wish: 'Un jeu de construction et des livres d\'aventure',
    },
    {
      name: 'Liam',
      age: 10,
      location: 'Guadeloupe',
      story: 'Je suis passionné par le sport et les jeux vidéo. Mes parents font de leur mieux, mais c\'est difficile cette année. Votre aide signifierait beaucoup pour moi.',
      wish: 'Un ballon de football et une console de jeux',
    },
    {
      name: 'Sophie',
      age: 7,
      location: 'Marseille',
      story: 'J\'adore lire et créer des histoires. Chaque livre me transporte dans un monde magique. J\'aimerais avoir plus de livres pour ma collection.',
      wish: 'Une série de livres et des fournitures de dessin',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Histoires d'enfants
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez les rêves et les souhaits des enfants que vous aidez. Chaque don transforme une vie.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <TestimonialCard key={idx} {...testimonial} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Vous voulez lire d'autres histoires ?
          </p>
          <a
            href="#"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Découvrir tous les enfants
          </a>
        </div>
      </div>
    </section>
  );
}
