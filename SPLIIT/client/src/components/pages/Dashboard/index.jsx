import { React, useState, useEffect, createContext } from "react";
import { Box, Typography, Button, Stack, useTheme } from "@mui/material";
import Header from "../MainUI/Header";
import Carousel from "./Carousel";
import SimplifiedDebtDialog from "./SimplifiedDebtDialog";

export const TransactionsContext = createContext([]);

function Dashboard() {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const theme = useTheme();

    function fetchTransactions() {
        const backendURL = process.env.REACT_APP_BACKEND_URL;
        fetch(`${backendURL}/transactions/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setTransactions(data || []);
            })
            .catch((error) => {
                setError(
                    "Failed to fetch transactions. Please try again later."
                );
                console.error("Error fetching data:", error);
            });
    }

    useEffect(() => fetchTransactions(), []);

    return (
        <>
            <Box
            // sx={{
            //     padding: { xs: 2, sm: 3 },
            //     maxWidth: { xs: "100%", md: 1200, lg: 1400 },
            //     margin: "0 auto",
            //     boxSizing: "border-box",
            // }}
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                    sx={{ mb: 3 }}
                >
                    <Header title="Dashboard" subtitle="View analytics" />
                    {/* Example "Simplify debts" button on the right */}
                    <Button
                        variant="contained"
                        color="info"
                        onClick={() => setDialogOpen(true)}
                        sx={{
                            fontWeight: "bold",
                            textTransform: "none",
                            borderRadius: 2,
                            px: { xs: 2, md: 3 },
                            py: { xs: 1, md: 1.5 },
                            boxShadow: 3,
                        }}
                    >
                        Simplify debts
                    </Button>
                </Stack>
            </Box>

            {/* Main Background Container */}
            <Box
                sx={{
                    backgroundColor: theme.palette.background.default,
                    minHeight: "100vh",
                    mt: { xs: 2, md: 4 },
                }}
            >
                <Box sx={{ marginTop: "20px" }}>
                    <TransactionsContext.Provider value={transactions}>
                        {error !== "" ? (
                            <Typography
                                color="error"
                                sx={{ textAlign: "center" }}
                            >
                                Something went wrong
                            </Typography>
                        ) : (
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignContent="center"
                                sx={{ marginTop: "20px" }}
                            >
                                <Carousel />
                            </Box>
                        )}
                    </TransactionsContext.Provider>
                </Box>
            </Box>

            {/* <SimplifiedDebtDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                transactions={transactionsData} // placeholder for simplified data
            /> */}
        </>
    );
}

export default Dashboard;
