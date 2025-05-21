const axios = require("axios");

const md5 = "55fe6b36cbb53796ff4c2d4b25f3f2f6";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNWZiZjk0YjNjYTRiNGJmNSJ9LCJpYXQiOjE3NDc2MjA0MzgsImV4cCI6MTc1NTM5NjQzOH0.UddqOBopOO-4YmvyRdkW_MPgoVOR0PoG_rrvGHWFZqs";

async function checkTransaction(
    md5 = "55fe6b36cbb53796ff4c2d4b25f3f2f6",
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

checkTransaction();
