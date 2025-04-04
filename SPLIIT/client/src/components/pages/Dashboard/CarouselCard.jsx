import React, { useContext, useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { TransactionsContext } from ".";
import { Box } from "@mui/material";
import { Categories } from "../../classes/Categories";
import AnalyticsDialog from "./AnalyticsDialog";
import { createSpendingChart } from "./DoughnutChartUtils";
import DebtTable from "./DebtTable";
import { SentimentNeutral } from "@mui/icons-material";
import { formatPrice } from "../../utils/formatPrice";

function CarouselCard({ ower, matrix }) {
    const transactions = useContext(TransactionsContext);
    let totalSpent = 0;

    const [showAnalyticsDialog, setShowAnalyticsDialog] = useState(false);
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null); // Store Chart.js instance

    useEffect(() => {
        if (chartRef.current) {
            // Destroy existing chart before creating a new one
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            // Filter transactions for this specific user
            const userTransactions = transactions.filter((transaction) =>
                transaction.recipients.includes(ower.username)
            );

            // create chart only if there is spending
            if (userTransactions.length > 0) {
                chartInstanceRef.current = createSpendingChart(
                    chartRef.current,
                    ower.username,
                    userTransactions
                );
            }
        }

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
                chartInstanceRef.current = null;
            }
        };
    }, [ower.username, transactions]);

    // Calculate spending per category and total spent
    const spentPerCategory = {};
    Object.keys(Categories).forEach((cat) => {
        spentPerCategory[cat] = 0;
    });

    transactions.forEach((transaction) => {
        if (transaction.recipients.includes(ower.username)) {
            const totalLocalAmt = transaction.isLocalCurrency ? transaction.price : transaction.price / transaction.exchangeRate
            const amount =
                parseFloat(totalLocalAmt) / transaction.recipients.length;
            totalSpent += amount;
            spentPerCategory[transaction.category] += amount;
        }
    });

    return (
        <Card
            sx={{
                width: 280,
                backgroundColor: ower.favColour,
                color: "#36332b",
                borderRadius: 3,
                boxShadow: 4,
                margin: 2,
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: 6,
                },
            }}
        >
            <CardActionArea
                onClick={() => setShowAnalyticsDialog(true)}
                sx={{ minHeight: "440px" }}
            >
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h4"
                        fontWeight="bold"
                        sx={{ mb: 1 }}
                    >
                        {ower.displayName}
                    </Typography>
                    <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="baseline"
                        sx={{ mb: 2 }}
                    >
                        <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold", pr: 1 }}
                        >
                            Total Spent:
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                            {formatPrice(totalSpent)}
                        </Typography>
                    </Box>

                    {/* Doughnut Chart or Placeholder */}
                    {totalSpent > 0 ? (
                        <Box
                            height={220}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                backgroundColor: "#ffffff55",
                                borderRadius: 2,
                                py: 1,
                                marginBottom: 2,
                                width: "100%",
                                overflow: "hidden",
                            }}
                        >
                            <canvas
                                ref={chartRef}
                                style={{ width: "100%", height: "100%" }}
                            ></canvas>
                        </Box>
                    ) : (
                        <Box
                            height={220}
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                backgroundColor: "#ffffff55",
                                borderRadius: 2,
                                py: 1,
                                marginBottom: 2,
                                width: "100%",
                            }}
                        >
                            <SentimentNeutral
                                sx={{ fontSize: 48, color: "#aaa" }}
                            />
                            <Typography
                                variant="subtitle1"
                                sx={{ color: "#aaa", mt: 1 }}
                            >
                                No spendings yet
                            </Typography>
                        </Box>
                    )}

                    {/* Debt Table Integration */}
                    <DebtTable
                        key={Date.now()}
                        matrix={matrix}
                        ower={ower}
                        formatPrice={formatPrice}
                    />
                </CardContent>
            </CardActionArea>

            {/* Optional: AnalyticsDialog component can be integrated here */}
            <AnalyticsDialog
                open={showAnalyticsDialog}
                onClose={() => setShowAnalyticsDialog(false)}
                transactions={transactions}
                userId={ower.username}
            />
        </Card>
    );
}

export default CarouselCard;
