import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Typography,
} from "@mui/material";
import React, { useRef } from "react";
import { createChart } from "../../components/charts/LineChartUtils"; // Ensure this is the correct import path

function AnalyticsDialog({ open, onClose, transactions, userId }) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
            slotProps={{
                transition: {
                    onEntered: () => {
                        if (chartRef.current && transactions) {
                            if (chartInstance.current) {
                                chartInstance.current.destroy();
                            }
                            chartInstance.current = createChart(
                                chartRef.current,
                                transactions,
                                userId
                            );
                        }
                    },
                    onExited: () => {
                        if (chartInstance.current) {
                            chartInstance.current.destroy();
                            chartInstance.current = null;
                        }
                    },
                },
            }}
        >
            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: { xs: 2, sm: 3 },
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 700,
                        textAlign: "center",
                        marginBottom: 3,
                    }}
                >
                    Total Spending per Day
                </Typography>

                <Box
                    width={"100%"}
                    height={335}
                    py={1}
                    px={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <canvas
                        ref={chartRef}
                        style={{ width: "100%", height: "100%" }}
                    ></canvas>
                </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={onClose}
                    sx={{
                        width: { sm: "auto", xs: "100%" },
                        borderRadius: 2,
                        fontWeight: "bold",
                        px: 4,
                        py: 1,
                        boxShadow: 2,
                        transition: "all 0.3s ease",
                    }}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AnalyticsDialog;
