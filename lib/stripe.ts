import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock_key_moodflip', {
  appInfo: {
    name: 'MoodFlip Self-Help Utility',
    version: '1.0.0',
  },
});
