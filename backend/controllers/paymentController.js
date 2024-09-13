import {paymentConfig} from '../config/paymentConfig.js';
import {generateUPIRequest, verifyUPIPayment} from '../services/paymentService.js';

export const createPaymentRequest = async(req, res) => {
    const {totalAmount, upiApp} = req.body;

    try {
        // get the corresponding configuration based on selected upi app
        let paymentConfigDetails;
        switch (upiApp) {
            case 'paytm':
                paymentConfigDetails = paymentConfig.paytm;
                break;
            case 'phonepe':
                paymentConfigDetails = paymentConfig.phonePe;    
                break;
            case 'gpay':
                paymentConfigDetails = paymentConfig.gpay;    
                break;
            case 'bharatpe':
                paymentConfigDetails = paymentConfig.bharatPe;    
                break;
            default:
                return res.status(400).json({msg: 'Unsupported UPI app'});
        }

        // generate upi payment requst using the selected app's config
        const paymentRequest = await generateUPIRequest(totalAmount, upiApp, paymentConfigDetails);

        if(paymentRequest.success) {
            res.json({paymentUrl: paymentRequest.paymentUrl });
        } else {
            res.status(400).json({msg: 'Failed to create payment request'});
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

// Confirm UPI Payment
export const confirmPayment = async (req, res) => {
    const { paymentId, upiApp } = req.body;

    try {
        // Get the corresponding configuration based on selected UPI app
        let paymentConfigDetails;
        switch (upiApp) {
            case 'paytm':
                paymentConfigDetails = paymentConfig.paytm;
                break;
            case 'phonepe':
                paymentConfigDetails = paymentConfig.phonePe;
                break;
            case 'gpay':
                paymentConfigDetails = paymentConfig.gpay;
                break;
            case 'bharatpe':
                paymentConfigDetails = paymentConfig.bharatPe;
                break;
            default:
                return res.status(400).json({ msg: 'Unsupported UPI app' });
        }

        // Verify UPI payment status
        const paymentStatus = await verifyUPIPayment(paymentId, upiApp, paymentConfigDetails);

        if (paymentStatus === 'success') {
            res.json({ success: true });
        } else {
            res.status(400).json({ msg: 'Payment failed or pending' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};