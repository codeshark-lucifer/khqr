async function getQR(amount = 1000) {
    try {
        const url = "https://localhost:3000"
        const response = await fetch(`${url}/qr/${amount}`);
        const json = await response.json();
        return json;
    } catch (err) {
        console.error("Error fetching QR data:", err);
        return "";
    }
}
