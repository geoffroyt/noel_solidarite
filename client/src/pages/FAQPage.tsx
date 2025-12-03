import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronDown } from 'lucide-react';

/**
 * FAQ Page
 * Design: Noël Chaleureux & Inclusif
 * Réponses aux questions fréquemment posées
 */

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqItems: FAQItem[] = [
  {
    id: 'don-1',
    category: 'Dons',
    question: 'Comment puis-je faire un don ?',
    answer: 'Vous pouvez faire un don en visitant notre page "Faire un don". Nous acceptons les paiements par carte bancaire, prélèvement SEPA et chèque. Tous les dons sont sécurisés et traités de manière confidentielle.',
  },
  {
    id: 'don-2',
    category: 'Dons',
    question: 'Quel est le montant minimum pour faire un don ?',
    answer: 'Il n\'y a pas de montant minimum. Chaque don, quelle que soit sa taille, contribue à notre mission. Même 1€ peut faire une différence.',
  },
  {
    id: 'don-3',
    category: 'Dons',
    question: 'Puis-je faire un don régulier ?',
    answer: 'Oui ! Nous proposons des dons réguliers (mensuels, trimestriels, annuels). Les dons réguliers nous aident à planifier nos actions et à avoir un impact plus durable.',
  },
  {
    id: 'don-4',
    category: 'Dons',
    question: 'Bénéficié-je d\'une réduction d\'impôt ?',
    answer: 'Oui, nous sommes une association reconnue d\'intérêt général. Vous bénéficiez d\'une réduction d\'impôt de 66% sur vos dons (dans la limite de 20% de votre revenu imposable). Vous recevrez un reçu fiscal.',
  },
  {
    id: 'cadeau-1',
    category: 'Cadeaux',
    question: 'Puis-je offrir un cadeau spécifique ?',
    answer: 'Oui ! Vous pouvez choisir un cadeau spécifique parmi notre catalogue. Nous nous chargeons de l\'acheter et de le distribuer à un enfant qui en a besoin.',
  },
  {
    id: 'cadeau-2',
    category: 'Cadeaux',
    question: 'Quels types de cadeaux proposez-vous ?',
    answer: 'Nous proposons une variété de cadeaux adaptés à différents âges : jouets, livres, vêtements, articles de sport, jeux éducatifs, etc. Tous les cadeaux sont neufs et de qualité.',
  },
  {
    id: 'cadeau-3',
    category: 'Cadeaux',
    question: 'Puis-je parrainer un enfant ?',
    answer: 'Oui, vous pouvez parrainer un enfant pour l\'année. Vous recevrez des mises à jour régulières sur son parcours et l\'impact de votre soutien. C\'est une belle façon de créer une connexion durable.',
  },
  {
    id: 'entreprise-1',
    category: 'Entreprises',
    question: 'Comment mon entreprise peut-elle participer ?',
    answer: 'Les entreprises peuvent participer de plusieurs façons : faire un don collectif, sponsoriser la campagne, mobiliser les salariés, ou organiser des événements de collecte. Contactez-nous pour discuter des options.',
  },
  {
    id: 'entreprise-2',
    category: 'Entreprises',
    question: 'Quels sont les avantages pour mon entreprise ?',
    answer: 'Votre engagement RSE sera renforcé, vous améliorerez votre image de marque, renforcerez la cohésion de vos équipes, et contribuerez à une cause importante. Nous offrons également une visibilité et une reconnaissance.',
  },
  {
    id: 'association-1',
    category: 'Associations',
    question: 'Comment devenir partenaire ?',
    answer: 'Si vous êtes une association locale à Marseille ou en Guadeloupe, vous pouvez nous contacter pour devenir partenaire. Nous travaillons ensemble pour identifier les enfants qui ont besoin de soutien.',
  },
  {
    id: 'association-2',
    category: 'Associations',
    question: 'Comment enregistrer les enfants ?',
    answer: 'Les associations partenaires peuvent enregistrer les enfants via notre plateforme sécurisée. Nous collectons les informations nécessaires pour assurer que chaque enfant reçoit un cadeau adapté.',
  },
  {
    id: 'general-1',
    category: 'Général',
    question: 'Comment puis-je devenir bénévole ?',
    answer: 'Nous accueillons les bénévoles ! Vous pouvez nous aider lors de la distribution des cadeaux, dans la collecte de dons, ou dans d\'autres tâches. Contactez-nous pour en savoir plus.',
  },
  {
    id: 'general-2',
    category: 'Général',
    question: 'Où puis-je trouver plus d\'informations sur vos opérations ?',
    answer: 'Consultez notre page "Actualités" pour les dernières mises à jour. Nous publions également des rapports annuels détaillant nos opérations et notre impact.',
  },
];

const categories = ['Tous', 'Dons', 'Cadeaux', 'Entreprises', 'Associations', 'Général'];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredItems =
    activeCategory === 'Tous'
      ? faqItems
      : faqItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-16">
          <div className="container">
            <h1 className="text-5xl font-bold mb-4">Questions Fréquemment Posées</h1>
            <p className="text-xl opacity-90">
              Trouvez les réponses à vos questions sur Noël de Solidarité
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
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 text-foreground hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1 text-left">
                      <h3 className="text-lg font-bold text-foreground">{item.question}</h3>
                      <span className="text-sm text-muted-foreground">{item.category}</span>
                    </div>
                    <ChevronDown
                      className={`w-6 h-6 text-orange-500 transition-transform flex-shrink-0 ml-4 ${
                        expandedId === item.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {expandedId === item.id && (
                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                      <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact Section */}
            <div className="mt-16 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-3">Vous n\'avez pas trouvé votre réponse ?</h3>
              <p className="text-muted-foreground mb-6">
                Notre équipe est là pour vous aider. N\'hésitez pas à nous contacter directement.
              </p>
              <a
                href="/contact"
                className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-bold px-8 py-3 rounded-lg transition-colors"
              >
                Nous Contacter
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
