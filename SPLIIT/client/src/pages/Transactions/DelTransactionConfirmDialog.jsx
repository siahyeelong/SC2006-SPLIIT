import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Typography,
} from "@mui/material";

const DeleteTransactionConfirmationDialog = ({
    open,
    onClose,
    onConfirm,
    transaction,
}) => {
    if (!transaction) return;
    return (
        <Dialog
            open={open}
            onClose={onClose}
            disableRestoreFocus
            sx={{
                "& .MuiPaper-root": {
                    width: { xs: "90%", sm: "80%", md: "400px" },
                    maxWidth: "500px!important",
                    margin: { xs: "16px", md: "32px" },
                    borderRadius: 2,
                },
            }}
        >
            <DialogTitle>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: { xs: "1.25rem", md: "1.5rem" },
                        fontWeight: 600,
                    }}
                >
                    Delete Transaction
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText
                    sx={{
                        fontSize: { xs: "0.875rem", md: "1rem" },
                        lineHeight: 1.5,
                    }}
                >
                    Are you sure you want to delete this transaction?
                    <br />
                    This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ padding: 3 }}>
                <Button
                    onClick={onClose}
                    sx={{
                        padding: { xs: "6px 12px", md: "8px 16px" },
                        fontSize: { xs: "0.875rem", md: "1rem" },
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={onConfirm}
                    color="error"
                    sx={{
                        padding: { xs: "6px 12px", md: "8px 16px" },
                        fontSize: { xs: "0.875rem", md: "1rem" },
                    }}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteTransactionConfirmationDialog;
