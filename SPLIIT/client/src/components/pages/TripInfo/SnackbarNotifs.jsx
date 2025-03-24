import { Snackbar } from "@mui/material";
import React from "react";

const SnackbarNotifs = ({ open, message, onClose }) => {
    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={open}
            autoHideDuration={2000}
            onClose={onClose}
            message={message}
        />
    );
};

export default SnackbarNotifs;
