import React, { useContext, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { Create, GroupAdd } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import JoinTripDialog from "./JoinTripDialog";
import { AuthContext } from "../../../contexts/AuthContext";

const AddConfirmationDialog = ({
    open,
    onClose,
    onJoinResult,
    user,
    setProfile,
}) => {
    const [joinTripDialogOpen, setJoinTripDialogOpen] = useState(false);
    const [tripId, setTripId] = useState("");
    const navigate = useNavigate();
    const { refresh } = useContext(AuthContext)

    const handleClickJoinTrip = () => {
        setJoinTripDialogOpen(true);
    };

    const handleJoinTripSubmit = async () => {
        const trimmedId = tripId.trim();

        const message = await user.joinTrip(trimmedId); // update the user object
        setProfile((p) => ({
            ...p,
            trips: p.trips.includes(trimmedId) ? p.trips : [...p.trips, trimmedId]
        })); // update tempProfile to show live changes

        if (message.severity === "success") {
            localStorage.setItem("trip", trimmedId);
            setJoinTripDialogOpen(false);
            onClose();
            refresh();
        }

        onJoinResult(message);
        navigate("/profile");
    };

    const handleCloseDialog = () => {
        setJoinTripDialogOpen(false);
        setTripId("");
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                maxWidth="md"
                disableRestoreFocus
            >
                <DialogTitle>
                    <Typography
                        variant="h6"
                        gutterBottom
                        textAlign={"center"}
                        borderRadius={"5px"}
                        sx={{
                            fontSize: { xs: "1.25rem", md: "1.5rem" },
                            fontWeight: 600,
                        }}
                    >
                        Add Trip
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid2
                        container
                        spacing={{ xs: 2, sm: 3, lg: 4 }}
                        justifyContent="center"
                    >
                        <Grid2
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Button
                                variant="outlined"
                                onClick={() => navigate("/createtrip")}
                                sx={{
                                    width: { xs: "100%", sm: 280, lg: 300 },
                                    height: { xs: 180, sm: 200, lg: 220 },
                                    borderStyle: "1px solid",
                                    color: "text.primary",
                                    flexDirection: "column",
                                    gap: 1,
                                    "&:hover": {
                                        borderStyle: "solid",
                                        backgroundColor: "action.hover",
                                    },
                                }}
                            >
                                <Create fontSize="large" />
                                <Typography variant="h5" fontWeight={600}>
                                    Create Trip
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Start a new journey and invite your friends
                                </Typography>
                            </Button>
                        </Grid2>
                        <Grid2
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Button
                                variant="outlined"
                                onClick={handleClickJoinTrip}
                                sx={{
                                    width: { xs: "100%", sm: 280, lg: 300 },
                                    height: { xs: 180, sm: 200, lg: 220 },
                                    borderStyle: "1px solid",
                                    color: "text.primary",
                                    flexDirection: "column",
                                    gap: 1,
                                    "&:hover": {
                                        borderStyle: "solid",
                                        backgroundColor: "action.hover",
                                    },
                                }}
                            >
                                <GroupAdd fontSize="large" />
                                <Typography variant="h5" fontWeight={600}>
                                    Join Trip
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Enter a trip code to join an existing group.
                                </Typography>
                            </Button>
                        </Grid2>
                    </Grid2>
                </DialogContent>
            </Dialog>

            <JoinTripDialog
                open={joinTripDialogOpen}
                onClose={handleCloseDialog}
                tripId={tripId}
                setTripId={setTripId}
                onJoin={handleJoinTripSubmit}
            />
        </>
    );
};

export default AddConfirmationDialog;
