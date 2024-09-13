import axios from 'axios';

export const generateUPIRequest = async (amount, _upiApp, config) => {
    try {
        // Example: Using the merchant ID from the config
        const response = await axios.post('https://example.com/api/upi', {
            amount,
            merchantID: config.merchantID, // Use the selected UPI app's merchant ID
        });

        return response.data;
    } catch (err) {
        console.error('Error generating UPI request:', err);
        return { success: false };
    }
};

export const verifyUPIPayment = async (paymentId, _upiApp, config) => {
    try {
        // Example: API call to verify payment using the selected UPI app's config
        const response = await axios.get(`https://example.com/api/upi/verify/${paymentId}`, {
            headers: {
                'Merchant-Key': config.merchantKey, // Use the selected UPI app's merchant key if needed
            },
        });

        return response.data.status; // Assuming the API returns a status field
    } catch (err) {
        console.error('Error verifying UPI payment:', err);
        return 'failed';
    }
};
