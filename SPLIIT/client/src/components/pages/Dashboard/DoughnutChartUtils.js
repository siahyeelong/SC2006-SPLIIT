import Chart from "chart.js/auto";

export const CATEGORY_COLORS = {
    Food: "hsl(38, 85%, 55%)",
    Transport: "hsl(210, 85%, 50%)",
    Shopping: "hsl(150, 50%, 50%)",
    Entertainment: "hsl(340, 70%, 60%)",
    Accommodation: "hsl(270, 30%, 60%)",
    Insurance: "hsl(25, 80%, 55%)",
    Ferry: "hsl(180, 70%, 60%)",
    Others: "hsl(300, 30%, 60%)",
};

const CHART_CONFIG = {
    type: "doughnut",
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => {
                        let label = context.label || "";
                        if (label) label += ": ";
                        if (context.parsed !== null) {
                            label += new Intl.NumberFormat("en-SG", {
                                style: "currency",
                                currency: "SGD",
                            }).format(context.parsed);
                        }
                        return label;
                    },
                },
            },
        },
        animation: {
            animateScale: true,
            animateRotate: true,
        },
    },
    style: {
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverOffset: 12,
    },
};

export const calculateCategorySpending = (transactions, userId) => {
    const spending = {};
    transactions.forEach((transaction) => {
        if (transaction.recipients.includes(userId)) {
            const totalLocalAmt = transaction.isLocalCurrency ? transaction.price : transaction.price / transaction.exchangeRate
            const amount =
                parseFloat(totalLocalAmt) / transaction.recipients.length;
            spending[transaction.category] =
                (spending[transaction.category] || 0) + amount;
        }
    });
    return spending;
};

export const createSpendingChart = (
    canvas,
    userId,
    transactions,
    colors = CATEGORY_COLORS
) => {
    if (!canvas) return null;

    const spending = calculateCategorySpending(transactions, userId);
    const labels = Object.keys(spending);
    const data = Object.values(spending);

    return new Chart(canvas, {
        ...CHART_CONFIG,
        data: {
            labels,
            datasets: [
                {
                    label: `Spending - ${userId}`,
                    data,
                    backgroundColor: labels.map(
                        (label) => colors[label] || "#cccccc"
                    ),
                    ...CHART_CONFIG.style,
                },
            ],
        },
    });
};
