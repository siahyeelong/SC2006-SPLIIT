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

const DeletionConfirmationDialog = ({ open, onClose, onConfirm, tripName }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
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
                    Delete Trip
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText
                    sx={{
                        fontSize: { xs: "0.875rem", md: "1rem" },
                        lineHeight: 1.5,
                    }}
                >
                    Are you sure you want to delete{" "}
                    <strong>{tripName || "this trip"}</strong>?
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

export default DeletionConfirmationDialog;
