import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ChevronDown } from 'lucide-react';

/**
 * FAQ Component
 * Design: Noël Chaleureux & Inclusif
 * - Common questions about the campaign
 * - Transparent information
 * - Accordion interface
 */

interface FAQItem {
  question: string;
  answer: string;
}

function FAQAccordion({ question, answer, isOpen, onToggle }: FAQItem & { isOpen: boolean; onToggle: () => void }) {
  return (
    <Card className="border-2 border-border overflow-hidden hover:border-primary/50 transition-colors">
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-start justify-between gap-4 hover:bg-muted/50 transition-colors text-left"
      >
        <h3 className="font-semibold text-foreground text-lg">{question}</h3>
        <ChevronDown
          className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="px-6 pb-6 border-t border-border">
          <p className="text-muted-foreground leading-relaxed">{answer}</p>
        </div>
      )}
    </Card>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'Où vont exactement mes dons ?',
      answer: 'Chaque don est tracé de bout en bout. 85% de vos contributions vont directement aux cadeaux et fournitures pour les enfants. Les 15% restants couvrent la logistique, la distribution et les frais administratifs. Nous publions un rapport détaillé après chaque campagne.',
    },
    {
      question: 'Comment puis-je être sûr que les enfants reçoivent les cadeaux ?',
      answer: 'Nous travaillons avec des associations locales vérifiées à Marseille et en Guadeloupe. Chaque enfant reçoit un cadeau documenté avec photo. Nous partagerons les histoires d\'impact directement avec nos donateurs après la distribution.',
    },
    {
      question: 'Puis-je parrainer un enfant spécifique ?',
      answer: 'Oui ! Vous pouvez choisir un enfant dans notre galerie et lui offrir un cadeau spécifique. Vous recevrez une lettre de remerciement et des photos de l\'enfant avec son cadeau (avec consentement parental).',
    },
    {
      question: 'Quand les cadeaux seront-ils distribués ?',
      answer: 'La distribution aura lieu du 20 au 24 décembre 2025. Tous les cadeaux seront remis avant Noël. Nous publierons des mises à jour en direct sur nos réseaux sociaux pendant la distribution.',
    },
    {
      question: 'Puis-je donner des cadeaux physiques au lieu d\'argent ?',
      answer: 'Actuellement, nous acceptons uniquement les dons financiers pour assurer la qualité et la pertinence des cadeaux. Cependant, nous cherchons des partenaires pour les dons en nature. Contactez-nous si vous êtes intéressé.',
    },
    {
      question: 'Comment puis-je m\'impliquer en tant que bénévole ?',
      answer: 'Nous accueillons les bénévoles pour l\'emballage des cadeaux, la distribution et la documentation. Contactez-nous via le formulaire de contact pour exprimer votre intérêt. Les bénévoles reçoivent une formation et un kit de bénévole.',
    },
    {
      question: 'Puis-je obtenir un reçu fiscal ?',
      answer: 'Oui, tous les dons sont déductibles fiscalement. Vous recevrez un reçu fiscal par email après votre donation. Conservez-le pour votre déclaration d\'impôts.',
    },
    {
      question: 'Que se passe-t-il après Noël ?',
      answer: 'Après le 25 décembre, nous publierons un rapport d\'impact complet avec statistiques, photos et témoignages. Nous commencerons également à préparer la campagne de l\'année prochaine et explorerons d\'autres initiatives solidaires.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Questions Fréquemment Posées
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trouvez les réponses à vos questions sur la campagne Noël de Solidarité.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <FAQAccordion
              key={idx}
              {...faq}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
