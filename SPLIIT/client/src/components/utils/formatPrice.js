export function formatPrice(amount) {
    if (typeof amount !== "number") return "$0.00";
    return parseFloat(amount).toLocaleString("en-SG", {
        style: "currency",
        currency: "SGD",
        minimumFractionDigits: String(amount).includes(".") ? 2 : 0,
        maximumFractionDigits: 2,
    });
}
