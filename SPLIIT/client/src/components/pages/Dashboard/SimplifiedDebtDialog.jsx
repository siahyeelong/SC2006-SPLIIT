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
import React from "react";

// transaction is placeholder for simplified debt
function SimplifiedDebtDialog({ open, onClose, transactions }) {
    const theme = useTheme();

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

                {/* Simplified debt list */}
                <List
                    dense
                    sx={{
                        mb: 4,
                        borderRadius: 2,
                        boxShadow: 1,
                    }}
                >
                    {transactions.map((t, index) => (
                        <ListItem
                            key={index}
                            sx={{
                                py: 2,
                                px: 3,
                                borderBottom:
                                    index !== transactions.length - 1
                                        ? `1px solid ${theme.palette.divider}`
                                        : "none",
                                transition: "background-color 0.2s ease-in-out",
                                cursor: "pointer",
                                "&:hover": {
                                    backgroundColor: theme.palette.action.hover,
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
                                                color: theme.palette.error.main,
                                                minWidth: "80px",
                                            }}
                                        >
                                            {t.from}
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
                                            {t.to}
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
                                            {t.amount}
                                        </Typography>
                                    </Box>
                                }
                            />
                        </ListItem>
                    ))}
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
