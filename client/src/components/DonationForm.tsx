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
  title: z.string().min(1, 'Veuillez sélectionner une civilité'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  address: z.string().min(5, 'Veuillez entrer une adresse valide'),
  addressComplement: z.string().optional(),
  zipCode: z.string().regex(/^\d{5}$/, 'Code postal invalide'),
  city: z.string().min(2, 'Veuillez entrer une ville'),
  country: z.string(),
  phone: z.string().optional(),
  organization: z.boolean(),
  paymentMethod: z.enum(['card', 'sepa', 'cheque']),
  coverFees: z.boolean(),
  howDidYouKnow: z.string().optional(),
});

type DonationFormData = z.infer<typeof donationSchema>;

interface DonationFormProps {
  onSubmit: (data: DonationData) => void;
}

const DONATION_AMOUNTS = [
  { amount: 20, description: '60 cadeaux distribués' },
  { amount: 50, description: '150 cadeaux distribués' },
  { amount: 100, description: '300 cadeaux distribués' },
  { amount: 200, description: '600 cadeaux distribués' },
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
  const [formError, setFormError] = useState<string>('');
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
      amount: 20, // Valeur par défaut
      country: 'France',
      paymentMethod: 'card',
      coverFees: false,
      title: 'mr-mme',
      organization: false,
      lastName: '',
      firstName: '',
      email: '',
      address: '',
      zipCode: '',
      city: '',
    },
  });

  const donationType = watch('donationType');
  const amount = watch('amount');
  const paymentMethod = watch('paymentMethod');

  const handleAmountClick = (value: number) => {
    setSelectedAmount(value);
    setCustomAmount('');
    setValue('amount', value, { shouldValidate: true });
  };

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
    if (value) {
      const numValue = parseFloat(value);
      setValue('amount', numValue, { shouldValidate: true });
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
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue lors de la soumission.';
      setFormError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-red-700" />
            <h1 className="text-4xl font-bold text-foreground">Faites un don</h1>
            <Gift className="w-8 h-8 text-green-700" />
          </div>
          <p className="text-lg text-muted-foreground">
            Rejoignez la chaîne de solidarité et aidez les personnes en précarité
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Column 1: Mon Don */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-lg shadow-md p-8 space-y-6 h-full">
                <h2 className="text-2xl font-bold text-foreground border-b-2 border-green-700 pb-4">
                  Mon don
                </h2>

                {/* Donation Type */}
                <div>
                  <RadioGroup value={donationType} onValueChange={(value) => setValue('donationType', value as 'ponctuel' | 'regulier')}>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <RadioGroupItem value="ponctuel" id="ponctuel" className="sr-only" />
                        <Label htmlFor="ponctuel" className={`block text-center p-3 border rounded-lg cursor-pointer font-medium transition-colors ${donationType === 'ponctuel' ? 'bg-red-700 text-white border-red-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                          Je fais un don ponctuel
                        </Label>
                      </div>
                      <div className="flex-1">
                        <RadioGroupItem value="regulier" id="regulier" className="sr-only" />
                        <Label htmlFor="regulier" className={`block text-center p-3 border rounded-lg cursor-pointer font-medium transition-colors ${donationType === 'regulier' ? 'bg-red-700 text-white border-red-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                          Je donne régulièrement
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {/* Amount Selection */}
                <div>
                  <div className="grid grid-cols-1 gap-3 mb-4">
                    {DONATION_AMOUNTS.map((item) => (
                      <Button
                        key={item.amount}
                        type="button"
                        onClick={() => handleAmountClick(item.amount)}
                        className={`py-6 text-lg font-bold transition-all justify-between ${
                          selectedAmount === item.amount
                            ? 'bg-red-700 hover:bg-red-800 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-foreground'
                        }`}
                      >
                        <span>{item.amount} €</span>
                        <span className="font-normal text-sm">{item.description}</span>
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
                  {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
                </div>

                {/* Tax Benefit Info */}
                {taxBenefit && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm text-foreground">
                      Votre don de <span className="font-bold">{taxBenefit.gross} €</span>, ne vous coûte que{' '}
                      <span className="font-bold text-green-700">{taxBenefit.net} €</span> après réduction d'impôts de 66%, dans la limite de 20% de votre revenu imposable.
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
            </div>

            {/* Column 2: Mes Coordonnées */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
                <h2 className="text-2xl font-bold text-foreground border-b-2 border-green-700 pb-4">
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
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
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
            </div>

            {/* Column 3: Mon Règlement & Pourquoi nous soutenir ? */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
                <h2 className="text-2xl font-bold text-foreground border-b-2 border-red-700 pb-4">
                  Mon règlement
                </h2>

                {/* Cover Fees - Changed to Radio Group */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-medium mb-2">
                    Je souhaite couvrir les frais bancaires. Mon soutien est de <span className="font-bold">{amount || 0} €</span>
                  </p>
                  <RadioGroup value={String(watch('coverFees'))} onValueChange={(value) => setValue('coverFees', value === 'true')}>
                    <div className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="coverFeesYes" />
                        <Label htmlFor="coverFeesYes" className="cursor-pointer font-medium">
                          Oui
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="coverFeesNo" />
                        <Label htmlFor="coverFeesNo" className="cursor-pointer font-medium">
                          Non
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {/* Payment Method */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">Méthode de paiement <span className="text-red-500">*</span></Label>
                  <RadioGroup value={paymentMethod} onValueChange={(value) => setValue('paymentMethod', value as 'card' | 'sepa' | 'cheque')}>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="card" id="card" className="sr-only" />
                        <Label htmlFor="card" className={`block text-center p-3 border rounded-lg cursor-pointer font-medium transition-colors ${paymentMethod === 'card' ? 'bg-red-700 text-white border-red-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                          Je donne par carte
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="sepa" id="sepa" className="sr-only" />
                        <Label htmlFor="sepa" className={`block text-center p-3 border rounded-lg cursor-pointer font-medium transition-colors ${paymentMethod === 'sepa' ? 'bg-red-700 text-white border-red-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                          Prélèvement SEPA
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <RadioGroupItem value="cheque" id="cheque" className="sr-only" />
                        <Label htmlFor="cheque" className={`block text-center p-3 border rounded-lg cursor-pointer font-medium transition-colors ${paymentMethod === 'cheque' ? 'bg-red-700 text-white border-red-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                          Je règle par chèque
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                  {errors.paymentMethod && <p className="text-red-500 text-sm mt-1">{errors.paymentMethod.message}</p>}
                </div>
              </div>

              {/* Pourquoi nous soutenir ? */}
              <div className="bg-white rounded-lg shadow-md p-8 space-y-4">
                <h2 className="text-2xl font-bold text-foreground border-b-2 border-red-700 pb-4">
                  Pourquoi nous soutenir ?
                </h2>
                <p className="text-sm text-muted-foreground">
                  Chaque année, **la privation liée aux achats de Noël augmente** : **33% des Français s'inquiètent de ne pas pouvoir offrir de cadeaux à Noël** et **46% des Français déclarent devoir diminuer leur budget pour Noël** de nouveau cette année (_Baromètre "Le renoncement aux achats de Noël, un marqueur de précarité" de l'IFOP pour Dons Solidaires, 2024_).
                </p>
                <p className="text-sm text-muted-foreground">
                  Cette année, le **Traîneau de Dons Solidaires** sillonne la France pour **faire vivre la magie de Noël** aux personnes accompagnées par nos associations partenaires.
                </p>
                <p className="text-sm text-muted-foreground">
                  Aidez-nous à faire voler le traîneau à travers la France : ****en faisant un don de 1€, vous remplissez le traîneau de 3 cadeaux.****
                </p>
                <p className="text-sm font-semibold text-foreground">
                  Ensemble, donnons à chacun le pouvoir d'agir.
                </p>
              </div>
            </div>
          </div>

          {/* Consent - Moved outside the 3-column grid */}
          <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-foreground">
              <p>
                En soumettant ce formulaire, j'accepte que les informations saisies soient exploitées dans le cadre du traitement de mon don et des communications diffusées par l'organisation.
              </p>
            </div>
          </div>

          {/* Error Message */}
          {(error || formError) && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              <p className="font-semibold">Erreur</p>
              <p className="text-sm">{error || formError}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-8 text-lg rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Traitement en cours...
                </>
              ) : (
                "Confirmer mon don"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}