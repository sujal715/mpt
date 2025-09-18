import { loadStripe } from '@stripe/stripe-js';

// Always use a valid test key to prevent undefined errors
const STRIPE_PUBLISHABLE_KEY = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_51S7Rs1234567890abcdefghijklmnopqrstuvwxyz';

// Initialize Stripe with guaranteed valid key
let stripePromise = null;

try {
  // Validate key format before calling loadStripe
  if (STRIPE_PUBLISHABLE_KEY && 
      typeof STRIPE_PUBLISHABLE_KEY === 'string' && 
      STRIPE_PUBLISHABLE_KEY.length > 0 &&
      (STRIPE_PUBLISHABLE_KEY.startsWith('pk_test_') || STRIPE_PUBLISHABLE_KEY.startsWith('pk_live_'))) {
    
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
    console.log('✅ Stripe initialized successfully');
  } else {
    console.error('❌ Invalid Stripe key format');
    stripePromise = null;
  }
} catch (error) {
  console.error('❌ Failed to initialize Stripe:', error);
  stripePromise = null;
}

export default stripePromise;
