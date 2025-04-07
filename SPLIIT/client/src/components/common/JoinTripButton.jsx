import { useTheme } from "@emotion/react";
import React, { useContext, useState } from "react";
import { tokens } from "../../theme";
import { Box, Button, Typography } from "@mui/material";
import JoinTripDialog from "../../pages/Profile/JoinTripDialog";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function JoinTripButton() {
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);
    const [joinTripDialogOpen, setJoinTripDialogOpen] = useState(false);
    const [tripID, setTripID] = useState("");
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleCloseDialog = () => {
        setJoinTripDialogOpen(false);
        setTripID("");
    };
    const onJoinTrip = async () => {
        const trimmedId = tripID.trim();

        const message = await user.joinTrip(trimmedId); // update the user object

        navigate("/");
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
        </Box>
    );
}

export default JoinTripButton;
