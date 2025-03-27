import { Alert, Portal, Snackbar } from "@mui/material";
import React from "react";

const SnackbarNotifs = ({ key, open, message, onClose, severity }) => {
    return (
        <Portal>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={Boolean(open)}
                autoHideDuration={2000}
                onClose={onClose}
                key={key}
            >
                <Alert
                    severity={severity || "info"}
                    variant="filled"
                    sx={{ width: "100%", fontWeight: 600, fontSize: "larger" }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </Portal>
    );
};

export default SnackbarNotifs;
