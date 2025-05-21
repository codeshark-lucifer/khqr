// functions/api.js
const express = require("express");
const serverless = require("serverless-http");

const { BakongKHQR, khqrData, IndividualInfo, MerchantInfo, SourceInfo } = require("bakong-khqr");

const getQRData =
    (
        billNumber = "#0001",
        mobileNumber = "85516677462",
        storeLabel = "CODESHARK",
        terminalLabel = "Web Payment",
        amount = 1000,

        userid = "morm_leapsovann@hdsb",
        username = "LEAPSOVANNMORM",
        city = "Phnom Penh",
    ) => {
        const getIndividualInfo = () => {
            const optionalData = {
                currency: khqrData.currency.khr,
                amount: amount,
                billNumber: billNumber,
                mobileNumber: mobileNumber,
                storeLabel: storeLabel,
                terminalLabel: terminalLabel,
                expirationTimestamp: Date.now() + (1 * 60 * 1000), // required if amount is not null or zero (eg. expired in 1 minutes)
                merchantCategoryCode: "5999", // optional: default value 5999
            };
            const individualInfo = new IndividualInfo(
                userid,
                username,
                city,
                optionalData
            );
            return individualInfo;
        }
        const khqr = new BakongKHQR();
        return khqr.generateIndividual(getIndividualInfo());

    };
const app = express();
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "Root endpoint of API!" });
});

router.get('/qr', (req, res) => {
    const {
        mobileNumber = "85516677462", 
        amount = "1000", 
        billNumber = "#0001", 
        storeLabel = "CODESHARK", 
        terminalLabel = "Web Payment",
        userid = "morm_leapsovann@hdsb",
        username = "LEAPSOVANNMORM",
        city = "Phnom Penh",
    } = req.query;

    const qrData = getQRData(
        billNumber,
        mobileNumber,
        storeLabel,
        terminalLabel,
        parseFloat(amount) || 1000,
        userid,
        username,
        city
    );

    res.json(qrData);
});


// IMPORTANT: must use this exact path
app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);

