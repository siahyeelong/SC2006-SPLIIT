import { useTheme } from "@emotion/react";
import React, { useContext, useState } from "react";
import { tokens } from "../../theme";
import { Box, Button, Typography } from "@mui/material";
import JoinTripDialog from "../../pages/Profile/ProfileController/JoinTripDialog";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import SnackbarNotifs from "../../components/common/SnackbarNotifs";

function JoinTripButton() {
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);
    const [joinTripDialogOpen, setJoinTripDialogOpen] = useState(false);
    const [tripID, setTripID] = useState("");
    const { user, refresh } = useContext(AuthContext);
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: "",
        severity: "",
        key: 0,
    });
    const navigate = useNavigate();

    const handleCloseDialog = () => {
        setJoinTripDialogOpen(false);
        setTripID("");
    };
    const onJoinTrip = async () => {
        const trimmedId = tripID.trim();
        const message = await user.joinTrip(trimmedId); // update the user object
        if (message.severity === "success") {
            localStorage.setItem("trip", trimmedId);
            refresh();
            navigate("/");
        }
        showSnackbar(message.message, message.severity)
    };
    const showSnackbar = (message, severity) => {
        setSnackbarState((s) => ({ ...s, open: false }));
        setTimeout(() => {
            setSnackbarState((s) => ({
                open: true,
                message,
                severity,
                key: s.key + 1,
            }));
        }, 100);
    };
    const handleCloseSnackbar = () => {
        setSnackbarState((s) => ({ ...s, open: false }));
    };
    return (
        <Box display={"flex"} alignItems={"center"}>
            <Typography mr={3}>Have a trip ID?</Typography>
            <Button
                variant="contained"
                onClick={() => setJoinTripDialogOpen(true)}
                sx={{
                    backgroundColor: colours.orangeAccent[600],
                    color: "black",
                    ":hover": {
                        backgroundColor: colours.orangeAccent[700],
                        color: colours.primary[100],
                    },
                }}
            >
                Join trip
            </Button>
            <JoinTripDialog
                open={joinTripDialogOpen}
                onClose={handleCloseDialog}
                tripId={tripID}
                setTripId={setTripID}
                onJoin={onJoinTrip}
            />
            <SnackbarNotifs
                open={snackbarState.open}
                message={snackbarState.message}
                onClose={handleCloseSnackbar}
                severity={snackbarState.severity}
                sx={{ position: "fixed", zIndex: 9999 }}
            />
        </Box>
    );
}

export default JoinTripButton;
