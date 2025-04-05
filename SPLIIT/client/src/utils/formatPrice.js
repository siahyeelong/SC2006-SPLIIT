export function formatPrice(amount, currency) {
    if (typeof amount !== "number" || amount < 0.01) return "-";
    return currency ?
        parseFloat(amount).toLocaleString("en-SG", {
            style: "currency",
            currency: currency,
            minimumFractionDigits: String(amount).includes(".") ? 2 : 0,
            maximumFractionDigits: 2,
        })
        :
        parseFloat(amount).toLocaleString("en-SG", {
            minimumFractionDigits: String(amount).includes(".") ? 2 : 0,
            maximumFractionDigits: 2,
        })
        ;
}
