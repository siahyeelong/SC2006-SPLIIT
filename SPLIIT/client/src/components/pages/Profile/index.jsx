import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import Header from "../MainUI/Header";
import ProfileInfo from "./ProfileInfo";
import ColourPicker from "./ColourPicker";
import Trips from "./Trips";
import DeletionConfirmationDialog from "./DeletionConfirmationDialog";
import AddConfirmationDialog from "./AddConfirmationDialog";
import { AuthContext } from "../../classes/AuthContext";
import { useNavigate } from "react-router-dom";
import tripImage from "../../assets/defaultTripBackground.png";
import SnackbarNotifs from "../TripInfo/SnackbarNotifs";

function Profile() {
    const { logout, user } = useContext(AuthContext);
    const [tempProfile, setTempProfile] = useState(user);
    const [tempName, setTempName] = useState(user.displayName);
    const [isEditingName, setIsEditingName] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [tripToDelete, setTripToDelete] = useState(null);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: "",
        severity: "",
        key: 0,
    });
    const navigate = useNavigate();
    const [updating, setUpdating] = useState(false)
    const backendURL = process.env.REACT_APP_BACKEND_URL;

    const showSnackbar = (message, severity) => {
        !updating && setSnackbarState((s) => ({
            open: true,
            message,
            severity,
            key: s.key + 1,
        }));
    };


    const handleSaveName = () => {
        user.updateInfo("displayName", tempName) // update the user object
        tempProfile.displayName = tempName // update tempProfile to show live changes

        // show confirmation
        showSnackbar("Display name saved!", "success");
        setIsEditingName(false);
    };

    const handleColourChange = (color) => {
        user.updateInfo("favColour", color) // update the user object
        tempProfile.favColour = color // update tempProfile to show live changes

        // show confirmation
        showSnackbar("Favourite colour saved!", "success");
    };

    const handleDeleteTrip = (tripID, tripName) => {
        setTripToDelete({ name: tripName, id: tripID });
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (!tripToDelete) return;

        user.deleteTrip(tripToDelete.id)
        tempProfile.trips = tempProfile.trips.filter(id => tripToDelete.id !== id);

        setDeleteDialogOpen(false);
        showSnackbar(`Deleted ${tripToDelete.name}`, "info");
        setTripToDelete(null);
    };

    // const handleAddTrip = () => {
    //     const newTrip = {
    //         id: Date.now(),
    //         name: `New Trip ${profile.trips.length + 1}`,
    //         flag: "🌍",
    //         date: new Date().toISOString().split("T")[0],
    //     };
    //     setProfile((p) => ({ ...p, trips: [...p.trips, newTrip] }));
    // };

    const handleAddTrip = () => {
        setAddDialogOpen(true);
    };

    const handleCloseSnackbar = () => {
        setSnackbarState((s) => ({ ...s, open: false }));
    };


    const handleJoinResult = (result) => {
        showSnackbar(result.message, result.severity);
    };

    return (
        <>
            <Box
            >
                <Header
                    title="Profile"
                    subtitle="Personalise your information"
                />

                <Stack
                    spacing={{ xs: 3, md: 4 }}
                    sx={{ mt: 4 }}
                    alignItems="center"
                >
                    <ProfileInfo
                        profile={tempProfile}
                        isEditingName={isEditingName}
                        tempName={tempName}
                        setTempName={setTempName}
                        setIsEditingName={setIsEditingName}
                        handleSaveName={handleSaveName}
                    />

                    <ColourPicker
                        profile={tempProfile}
                        onColourChange={handleColourChange}
                    />

                    <Trips
                        trips={tempProfile.trips}
                        onDeleteTrip={handleDeleteTrip}
                        onAddTrip={handleAddTrip}
                    />

                    <DeletionConfirmationDialog
                        open={deleteDialogOpen}
                        onClose={() => setDeleteDialogOpen(false)}
                        onConfirm={confirmDelete}
                        trip={tripToDelete}
                    />

                    <AddConfirmationDialog
                        open={addDialogOpen}
                        onClose={() => setAddDialogOpen(false)}
                        onJoinResult={handleJoinResult}
                        // for simulation purpose only
                        profile={tempProfile}
                        setAddDialogOpen={setAddDialogOpen}
                    />
                </Stack>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: { xs: 2, md: 4 },
                    }}
                >
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            logout().then(() => navigate("/"));
                        }}
                        sx={{
                            borderRadius: 2,
                            px: { xs: 2, md: 4 },
                            py: { xs: 1, md: 1.5 },
                            textTransform: "none",
                            boxShadow: 3,
                            fontWeight: "bold",
                            fontSize: { xs: "0.875rem", md: "1rem" },
                            transition: "all 0.3s ease",
                        }}
                    >
                        Log Out
                    </Button>
                </Box>
            </Box>

            <SnackbarNotifs
                open={snackbarState.open}
                message={snackbarState.message}
                onClose={handleCloseSnackbar}
                severity={snackbarState.severity}
                sx={{ position: "fixed", zIndex: 9999 }}
            />
        </>
    );
}

export default Profile;
