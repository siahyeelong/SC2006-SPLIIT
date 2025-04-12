import Chart from "chart.js/auto";
import { formatPrice } from "../../utils/formatters";

const CHART_CONFIG = {
    type: "line",
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: "rgba(30, 30, 30, 0.9)",
                titleFont: { size: 16, weight: "600" },
                bodyFont: { size: 14 },
                padding: 14,
                cornerRadius: 8,
                displayColors: false,
                callbacks: {
                    title: (context) => {
                        const date = new Date(context[0].label);
                        return date.toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                        });
                    },
                    label: (context) =>
                        `Amount: $${context.parsed.y.toFixed(2)}`,
                },
            },
        },
        scales: {
            x: {
                type: "category",
                grid: {
                    color: "rgba(200, 200, 200, 0.25)", // Subtle grid lines
                    drawTicks: false,
                },
                ticks: {
                    color: "#aaa", // Lighter tick color
                    font: { size: 14, weight: "500" },
                    padding: 10,
                    callback: function (value, index) {
                        const dateStr = this.getLabelForValue(index);
                        const [year, month, day] = dateStr.split("-");
                        return `${new Date(year, month - 1, day).toLocaleString(
                            "default",
                            { month: "short" }
                        )} ${day}`;
                    },
                },
            },
            y: {
                // title: {
                //     display: true,
                //     text: "Total Spending",
                //     font: { size: 16, weight: "700" },
                //     color: "#222",
                // },
                title: {
                    display: false,
                },
                beginAtZero: true,
                grid: {
                    color: "rgba(200, 200, 200, 0.25)", // Subtle grid lines
                    drawBorder: false,
                },
                ticks: {
                    color: "#aaa", // Lighter tick color
                    font: { size: 14, weight: "500" },
                    padding: 10,
                    callback: (value) => `${formatPrice(value)}`,
                },
            },
        },
        elements: {
            line: {
                tension: 0.3, // Slightly lower tension for more angular curves
                borderWidth: 4, // Thicker border for line
                fill: true,
            },
            point: {
                radius: 6, // Larger points for better visibility
                hoverRadius: 10, // Larger hover area
                backgroundColor: "white",
                borderWidth: 4,
            },
        },
        animation: {
            duration: 1000, // Smoother animation
            easing: "easeInOutQuad",
        },
    },
};

// Function to generate random data (for testing or different charts)
// const generateRandomData = (numPoints) => {
//     return Array.from({ length: numPoints }, () =>
//         Math.floor(Math.random() * 100)
//     ); // Random values from 0 to 99
// };

export const createChart = (canvas, transactions, userId) => {
    if (!canvas || !transactions) return null;

    // Aggregate daily totals
    const dailyTotals = transactions.reduce((acc, transaction) => {
        if (!transaction.recipients.includes(userId)) return acc;

        const date = transaction.timestamp.split("T")[0];
        const totalLocalAmt = transaction.isLocalCurrency
            ? transaction.price
            : transaction.price / transaction.exchangeRate;
        const amount =
            parseFloat(totalLocalAmt) / transaction.recipients.length;
        acc[date] = (acc[date] || 0) + amount;
        return acc;
    }, {});

    // Sort dates and format for chart
    const sortedDates = Object.keys(dailyTotals).sort(
        (a, b) => new Date(a) - new Date(b)
    );

    const dataPoints = sortedDates.map((date) =>
        Number(dailyTotals[date].toFixed(2))
    );

    // Create the chart
    return new Chart(canvas, {
        ...CHART_CONFIG,
        data: {
            labels: sortedDates,
            datasets: [
                {
                    label: "Daily Spending",
                    data: dataPoints,
                    borderColor: "hsl(200, 100%, 50%)", // Modern color scheme
                    backgroundColor: (context) => {
                        const gradient = context.chart.ctx.createLinearGradient(
                            0,
                            0,
                            0,
                            400
                        );
                        gradient.addColorStop(0, "rgba(0, 119, 204, 0.5)"); // Lighter gradient
                        gradient.addColorStop(1, "rgba(0, 119, 204, 0.1)");
                        return gradient;
                    },
                    pointBackgroundColor: "white",
                    pointBorderColor: "hsl(200, 100%, 50%)",
                    pointHoverBorderColor: "hsl(200, 100%, 60%)",
                    pointHoverBackgroundColor: "white",
                },
            ],
        },
    });
};
