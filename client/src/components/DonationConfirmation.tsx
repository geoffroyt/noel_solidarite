import { Button } from '@/components/ui/button';
import { DonationData } from '@/pages/Donate';
import { CheckCircle, Heart, Gift } from 'lucide-react';

/**
 * DonationConfirmation Component
 * Confirmation page after successful donation submission
 */

interface DonationConfirmationProps {
  data: DonationData;
  onBackToDonate: () => void;
  onBackToHome: () => void;
}

const CAUSE_LABELS: Record<string, string> = {
  'aide-hivernale': 'Aide Hivernale',
  'femmes-en-fete': 'Femmes en Fête',
  'kit-scolaire': 'Kit Scolaire',
  'precarite-menstruelle': 'Lutte contre la Précarité Menstruelle',
  'noel-pour-tous': 'Noël Pour Tous',
  'lutte-precarite': 'Lutte contre la précarité',
};

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  card: 'Carte bancaire',
  sepa: 'Prélèvement SEPA',
  cheque: 'Chèque',
};

export default function DonationConfirmation({
  data,
  onBackToDonate,
  onBackToHome,
}: DonationConfirmationProps) {
  const taxReduction = data.amount * 0.66;
  const netCost = data.amount - taxReduction;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="container max-w-2xl">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-green-200 rounded-full blur-xl opacity-50"></div>
              <CheckCircle className="w-24 h-24 text-green-500 relative" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Merci pour votre générosité !
          </h1>
          <p className="text-xl text-muted-foreground">
            Votre don a été enregistré avec succès
          </p>
        </div>

        {/* Donation Summary */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 space-y-6">
          <h2 className="text-2xl font-bold text-foreground border-b-2 border-green-500 pb-4">
            Récapitulatif de votre don
          </h2>

          {/* Amount and Cause */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-orange-50 rounded-lg p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">Montant du don</p>
              <p className="text-4xl font-bold text-orange-600">{data.amount} €</p>
              <p className="text-sm text-muted-foreground mt-2">
                {data.donationType === 'ponctuel' ? 'Don ponctuel' : 'Don régulier'}
              </p>
            </div>

            <div className="bg-teal-50 rounded-lg p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">Cause soutenue</p>
              <p className="text-lg font-bold text-teal-600">
                {CAUSE_LABELS[data.cause] || data.cause}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Lutte contre la précarité
              </p>
            </div>
          </div>

          {/* Tax Benefit */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-bold text-foreground mb-4">Avantage fiscal</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Montant du don :</span>
                <span className="font-semibold">{data.amount} €</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Réduction d'impôt (66%) :</span>
                <span className="font-semibold text-blue-600">
                  -{Math.round(taxReduction)} €
                </span>
              </div>
              <div className="border-t border-blue-200 pt-2 flex justify-between">
                <span className="font-bold">Coût net pour vous :</span>
                <span className="font-bold text-blue-600">{Math.round(netCost)} €</span>
              </div>
            </div>
          </div>

          {/* Donor Information */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Vos informations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Nom</p>
                <p className="font-semibold">{data.lastName}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Prénom</p>
                <p className="font-semibold">{data.firstName}</p>
              </div>
              <div>
                <p className="text-muted-foreground">E-mail</p>
                <p className="font-semibold">{data.email}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Téléphone</p>
                <p className="font-semibold">{data.phone || 'Non fourni'}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-muted-foreground">Adresse</p>
                <p className="font-semibold">
                  {data.address}
                  {data.addressComplement && `, ${data.addressComplement}`}
                </p>
                <p className="font-semibold">
                  {data.zipCode} {data.city}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Méthode de paiement</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Paiement par</p>
              <p className="font-semibold">
                {PAYMENT_METHOD_LABELS[data.paymentMethod]}
              </p>
            </div>
          </div>
        </div>

        {/* Impact Message */}
        <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-8 mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-red-500" />
            <Gift className="w-6 h-6 text-orange-500" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-3">
            Votre impact
          </h3>
          <p className="text-foreground mb-4">
            Grâce à votre don de <span className="font-bold">{data.amount} €</span>, vous permettez à{' '}
            <span className="font-bold text-orange-600">
              {Math.round(data.amount * 3)}
            </span>{' '}
            cadeaux d'être distribués aux personnes en précarité.
          </p>
          <p className="text-sm text-muted-foreground">
            1 € donné = 3 cadeaux distribués
          </p>
        </div>

        {/* Confirmation Details */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h3 className="font-bold text-foreground mb-4">Prochaines étapes</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <span className="font-bold text-orange-500 flex-shrink-0">1.</span>
              <span>
                Un e-mail de confirmation a été envoyé à <span className="font-semibold">{data.email}</span>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-orange-500 flex-shrink-0">2.</span>
              <span>
                Vous recevrez un reçu fiscal pour déclarer votre don aux impôts
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-orange-500 flex-shrink-0">3.</span>
              <span>
                Vous serez informé de l'impact de votre don via nos newsletters
              </span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onBackToHome}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3"
          >
            Retour à l'accueil
          </Button>
          <Button
            onClick={onBackToDonate}
            variant="outline"
            className="font-semibold px-8 py-3"
          >
            Faire un autre don
          </Button>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-12 pt-8 border-t border-border">
          <p className="text-muted-foreground text-sm">
            Merci de votre soutien ! Ensemble, nous luttons contre la précarité et le gaspillage.
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            Dons Solidaires - Agir ensemble pour aider ceux dans le besoin
          </p>
        </div>
      </div>
    </div>
  );
}
