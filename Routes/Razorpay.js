import Razorpay from 'razorpay';
import express from 'express';
import crypto from 'crypto';

const router = express.Router();
const secretKey = process.env.secret_key;

const razorpay = new Razorpay({
    key_id: 'rzp_test_QCD690k2QQNE4x',
    key_secret: 'FPtHdE56AYKFWYhS3YqmoZs6',
});

router.post('/order', async (req, res) => {

    const razorpay = new Razorpay({
        key_id: 'rzp_test_QCD690k2QQNE4x',
        key_secret: 'FPtHdE56AYKFWYhS3YqmoZs6',
    });
    // Setting up options for razorpay:
    const options = {
        amount: req.body.amount,
        currency: req.body.currency,
        receipt: "any unique id",
        payment_capture: 1,
    };

    try {
        const response = await razorpay.orders.create(options);

        return res.status(200).json({
            order_id: response.id,
            currency: response.currency,
            amount: response.amount,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send('Not able to create an order, Please Try again');
    }
});

router.post('/paymentCapture', (req, res) => {
    // Validation:
    const data = crypto.createHmac('sha256', secretKey);
    data.update(JSON.stringify(req.body));
    const digest = data.digest('hex');

    if (digest === req.headers['x-razorpay-signature']) {
        console.log('request is legit');
        return res.status(200).json({
            status: 'ok',
        });
    } else {
        return res.status(400).send('Invalid Signature');
    }
});

// Refund:
router.post('/refund', async (req, res) => {
    try {
        // Verification of Payment Id:
        const options = {
            key_id: req.body.paymentId,
            amount: req.body.amount,
        };

        const razorpayResponse = await razorpay.refund(options);
        return res.status(200).send('Successfully Refunded');
    } catch (error) {
        console.log(error);
        return res.status(400).send('Unable to Issue a refund');
    }
});

export const PaymentRouter = router;
