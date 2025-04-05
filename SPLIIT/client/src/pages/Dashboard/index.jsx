import React, { createContext, useState } from "react";
import { Box, Typography, Button, Stack, useTheme } from "@mui/material";
import Header from "../../layouts/Header";
import Carousel from "./Carousel";
import SimplifiedDebtDialog from "./SimplifiedDebtDialog";
import { useDashboardData } from "../../hooks/useDashboardData";

export const TransactionsContext = createContext([]);

function Dashboard() {
    const { transactions, debtMatrix_R, debtMatrix_S, people, error } =
        useDashboardData();
    const [dialogOpen, setDialogOpen] = useState(false);
    const theme = useTheme();

    return (
        <>
            <Box>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                    sx={{ mb: 3 }}
                >
                    <Header title="Dashboard" subtitle="View analytics" />
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
                                {/* Pass matrices as props */}
                                <Carousel
                                    debtMatrix_R={debtMatrix_R}
                                    debtMatrix_S={debtMatrix_S}
                                    people={people}
                                />
                            </Box>
                        )}
                    </TransactionsContext.Provider>
                </Box>
            </Box>

            <SimplifiedDebtDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                transactions={debtMatrix_S} // Pass simplified debt matrix
                people={people}
            />
        </>
    );
}

export default Dashboard;
