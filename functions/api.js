// functions/api.js
const express = require("express");
const serverless = require("serverless-http");
const axios = require("axios");

const { BakongKHQR, khqrData, IndividualInfo, MerchantInfo, SourceInfo } = require("bakong-khqr");

const getQRData =
    (
        currency = "KHR",
        billNumber = "#0001",
        mobileNumber = "855123456",
        storeLabel = "CODESHARK",
        terminalLabel = "Web Payment",
        amount = 1000,

        userid = "morm_leapsovann@hdsb",
        username = "LEAPSOVANNMORM",
        city = "Phnom Penh",
    ) => {
        
        const getIndividualInfo = () => {
            const optionalData = {
                currency: currency == "USD" ? khqrData.currency.usd : khqrData.currency.khr,
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

async function checkTransaction(
    md5,
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNWZiZjk0YjNjYTRiNGJmNSJ9LCJpYXQiOjE3NDc2MjA0MzgsImV4cCI6MTc1NTM5NjQzOH0.UddqOBopOO-4YmvyRdkW_MPgoVOR0PoG_rrvGHWFZqs"
) {
    try {
        const response = await axios.post(
            'https://api-bakong.nbc.gov.kh/v1/check_transaction_by_md5',
            { md5 },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.status === 200 && response.data.responseMessage === 'Success') {
            console.log("Transaction successful", response.data);
            return true;
        } else {
            console.log("Transaction check failed:", response.data);
            return false;
        }
    } catch (error) {
        console.error("Error during transaction check:", error.response?.data || error.message);
        return false;
    }
}
const app = express();
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "Root endpoint of API!" });
});

router.get('/qr', (req, res) => {
    const {
        currency = "KHR",
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
        currency,
        billNumber,
        mobileNumber,
        storeLabel,
        terminalLabel,
        parseFloat(amount) || 1000,
        userid,
        username,
        city
    );

    res.json({
        data: qrData.data.qr,
        md5: qrData.data.md5,
    });
});

router.get('/verify', async (req, res) => {
    const { md5, token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNWZiZjk0YjNjYTRiNGJmNSJ9LCJpYXQiOjE3NDc2MjA0MzgsImV4cCI6MTc1NTM5NjQzOH0.UddqOBopOO-4YmvyRdkW_MPgoVOR0PoG_rrvGHWFZqs" } = req.query;
    const success = await checkTransaction(md5, token);
    if (success) {
        res.json({ message: "Transaction successful" });
    } else {
        res.json({ message: "Transaction failed" });
    }
});

// IMPORTANT: must use this exact path
app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);

