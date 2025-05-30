import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    List,
    ListItem,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import { formatPrice } from "../../../utils/formatters";
import { CheckCircle } from "@mui/icons-material";
import { AuthContext } from "../../../contexts/AuthContext";

function SimplifiedDebtDialog({ open, onClose, transactions, people }) {
    const theme = useTheme();
    const { trip } = useContext(AuthContext);

    // Transform the debtMatrixS (passed as transactions) into an array of simplified debt items.
    // Each key in transactions is the payer ("from") and each inner key is the recipient ("to").
    const simplifiedDebtList = [];
    if (transactions) {
        Object.keys(transactions).forEach((from) => {
            const owes = transactions[from];
            Object.keys(owes).forEach((to) => {
                const amount = parseFloat(owes[to]) || 0;
                // Only include non-zero debts
                if (amount > 0.01) {
                    simplifiedDebtList.push({ from, to, amount });
                }
            });
        });
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
            sx={{
                borderRadius: 3,
                boxShadow: 4,
                overflow: "hidden",
            }}
        >
            <DialogContent sx={{ p: 4 }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        textAlign: "center",
                        mb: 3,
                    }}
                >
                    Simplified Debt Strategy
                </Typography>
                <Divider sx={{ mb: 3, border: "0.5px solid" }} />

                {/* List of simplified debt */}
                <List
                    dense
                    sx={{
                        mb: 4,
                        borderRadius: 2,
                        boxShadow: 1,
                    }}
                >
                    {simplifiedDebtList.length > 0 ? (
                        simplifiedDebtList.map((t, index) => (
                            <ListItem
                                key={index}
                                sx={{
                                    py: 2,
                                    px: 3,
                                    borderBottom:
                                        index !== simplifiedDebtList.length - 1
                                            ? `1px solid ${theme.palette.divider}`
                                            : "none",
                                    transition:
                                        "background-color 0.2s ease-in-out",
                                    cursor: "pointer",
                                    "&:hover": {
                                        backgroundColor:
                                            theme.palette.action.hover,
                                    },
                                }}
                            >
                                <ListItemText
                                    primary={
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    fontWeight: 600,
                                                    color: theme.palette.error
                                                        .main,
                                                    minWidth: "80px",
                                                }}
                                            >
                                                {people[t.from]
                                                    ? people[t.from].displayName
                                                    : t.from}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                sx={{ mx: 1, fontWeight: 600 }}
                                            >
                                                →
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    fontWeight: 600,
                                                    color: theme.palette.success
                                                        .main,
                                                    minWidth: "80px",
                                                }}
                                            >
                                                {people[t.to]
                                                    ? people[t.to].displayName
                                                    : t.to}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    fontWeight: 700,
                                                    color: theme.palette.text
                                                        .primary,
                                                    ml: 2,
                                                }}
                                            >
                                                {formatPrice(
                                                    t.amount,
                                                    trip.localCurrency
                                                )}
                                            </Typography>
                                        </Box>
                                    }
                                />
                            </ListItem>
                        ))
                    ) : (
                        <Box sx={{ textAlign: "center", py: 4 }}>
                            <CheckCircle
                                color="success"
                                sx={{
                                    fontSize: 60,
                                }}
                            />
                            <Typography
                                variant="body1"
                                sx={{ mt: 1, fontWeight: 600 }}
                            >
                                All debt settled
                            </Typography>
                        </Box>
                    )}
                </List>

                <DialogActions sx={{ justifyContent: "center", pt: 0 }}>
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
            </DialogContent>
        </Dialog>
    );
}

export default SimplifiedDebtDialog;
