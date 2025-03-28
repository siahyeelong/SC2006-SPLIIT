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
    const [isEditingName, setIsEditingName] = useState(false);
    const [tempName, setTempName] = useState(user.displayName);
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
        user.updateInfo("displayName", tempName)

        showSnackbar("Display name saved!", "success");
        setIsEditingName(false);
    };

    const handleDeleteTrip = (id) => {
        setTripToDelete(user.trips.find((t) => t.id === id));
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (!tripToDelete) return;

        user.deleteTrip(tripToDelete.id)

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

    const handleColourChange = (color) => {
        user.updateInfo("favColour", color)
        showSnackbar("Favourite colour saved!", "success");
    };

    const handleJoinResult = (result) => {
        showSnackbar(result.message, result.severity);
    };

    return (
        <>
            <Box
            // sx={{
            //     padding: { xs: 2, sm: 3 },
            //     maxWidth: { xs: "100%", md: 1200, lg: 1400 },
            //     margin: "0 auto",
            //     boxSizing: "border-box",
            // }}
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
                        profile={user}
                        isEditingName={isEditingName}
                        tempName={tempName}
                        setTempName={setTempName}
                        setIsEditingName={setIsEditingName}
                        handleSaveName={handleSaveName}
                    />

                    <ColourPicker
                        profile={user}
                        onColourChange={handleColourChange}
                    />

                    <Trips
                        trips={user.trips}
                        onDeleteTrip={handleDeleteTrip}
                        onAddTrip={handleAddTrip}
                    />

                    <DeletionConfirmationDialog
                        open={deleteDialogOpen}
                        onClose={() => setDeleteDialogOpen(false)}
                        onConfirm={confirmDelete}
                        tripName={tripToDelete?.name} // check for null or undefined
                    />

                    <AddConfirmationDialog
                        open={addDialogOpen}
                        onClose={() => setAddDialogOpen(false)}
                        onJoinResult={handleJoinResult}
                        // for simulation purpose only
                        profile={user}
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
                key={snackbarState.key}
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
