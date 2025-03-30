import { React, useState } from "react";
import { Box } from "@mui/material";
import Header from "../MainUI/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import LogTransactionForm from "./LogTransactionForm";
import SnackbarNotifs from "../TripInfo/SnackbarNotifs";

function LogTransaction() {
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: "",
        severity: "",
        key: 0,
    });

    const showSnackbar = (message, severity) => {
        setSnackbarState((s) => ({
            open: true,
            message,
            severity,
            key: s.key + 1,
        }));
    };

    const handleCloseSnackbar = () => {
        setSnackbarState((s) => ({ ...s, open: false }));
    };

    const handleAddTransaction = (message, severity) => {
        showSnackbar(message, severity);
    };

    return (
        <>
            <Box m="20px">
                <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Header
                        title={"Log Transaction"}
                        subtitle={"Log an expense here"}
                    />
                </Box>
                <LogTransactionForm onAdd={handleAddTransaction} />
            </Box>

            <SnackbarNotifs
                open={snackbarState.open}
                message={snackbarState.message}
                onClose={handleCloseSnackbar}
                severity={snackbarState.severity}
            />
        </>
    );
}

export default LogTransaction;
