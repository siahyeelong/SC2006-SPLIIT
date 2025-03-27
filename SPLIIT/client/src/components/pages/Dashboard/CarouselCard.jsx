import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { TransactionsContext } from ".";
import {
    Box,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@mui/material";
import { People } from "../../classes/People";
import { Categories } from "../../classes/Categories";
import { MyResponsivePie } from "./MyResponsivePie";
import AnalyticsDialog from "./AnalyticsDialog";

function CarouselCard({ ower, matrix }) {
    const transactions = useContext(TransactionsContext);
    let totalSpent = 0;

    const [showAnalyticsDialog, setShowAnalyticsDialog] = useState(false);

    const spentPerCategory = {};
    Object.keys(Categories).forEach((cat) => {
        spentPerCategory[cat] = 0;
    });

    // for each transaction
    transactions.forEach((transaction) => {
        if (transaction.recipients.indexOf(ower.identifier) > -1) {
            const amount = transaction.SGD / transaction.recipients.length;
            // sum up SGD if ower is in recipients array
            totalSpent += amount;
            // sum up amount spent for each category
            spentPerCategory[transaction.category] += amount;
        }
    });

    let pieChartData = [];
    Object.keys(Categories).forEach((cat) => {
        pieChartData.push({
            id: cat,
            label: cat,
            value: spentPerCategory[cat],
            color: Categories[cat].colour,
        });
    });

    function formatPrice(amount) {
        return parseFloat(amount).toLocaleString("en-SG", {
            style: "currency",
            currency: "SGD",
            minimumFractionDigits: String(amount).includes(".") ? 2 : 0, // If there's a decimal, show 2 decimal places
            maximumFractionDigits: 2, // Cap at 2 decimal places
        });
    }

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

                    {/* Display donut chart */}
                    <Box
                        height={220}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            backgroundColor: "#ffffff55",
                            borderRadius: 2,
                            mb: 2,
                        }}
                    >
                        <MyResponsivePie
                            key={ower.identifier}
                            data={pieChartData}
                        />
                    </Box>

                    {/* Display debts */}
                    {matrix &&
                        Object.values(matrix).some((amount) => amount !== 0) ? (
                        <>
                            <Divider
                                variant="middle"
                                sx={{
                                    "&::before, &::after": {
                                        borderColor: "#363636",
                                    },
                                    py: 1,
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    To pay:
                                </Typography>
                            </Divider>
                            <Box key={`${ower.identifier}box`} sx={{ mt: 1 }}>
                                <Table
                                    sx={{ minWidth: 100 }}
                                    aria-label="simple table"
                                >
                                    <TableBody>
                                        {Object.entries(matrix).map(
                                            ([owed, amount]) => {
                                                if (amount === 0) return null;
                                                return (
                                                    <TableRow
                                                        key={`${ower.identifier}owes${owed}who`}
                                                        sx={{
                                                            maxHeight: "10px",
                                                        }}
                                                    >
                                                        <TableCell
                                                            align="left"
                                                            sx={{
                                                                padding: 0.5,
                                                                border: 0,
                                                                color: "#36332b",
                                                                fontSize:
                                                                    "0.85rem",
                                                            }}
                                                        >
                                                            {
                                                                People[owed]
                                                                    .displayName
                                                            }
                                                        </TableCell>
                                                        <TableCell
                                                            align="right"
                                                            sx={{
                                                                padding: 0.5,
                                                                border: 0,
                                                                color: "#36332b",
                                                                fontSize:
                                                                    "0.85rem",
                                                                fontWeight:
                                                                    "bold",
                                                            }}
                                                        >
                                                            {formatPrice(
                                                                amount
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            }
                                        )}
                                    </TableBody>
                                </Table>
                            </Box>
                        </>
                    ) : null}
                </CardContent>
            </CardActionArea>

            {/* Optional: If you want the Analytics Dialog to appear */}

            {/* <AnalyticsDialog
                key={ower.identifier}
                open={showAnalyticsDialog}
                onClose={() => setShowAnalyticsDialog(false)}
                data={pieChartData}
                keepMounted={false}
            /> */}
        </Card>
    );
}

export default CarouselCard;
