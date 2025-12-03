import { useState } from 'react';
import axios from 'axios';
import { DonationData } from '@/pages/Donate';

/**
 * useDonation Hook
 * Manages donation submission and API calls
 */

interface DonationResponse {
  success: boolean;
  message: string;
  donationId: string;
  donation: any;
}

interface UseDonationReturn {
  isLoading: boolean;
  error: string | null;
  success: boolean;
  donationId: string | null;
  submitDonation: (data: DonationData) => Promise<void>;
  reset: () => void;
}

export function useDonation(): UseDonationReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [donationId, setDonationId] = useState<string | null>(null);

  const submitDonation = async (data: DonationData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post<DonationResponse>('/api/donations', data);

      if (response.data.success) {
        setSuccess(true);
        setDonationId(response.data.donationId);
      } else {
        setError(response.data.message || 'An error occurred');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || err.message || 'Failed to submit donation');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setIsLoading(false);
    setError(null);
    setSuccess(false);
    setDonationId(null);
  };

  return {
    isLoading,
    error,
    success,
    donationId,
    submitDonation,
    reset,
  };
}
