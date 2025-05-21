# KHQR Code Generator API (Serverless)

This is a serverless Express.js API deployed via Netlify Functions that generates **Bakong KHQR** codes for payments. It supports customization of QR data through query parameters.

## 🔧 Features

- Generate KHQR payment codes with default or custom values
- Supports individual sender details
- Customizable via URL query parameters
- Built on `express`, `serverless-http`, and `bakong-khqr`

## 📦 Dependencies

- [express](https://www.npmjs.com/package/express)
- [serverless-http](https://www.npmjs.com/package/serverless-http)
- [bakong-khqr](https://www.npmjs.com/package/bakong-khqr)

## 📁 Project Structure

```
functions/
└── api.js       # Main Express app with serverless handler
```

## 🚀 Usage

### 1. Start local development server (via Netlify CLI)

```bash
npm install
netlify dev 
```
*** Make Sure *** 
````
npm install -g netlify-cli 
```

### 2. Available Endpoints

#### ➤ Root Test
```http
GET /.netlify/functions/api/
```

Response:
```json
{ "message": "Root endpoint of API!" }
```

---

#### ➤ Generate QR with Custom Parameters

```http
GET /.netlify/functions/api/qr?username=LEAPSOVANNMORM&amount=1200&userid=morm_leapsovann@hdsb&city=Phnom%20Penh
```

**Supported query parameters:**

| Parameter       | Default Value           | Description                |
|----------------|--------------------------|----------------------------|
| `username`      | `LEAPSOVANNMORM`         | Name of individual         |
| `userid`        | `morm_leapsovann@hdsb`   | Unique user ID             |
| `mobileNumber`  | `85516677462`            | Phone number (e.g. KH)     |
| `amount`        | `1000`                   | Payment amount (in KHR)    |
| `billNumber`    | `#0001`                  | Invoice or bill reference  |
| `storeLabel`    | `CODESHARK`              | Label for store            |
| `terminalLabel` | `Web Payment`            | Payment method label       |
| `city`          | `Phnom Penh`             | City of payer              |

---

## 🧪 Example

```bash
curl "http://localhost:8888/.netlify/functions/api/qr?username=LEAPSOVANNMORM&amount=1200&userid=morm_leapsovann@hdsb&city=Phnom%20Penh"
```

---

## 📤 Deployment

This API is deployed on **Netlify Functions**. Simply push to your connected Git repository and Netlify will handle deployment.

---

## 📄 License

MIT
