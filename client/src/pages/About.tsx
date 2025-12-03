import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Heart, Users, Target, Award } from 'lucide-react';

/**
 * About Page
 * Design: Noël Chaleureux & Inclusif
 * Présente la mission et les valeurs de Noël de Solidarité
 */

export default function About() {
  const values = [
    {
      icon: Heart,
      title: 'Solidarité',
      description: 'Nous croyons en la force de l\'entraide et de la communauté pour créer un changement positif.',
    },
    {
      icon: Users,
      title: 'Inclusivité',
      description: 'Chacun a un rôle à jouer. Particuliers, entreprises et associations, ensemble nous faisons la différence.',
    },
    {
      icon: Target,
      title: 'Impact',
      description: 'Chaque don, chaque geste compte. Nous mesurons et partageons l\'impact réel de votre engagement.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Nous nous engageons à offrir des services de qualité et à gérer vos dons avec transparence.',
    },
  ];

  const team = [
    {
      name: 'Marie Dupont',
      role: 'Directrice Générale',
      bio: 'Passionnée par l\'action sociale depuis 15 ans, elle pilote la vision de Noël de Solidarité.',
    },
    {
      name: 'Jean Martin',
      role: 'Responsable Partenariats',
      bio: 'Il construit les relations avec les entreprises et associations pour amplifier notre impact.',
    },
    {
      name: 'Sophie Bernard',
      role: 'Coordinatrice Terrain',
      bio: 'Elle assure que chaque cadeau atteint les enfants qui en ont le plus besoin.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
          <div className="container">
            <h1 className="text-5xl font-bold mb-4">Qui sommes-nous ?</h1>
            <p className="text-xl opacity-90">
              Noël de Solidarité : Donner du sens à la générosité
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="container max-w-4xl">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">Notre Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Noël de Solidarité est une initiative née de la conviction que chaque enfant mérite de vivre la magie de Noël, 
                indépendamment de sa situation économique. Nous connectons la générosité des particuliers, des entreprises et des 
                associations pour offrir des cadeaux et des moments de joie aux enfants en difficulté.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Basée à Marseille et en Guadeloupe, notre organisation travaille toute l'année pour identifier les enfants qui ont 
                besoin de soutien et créer des expériences inoubliables pour Noël.
              </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-500 mb-2">500+</div>
                <p className="text-muted-foreground">Enfants aidés en 2024</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-500 mb-2">150+</div>
                <p className="text-muted-foreground">Donateurs engagés</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-500 mb-2">30+</div>
                <p className="text-muted-foreground">Partenaires associatifs</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-orange-50">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Nos Valeurs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <Icon className="w-8 h-8 text-orange-500 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                        <p className="text-muted-foreground">{value.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Notre Équipe</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                    <Users className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                  <p className="text-orange-500 font-semibold mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className="py-16 bg-blue-50">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-8">Notre Histoire</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-xl font-bold text-foreground mb-2">2022 - La Naissance</h3>
                <p className="text-muted-foreground">
                  Noël de Solidarité a été créée par un groupe de bénévoles passionnés qui ont observé que de nombreux enfants 
                  n'avaient pas accès aux joies simples de Noël. L'idée était simple : créer un pont entre ceux qui veulent donner 
                  et ceux qui ont besoin de recevoir.
                </p>
              </div>
              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-xl font-bold text-foreground mb-2">2023 - L'Expansion</h3>
                <p className="text-muted-foreground">
                  Grâce à l'engagement de nos partenaires, nous avons pu étendre nos opérations en Guadeloupe et doubler le nombre 
                  d'enfants aidés. Notre première campagne "Noël pour Tous" a été un succès remarquable.
                </p>
              </div>
              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-xl font-bold text-foreground mb-2">2024 - L'Engagement Continu</h3>
                <p className="text-muted-foreground">
                  Cette année, nous avons renforcé nos partenariats avec les entreprises et les associations locales. Nous avons 
                  également développé une plateforme numérique pour faciliter les dons et le suivi de l'impact.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <div className="container max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Rejoignez Notre Mission</h2>
            <p className="text-xl opacity-90 mb-8">
              Ensemble, nous pouvons offrir la magie de Noël à chaque enfant
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/engage-particulier" className="bg-white text-orange-500 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                Je suis un particulier
              </a>
              <a href="/engage-entreprise" className="border-2 border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
                Je suis une entreprise
              </a>
              <a href="/engage-association" className="border-2 border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
                Je suis une association
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
