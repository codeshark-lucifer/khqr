const express = require('express');
const app = express();
const serverless = require('serverless-http');
const { BakongKHQR, khqrData, IndividualInfo, MerchantInfo, SourceInfo } = require("bakong-khqr");

const getQRData = (amount = 1000) => {
    const getIndividualInfo = () => {
        const optionalData = {
            currency: khqrData.currency.khr,
            amount: amount,
            billNumber: "#0001",
            mobileNumber: "85516677462",
            storeLabel: "CODESHARK",
            terminalLabel: "Web Payment",
            expirationTimestamp: Date.now() + (1 * 60 * 1000), // required if amount is not null or zero (eg. expired in 1 minutes)
            merchantCategoryCode: "5999", // optional: default value 5999
        };
        const individualInfo = new IndividualInfo(
            "morm_leapsovann@hdsb",
            "LEAPSOVANNMORM",
            "Phnom Penh",
            optionalData
        );
        return individualInfo;
    }
    const khqr = new BakongKHQR();
    return khqr.generateIndividual(getIndividualInfo());

};

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        "message": "Hello from the API!",
    })
})

// router.get('/qr/:amount', (req, res) => {
//     const amount = parseFloat(req.params.amount) || 1000;
//     const qrData = getQRData(amount);
//     res.json(qrData);
// });

app.use('/.netlify/functions/api', router);


module.exports.handler = serverless(app);