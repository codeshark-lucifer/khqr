# 🚀 KHQR Code Generator API (Serverless)

A **serverless Express.js API** deployed with **Netlify Functions** that generates **Bakong KHQR** codes for payments. Easily customizable using URL query parameters, this API is ideal for integrating QR-based payments into Cambodian fintech applications.

---

## ✨ Features

- 🔄 Generate KHQR-compliant payment codes
- ⚙️ Customize sender details via query parameters
- ✅ Verify transactions using a simple API call
- 🔒 Secure and stateless – runs as a serverless function
- 🧱 Built with `express`, `serverless-http`, and `bakong-khqr`

---

## 📦 Tech Stack & Dependencies

| Package          | Description                        |
|------------------|------------------------------------|
| [`express`](https://www.npmjs.com/package/express)          | Web framework for handling routes |
| [`serverless-http`](https://www.npmjs.com/package/serverless-http) | Adapts Express to work with Netlify Functions |
| [`bakong-khqr`](https://www.npmjs.com/package/bakong-khqr)        | Library for generating KHQR payment data |

---

## 📁 Project Structure

```
functions/
└── api.js       # Main Express app with serverless handler
```

---

## 🧑‍💻 Getting Started

### ✅ Prerequisites

Ensure you have the Netlify CLI installed:

```bash
npm install -g netlify-cli
```

### ▶️ Start Local Development

```bash
npm install
netlify dev
```

This will spin up a local serverless environment at `http://localhost:8888`.

---

## 📡 API Endpoints

### 🔹 Root Test

Test if the API is working:

```http
GET /.netlify/functions/api/
```

**Response:**
```json
{ "message": "Root endpoint of API!" }
```

---

### 🔹 Generate KHQR Code

```http
GET /.netlify/functions/api/qr?username=LEAPSOVANNMORM&amount=1200&userid=morm_leapsovann@hdsb&city=Phnom%20Penh
```

#### Supported Query Parameters:

| Parameter       | Default Value           | Description                      |
|----------------|--------------------------|----------------------------------|
| `username`      | `LEAPSOVANNMORM`         | Name of the payer                |
| `userid`        | `morm_leapsovann@hdsb`   | Unique user ID or wallet address |
| `mobileNumber`  | `85516677462`            | Mobile number (in KH format)     |
| `amount`        | `1000`                   | Payment amount in KHR            |
| `billNumber`    | `#0001`                  | Invoice or bill reference        |
| `storeLabel`    | `CODESHARK`              | Label for the store              |
| `terminalLabel` | `Web Payment`            | Label for the payment method     |
| `city`          | `Phnom Penh`             | City of the payer                |

---

### 🔹 Verify Transaction Status

Use this endpoint to check whether a transaction linked to a KHQR code was successfully completed using its **MD5 hash**.

```http
GET /.netlify/functions/api/verify?md5=your_md5_hash_here
```

#### Query Parameters:

| Parameter | Required | Description                              |
|-----------|----------|------------------------------------------|
| `md5`     | ✅        | The MD5 hash of the generated KHQR code |
| `token`   | ❌        | API token (optional – a default is used if not provided) |

> 🔐 The default token is provided for development purposes. For production, it’s recommended to securely supply your own.

#### ✅ Successful Response

```json
{
  "message": "Transaction successful"
}
```

#### ❌ Failed or Pending Response

```json
{
  "message": "Transaction failed"
}
```

---

## 🧪 Example Usage

### cURL (Local)

```bash
curl "http://localhost:8888/.netlify/functions/api/qr?username=LEAPSOVANNMORM&amount=1200&userid=morm_leapsovann@hdsb&city=Phnom%20Penh"
```

```bash
curl "http://localhost:8888/.netlify/functions/api/verify?md5=PUT_YOUR_MD5_HERE"
```

### cURL (Production)

```bash
curl "https://khqr-api.netlify.app/.netlify/functions/api/qr?username=LEAPSOVANNMORM&amount=1200&userid=morm_leapsovann@hdsb&city=Phnom%20Penh"
```

```bash
curl "https://khqr-api.netlify.app/.netlify/functions/api/verify?md5=PUT_YOUR_MD5_HERE"
```

---

## 🚀 Deployment

This project is automatically deployed to **Netlify**. Any changes pushed to the connected GitHub repository will trigger a redeployment.

---

## 📄 License

MIT License
