import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, User, ArrowRight } from 'lucide-react';

/**
 * News Page
 * Design: Noël Chaleureux & Inclusif
 * Affiche les actualités et les mises à jour de la campagne
 */

export default function News() {
  const articles = [
    {
      id: 1,
      title: 'Noël 2024 : 500 enfants aidés grâce à votre générosité',
      excerpt: 'Nous sommes fiers d\'annoncer que cette année, grâce à votre soutien, nous avons pu offrir des cadeaux à 500 enfants en difficulté à Marseille et en Guadeloupe.',
      date: '15 décembre 2024',
      author: 'Marie Dupont',
      category: 'Campagne',
      image: '🎁',
    },
    {
      id: 2,
      title: 'Nouveau partenariat avec TechCorp pour l\'année 2025',
      excerpt: 'Nous sommes heureux d\'accueillir TechCorp comme nouveau partenaire principal. Ensemble, nous allons amplifier notre impact et atteindre encore plus d\'enfants.',
      date: '10 décembre 2024',
      author: 'Jean Martin',
      category: 'Partenariats',
      image: '🤝',
    },
    {
      id: 3,
      title: 'Témoignage : L\'histoire de Léa',
      excerpt: 'Léa, 8 ans, a reçu un cadeau de la part de notre communauté. Découvrez comment ce geste simple a illuminé son Noël et changé sa perspective.',
      date: '5 décembre 2024',
      author: 'Sophie Bernard',
      category: 'Témoignages',
      image: '💝',
    },
    {
      id: 4,
      title: 'Bilan de l\'année 2024 : Chiffres et impacts',
      excerpt: 'Retrouvez notre rapport annuel complet avec les statistiques, les réalisations et les perspectives pour 2025.',
      date: '1er décembre 2024',
      author: 'Marie Dupont',
      category: 'Rapports',
      image: '📊',
    },
    {
      id: 5,
      title: 'Comment nous sélectionnons les bénéficiaires',
      excerpt: 'Transparence et équité sont au cœur de notre processus. Découvrez comment nous identifions et sélectionnons les enfants qui bénéficieront de notre aide.',
      date: '25 novembre 2024',
      author: 'Jean Martin',
      category: 'Processus',
      image: '✅',
    },
    {
      id: 6,
      title: 'Appel aux bénévoles : Rejoignez notre équipe',
      excerpt: 'Vous souhaitez contribuer activement à notre mission ? Nous recherchons des bénévoles pour nous aider lors de la distribution des cadeaux.',
      date: '20 novembre 2024',
      author: 'Sophie Bernard',
      category: 'Bénévolat',
      image: '🙋',
    },
  ];

  const categories = ['Tous', 'Campagne', 'Partenariats', 'Témoignages', 'Rapports', 'Processus', 'Bénévolat'];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-16">
          <div className="container">
            <h1 className="text-5xl font-bold mb-4">Actualités</h1>
            <p className="text-xl opacity-90">
              Restez informé des dernières mises à jour de notre campagne
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container max-w-4xl">
            {/* Categories Filter */}
            <div className="mb-12 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    category === 'Tous'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-foreground hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Articles Grid */}
            <div className="space-y-8">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="md:flex">
                    {/* Image */}
                    <div className="md:w-1/4 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center p-8 min-h-48">
                      <span className="text-6xl">{article.image}</span>
                    </div>

                    {/* Content */}
                    <div className="md:w-3/4 p-8">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {article.category}
                        </span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {article.date}
                        </span>
                      </div>

                      <h2 className="text-2xl font-bold text-foreground mb-3 hover:text-orange-500 transition-colors cursor-pointer">
                        {article.title}
                      </h2>

                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <User className="w-4 h-4" />
                          Par {article.author}
                        </span>
                        <a href="#" className="text-orange-500 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                          Lire la suite
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="mt-16 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-3">Recevez nos actualités</h3>
              <p className="text-muted-foreground mb-6">
                Inscrivez-vous à notre newsletter pour ne rien manquer de nos mises à jour
              </p>
              <div className="flex gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-lg transition-colors">
                  S'inscrire
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
