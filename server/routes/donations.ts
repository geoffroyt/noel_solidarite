import { Router, Request, Response } from 'express';

/**
 * Donations API Routes
 * Handles donation submission and processing
 */

const router = Router();

// Store donations in memory (for demo purposes)
// In production, this would be stored in a database
const donations: any[] = [];

/**
 * POST /api/donations
 * Submit a new donation
 */
router.post('/donations', (req: Request, res: Response) => {
  try {
    const {
      donationType,
      amount,
      cause,
      title,
      lastName,
      firstName,
      email,
      address,
      addressComplement,
      zipCode,
      city,
      country,
      phone,
      organization,
      paymentMethod,
      coverFees,
      howDidYouKnow,
    } = req.body;

    // Validation
    if (!amount || amount < 1) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    if (!email || !lastName || !firstName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create donation record
    const donation = {
      id: `DON-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      donationType,
      amount,
      cause,
      donor: {
        title,
        lastName,
        firstName,
        email,
        address,
        addressComplement,
        zipCode,
        city,
        country,
        phone,
        organization,
      },
      payment: {
        method: paymentMethod,
        coverFees,
      },
      howDidYouKnow,
      createdAt: new Date().toISOString(),
      status: 'pending', // pending, confirmed, failed
    };

    // Store donation
    donations.push(donation);

    // In production, you would:
    // 1. Send email confirmation to the donor
    // 2. Process payment (integrate with Stripe, PayPal, etc.)
    // 3. Store in database
    // 4. Send notification to admin

    res.status(201).json({
      success: true,
      message: 'Donation submitted successfully',
      donationId: donation.id,
      donation,
    });
  } catch (error) {
    console.error('Error processing donation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/donations/:id
 * Get donation details by ID
 */
router.get('/donations/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const donation = donations.find((d) => d.id === id);

    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    res.json(donation);
  } catch (error) {
    console.error('Error fetching donation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/donations/stats
 * Get donation statistics
 */
router.get('/stats', (req: Request, res: Response) => {
  try {
    const totalDonations = donations.length;
    const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);
    const averageDonation = totalDonations > 0 ? totalAmount / totalDonations : 0;

    const statsByType = {
      ponctuel: donations.filter((d) => d.donationType === 'ponctuel').length,
      regulier: donations.filter((d) => d.donationType === 'regulier').length,
    };

    const statsByCause: Record<string, number> = {};
    donations.forEach((d) => {
      statsByCause[d.cause] = (statsByCause[d.cause] || 0) + 1;
    });

    res.json({
      totalDonations,
      totalAmount,
      averageDonation: Math.round(averageDonation * 100) / 100,
      byType: statsByType,
      byCause: statsByCause,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
