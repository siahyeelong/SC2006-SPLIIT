const backendURL = process.env.REACT_APP_BACKEND_URL;

export class Transaction {

    constructor(transaction) {
        this.recipients = transaction.recipients || [];
        this.category = transaction.category || "";
        this.price = transaction.price || "";
        this.currency = transaction.currency || "Unknown";
        this.isLocalCurrency = transaction.isLocalCurrency;
        this.exchangeRate = transaction.exchangeRate;
        this.description = transaction.description || "";
        this.payer = transaction.payer || "";
        this.tripID = transaction.tripID || "Unknown";
        this.geolocation = transaction.geolocation || "";
    }

    async submit() {
        try {
            const response = await fetch(`${backendURL}/transactions/newtransaction`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching data:", error);
            return "Error fetching data";
        }
    }
}