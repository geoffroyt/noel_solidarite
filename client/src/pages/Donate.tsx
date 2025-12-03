import { useState } from 'react';
import { useLocation } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DonationForm from '@/components/DonationForm';
import DonationConfirmation from '@/components/DonationConfirmation';

/**
 * Donate Page
 * Design: Noël Chaleureux & Inclusif
 * Main donation page with multi-step form
 */

export interface DonationData {
  donationType: 'ponctuel' | 'regulier';
  amount: number;
  cause: string;
  title: string;
  lastName: string;
  firstName: string;
  email: string;
  address: string;
  addressComplement: string;
  zipCode: string;
  city: string;
  country: string;
  phone: string;
  organization: boolean;
  paymentMethod: 'card' | 'sepa' | 'cheque';
  coverFees: boolean;
  howDidYouKnow: string;
}

export default function Donate() {
  const [, setLocation] = useLocation();
  const [donationData, setDonationData] = useState<DonationData | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleDonationSubmit = (data: DonationData) => {
    setDonationData(data);
    setIsConfirmed(true);
  };

  const handleBackToDonate = () => {
    setIsConfirmed(false);
    setDonationData(null);
  };

  const handleBackToHome = () => {
    setLocation('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {!isConfirmed ? (
          <DonationForm onSubmit={handleDonationSubmit} />
        ) : donationData ? (
          <DonationConfirmation
            data={donationData}
            onBackToDonate={handleBackToDonate}
            onBackToHome={handleBackToHome}
          />
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
