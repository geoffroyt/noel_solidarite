import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { DonationData } from '@/pages/Donate';
import { Heart, Gift, Loader2 } from 'lucide-react';
import { useDonation } from '@/hooks/useDonation';

/**
 * DonationForm Component
 * Multi-step donation form inspired by donsolidaires.fr
 * Includes donation type, amount, cause, personal info, and payment method
 */

const donationSchema = z.object({
  donationType: z.enum(['ponctuel', 'regulier']),
  amount: z.number().min(1, 'Le montant doit être supérieur à 0'),
  cause: z.string().min(1, 'Veuillez sélectionner une cause'),
  title: z.string().min(1, 'Veuillez sélectionner une civilité'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  address: z.string().min(5, 'Veuillez entrer une adresse valide'),
  addressComplement: z.string().optional(),
  zipCode: z.string().regex(/^\d{5}$/, 'Code postal invalide'),
  city: z.string().min(2, 'Veuillez entrer une ville'),
  country: z.string().default('France'),
  phone: z.string().optional(),
  organization: z.boolean().default(false),
  paymentMethod: z.enum(['card', 'sepa', 'cheque']),
  coverFees: z.boolean().default(false),
  howDidYouKnow: z.string().optional(),
});

type DonationFormData = z.infer<typeof donationSchema>;

interface DonationFormProps {
  onSubmit: (data: DonationData) => void;
}

const DONATION_AMOUNTS = [20, 50, 100, 200];
const CAUSES = [
  { value: 'aide-hivernale', label: 'Aide Hivernale' },
  { value: 'femmes-en-fete', label: 'Femmes en Fête' },
  { value: 'kit-scolaire', label: 'Kit Scolaire' },
  { value: 'precarite-menstruelle', label: 'Lutte contre la Précarité Menstruelle' },
  { value: 'noel-pour-tous', label: 'Noël Pour Tous' },
  { value: 'lutte-precarite', label: 'Lutte contre la précarité' },
];

const TITLES = [
  { value: 'mr-mme', label: 'Monsieur et Madame' },
  { value: 'mme', label: 'Madame' },
  { value: 'mlle', label: 'Mademoiselle' },
  { value: 'mr', label: 'Monsieur' },
];

const HOW_DID_YOU_KNOW = [
  'Réseaux sociaux',
  'Bouche à oreille',
  'Moteur de recherche',
  'Presse',
  'Autre',
];

export default function DonationForm({ onSubmit }: DonationFormProps) {
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const { isLoading, error, submitDonation } = useDonation();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      donationType: 'ponctuel',
      cause: 'lutte-precarite',
      country: 'France',
      paymentMethod: 'card',
      coverFees: false,
      title: 'mr-mme',
    },
  });

  const donationType = watch('donationType');
  const amount = watch('amount');
  const paymentMethod = watch('paymentMethod');

  const handleAmountClick = (value: number) => {
    setSelectedAmount(value);
    setCustomAmount('');
    setValue('amount', value);
  };

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
    if (value) {
      setValue('amount', parseFloat(value));
    }
  };

  const calculateTaxBenefit = (amount: number) => {
    const taxReduction = amount * 0.66;
    const netCost = amount - taxReduction;
    return {
      gross: amount,
      reduction: Math.round(taxReduction),
      net: Math.round(netCost),
    };
  };

  const taxBenefit = amount ? calculateTaxBenefit(amount) : null;

  const onSubmitForm = async (data: DonationFormData) => {
    try {
      await submitDonation(data as DonationData);
      onSubmit(data as DonationData);
    } catch (err) {
      console.error('Donation submission error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-red-500" />
            <h1 className="text-4xl font-bold text-foreground">Faites un don</h1>
            <Gift className="w-8 h-8 text-orange-500" />
          </div>
          <p className="text-lg text-muted-foreground">
            Rejoignez la chaîne de solidarité et aidez les personnes en précarité
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-8">
          {/* Step 1: Donation Details */}
          <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
            <h2 className="text-2xl font-bold text-foreground border-b-2 border-orange-500 pb-4">
              Mon don
            </h2>

            {/* Donation Type */}
            <div>
              <Label className="text-base font-semibold mb-4 block">Type de don</Label>
              <RadioGroup value={donationType} onValueChange={(value) => setValue('donationType', value as 'ponctuel' | 'regulier')}>
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ponctuel" id="ponctuel" />
                    <Label htmlFor="ponctuel" className="cursor-pointer font-medium">
                      Je fais un don ponctuel
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="regulier" id="regulier" />
                    <Label htmlFor="regulier" className="cursor-pointer font-medium">
                      Je donne régulièrement
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Amount Selection */}
            <div>
              <Label className="text-base font-semibold mb-4 block">Montant du don</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {DONATION_AMOUNTS.map((value) => (
                  <Button
                    key={value}
                    type="button"
                    onClick={() => handleAmountClick(value)}
                    className={`py-6 text-lg font-bold transition-all ${
                      selectedAmount === value
                        ? 'bg-orange-500 hover:bg-orange-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-foreground'
                    }`}
                  >
                    {value} €
                  </Button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Montant libre"
                  value={customAmount}
                  onChange={(e) => handleCustomAmount(e.target.value)}
                  className="flex-1"
                  min="1"
                />
                <span className="text-lg font-semibold text-foreground">€</span>
              </div>
            </div>

            {/* Cause Selection */}
            <div>
              <Label htmlFor="cause" className="text-base font-semibold mb-2 block">
                Je souhaite soutenir
              </Label>
              <select
                id="cause"
                {...register('cause')}
                className="w-full px-3 py-2 border border-input rounded-md bg-white text-foreground"
              >
                {CAUSES.map((cause) => (
                  <option key={cause.value} value={cause.value}>
                    {cause.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Tax Benefit Info */}
            {taxBenefit && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-foreground">
                  Votre don de <span className="font-bold">{taxBenefit.gross} €</span>, ne vous coûte que{' '}
                  <span className="font-bold text-blue-600">{taxBenefit.net} €</span> après réduction d'impôts de 66%, dans la limite de 20% de votre revenu imposable.
                  Le surplus étant reportable 5 ans.
                </p>
              </div>
            )}

            {/* Tax Type Selection */}
            <div>
              <Label className="text-base font-semibold mb-4 block">Type d'impôt</Label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  className="px-4 py-2 border border-input rounded-md hover:bg-gray-50 text-sm font-medium"
                >
                  IFI
                </button>
                <button
                  type="button"
                  className="px-4 py-2 border border-input rounded-md hover:bg-gray-50 text-sm font-medium bg-gray-100"
                >
                  Impôt sur le revenu
                </button>
                <button
                  type="button"
                  className="px-4 py-2 border border-input rounded-md hover:bg-gray-50 text-sm font-medium"
                >
                  Société
                </button>
              </div>
            </div>
          </div>

          {/* Step 2: Personal Information */}
          <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
            <h2 className="text-2xl font-bold text-foreground border-b-2 border-teal-500 pb-4">
              Mes coordonnées
            </h2>

            {/* Organization Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="organization"
                {...register('organization')}
              />
              <Label htmlFor="organization" className="cursor-pointer font-medium">
                Je représente une organisation ou une société
              </Label>
            </div>

            {/* Title */}
            <div>
              <Label htmlFor="title" className="text-base font-semibold mb-2 block">
                Civilité <span className="text-red-500">*</span>
              </Label>
              <select
                id="title"
                {...register('title')}
                className="w-full px-3 py-2 border border-input rounded-md bg-white text-foreground"
              >
                {TITLES.map((title) => (
                  <option key={title.value} value={title.value}>
                    {title.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lastName" className="text-base font-semibold mb-2 block">
                  Nom <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  placeholder="Votre nom"
                  {...register('lastName')}
                  className={errors.lastName ? 'border-red-500' : ''}
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
              </div>
              <div>
                <Label htmlFor="firstName" className="text-base font-semibold mb-2 block">
                  Prénom <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  placeholder="Votre prénom"
                  {...register('firstName')}
                  className={errors.firstName ? 'border-red-500' : ''}
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-base font-semibold mb-2 block">
                E-mail <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="votre.email@example.com"
                {...register('email')}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="address" className="text-base font-semibold mb-2 block">
                Adresse <span className="text-red-500">*</span>
              </Label>
              <Input
                id="address"
                placeholder="Votre adresse"
                {...register('address')}
                className={errors.address ? 'border-red-500' : ''}
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
            </div>

            {/* Address Complement */}
            <div>
              <Label htmlFor="addressComplement" className="text-base font-semibold mb-2 block">
                Complément d'adresse
              </Label>
              <Input
                id="addressComplement"
                placeholder="Appartement, bâtiment, etc."
                {...register('addressComplement')}
              />
            </div>

            {/* Zip Code and City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="zipCode" className="text-base font-semibold mb-2 block">
                  Code postal <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="zipCode"
                  placeholder="75001"
                  {...register('zipCode')}
                  className={errors.zipCode ? 'border-red-500' : ''}
                />
                {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>}
              </div>
              <div>
                <Label htmlFor="city" className="text-base font-semibold mb-2 block">
                  Ville <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="city"
                  placeholder="Paris"
                  {...register('city')}
                  className={errors.city ? 'border-red-500' : ''}
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
              </div>
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone" className="text-base font-semibold mb-2 block">
                Téléphone
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+33 1 23 45 67 89"
                {...register('phone')}
              />
            </div>

            {/* How Did You Know */}
            <div>
              <Label htmlFor="howDidYouKnow" className="text-base font-semibold mb-2 block">
                Comment avez-vous connu Dons Solidaires ?
              </Label>
              <select
                id="howDidYouKnow"
                {...register('howDidYouKnow')}
                className="w-full px-3 py-2 border border-input rounded-md bg-white text-foreground"
              >
                <option value="">Sélectionner...</option>
                {HOW_DID_YOU_KNOW.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Step 3: Payment */}
          <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
            <h2 className="text-2xl font-bold text-foreground border-b-2 border-red-500 pb-4">
              Mon règlement
            </h2>

            {/* Cover Fees */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox
                  id="coverFees"
                  {...register('coverFees')}
                />
                <Label htmlFor="coverFees" className="cursor-pointer font-medium">
                  Je souhaite couvrir les frais bancaires.
                </Label>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                Mon soutien est de <span className="font-bold">{amount || 0} €</span>
              </p>
            </div>

            {/* Payment Method */}
            <div>
              <Label className="text-base font-semibold mb-4 block">Méthode de paiement</Label>
              <RadioGroup value={paymentMethod} onValueChange={(value) => setValue('paymentMethod', value as 'card' | 'sepa' | 'cheque')}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="cursor-pointer font-medium flex-1">
                      Je donne par carte
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value="sepa" id="sepa" />
                    <Label htmlFor="sepa" className="cursor-pointer font-medium flex-1">
                      Prélèvement SEPA
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value="cheque" id="cheque" />
                    <Label htmlFor="cheque" className="cursor-pointer font-medium flex-1">
                      Je règle par chèque
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Consent */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-foreground">
              <p>
                En soumettant ce formulaire, j'accepte que les informations saisies soient exploitées dans le cadre du traitement de mon don et des communications diffusées par l'organisation.
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              <p className="font-semibold">Erreur</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 text-lg rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Traitement en cours...
                </>
              ) : (
                'Confirmer mon don'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
