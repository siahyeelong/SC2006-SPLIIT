export function formatPrice(amount, currency) {
    if (typeof amount !== "number" || amount < 0.01) return "-";
    return currency
        ? parseFloat(amount).toLocaleString("en-SG", {
              style: "currency",
              currency: currency,
              minimumFractionDigits: String(amount).includes(".") ? 2 : 0,
              maximumFractionDigits: 2,
          })
        : parseFloat(amount).toLocaleString("en-SG", {
              minimumFractionDigits: String(amount).includes(".") ? 2 : 0,
              maximumFractionDigits: 2,
          });
}

export const formatNumberWithCommas = (value) => {
    // Remove any non-numeric characters except for the decimal point
    const numberPart = value.replace(/[^0-9.]/g, "");

    // Separate the integer and decimal parts
    const [integerPart, decimalPart] = numberPart.split(".");

    // Format the integer part with commas
    const formattedIntegerPart = integerPart.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
    );

    // If there's a decimal part, ensure it's properly formatted with up to 2 decimal places
    const formattedDecimalPart = decimalPart
        ? "." + decimalPart.slice(0, 2) // Limit decimal to 2 places
        : "";

    // Return the formatted number with or without decimal
    return numberPart.endsWith(".")
        ? formattedIntegerPart + "."
        : formattedIntegerPart + formattedDecimalPart;
};
