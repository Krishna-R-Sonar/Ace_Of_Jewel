export const paymentConfig = {
    // Paytm configuration
    paytm: {
        merchantID: process.env.PAYTM_MERCHANT_ID || 'your_paytm_merchant_id',
        merchantKey: process.env.PAYTM_MERCHANT_KEY || 'your_paytm_merchant_key',
    },
    
    // PhonePe configuration
    phonePe: {
        merchantID: process.env.PHONEPE_MERCHANT_ID || 'your_phonepe_merchant_id',
        merchantKey: process.env.PHONEPE_MERCHANT_KEY || 'your_phonepe_merchant_key',
    },
    
    // Google Pay configuration (via UPI)
    gpay: {
        merchantID: process.env.GPAY_MERCHANT_ID || 'your_gpay_merchant_id',
    },
    
    // BharatPe configuration
    bharatPe: {
        merchantID: process.env.BHARATPE_MERCHANT_ID || 'your_bharatpe_merchant_id',
        merchantKey: process.env.BHARATPE_MERCHANT_KEY || 'your_bharatpe_merchant_key',
    },
};
