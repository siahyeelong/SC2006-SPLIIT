import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import Header from "../../layouts/Header";
import ProfileInfo from "./ProfileController/ProfileInfo";
import ColourPicker from "../../components/common/ColourPicker";
import Trips from "./ProfileController/Trips";
import DeleteTripConfirmationDialog from "./ProfileController/DelTripConfirmationDialog";
import AddConfirmationDialog from "./ProfileController/AddConfirmationDialog";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import SnackbarNotifs from "../../components/common/SnackbarNotifs";

function Profile() {
    const { logout, user, refresh } = useContext(AuthContext);
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
    const [updating, setUpdating] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        refresh().then(setLoading(false))
    }, [])

    // Every time something updated, close current snackbar immediately and open new one after delay
    const showSnackbar = (message, severity) => {
        if (!updating) {
            setSnackbarState((s) => ({ ...s, open: false }));
            setTimeout(() => {
                setSnackbarState((s) => ({
                    open: true,
                    message,
                    severity,
                    key: s.key + 1,
                }));
            }, 100);
        }
    };

    const handleSaveName = () => {
        user.updateInfo("displayName", tempName); // update the user object
        tempProfile.displayName = tempName; // update tempProfile to show live changes

        // show confirmation
        showSnackbar("Display name saved!", "success");
        setIsEditingName(false);
    };

    const handleColourChange = (color) => {
        user.updateInfo("favColour", color); // update the user object
        tempProfile.favColour = color; // update tempProfile to show live changes

        // show confirmation
        showSnackbar("Favourite colour saved!", "success");
    };

    const handleDeleteTrip = (tripID, tripName) => {
        setTripToDelete({ name: tripName, id: tripID });
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (!tripToDelete) return;

        user.deleteTrip(tripToDelete.id); // update the user object
        tempProfile.trips = tempProfile.trips.filter(
            (id) => tripToDelete.id !== id
        ); // update tempProfile to show live changes

        setDeleteDialogOpen(false);
        showSnackbar(`Deleted ${tripToDelete.name}`, "info");
        setTripToDelete(null);
    };

    const handleJoinResult = (result) => {
        showSnackbar(result.message, result.severity);
    };

    const handleAddTrip = () => {
        setAddDialogOpen(true);
    };

    const handleCloseSnackbar = () => {
        setSnackbarState((s) => ({ ...s, open: false }));
    };

    if (loading) return <Typography>Loading...</Typography>;
    return (
        <>
            <Box>
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

                    <DeleteTripConfirmationDialog
                        open={deleteDialogOpen}
                        onClose={() => setDeleteDialogOpen(false)}
                        onConfirm={confirmDelete}
                        trip={tripToDelete}
                    />

                    <AddConfirmationDialog
                        open={addDialogOpen}
                        onClose={() => setAddDialogOpen(false)}
                        onJoinResult={handleJoinResult}
                        user={user}
                        setAddDialogOpen={setAddDialogOpen}
                        setProfile={setTempProfile}
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
