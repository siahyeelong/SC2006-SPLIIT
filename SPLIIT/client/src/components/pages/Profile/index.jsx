import React, { useContext, useState } from "react";
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

// placeholder until connect with backend
const MOCK_PROFILE = {
    displayName: "Bob",
    favoriteColor: "#D1BDFF",
    trips: [
        {
            id: 1,
            name: "USA'25",
            flag: "🇺🇸",
            date: "2025-06-01",
            image: tripImage,
        },
        {
            id: 2,
            name: "Japan'23",
            flag: "🇯🇵",
            date: "2023-11-15",
            image: tripImage,
        },
        {
            id: 3,
            name: "South Korea'22",
            flag: "🇰🇷",
            date: "2022-09-01",
            image: tripImage,
        },
        {
            id: 4,
            name: "Germany'20",
            flag: "🇩🇪",
            date: "2020-07-10",
            image: tripImage,
        },
    ],
    colorOptions: [
        { name: "Lavender Mist", value: "#D1BDFF" },
        { name: "Soft Lilac", value: "#E2CBF7" },
        { name: "Sky Breeze", value: "#D6F6FF" },
        { name: "Minty Meadow", value: "#B3F5BC" },
        { name: "Lemon Glow", value: "#F9FFB5" },
        { name: "Buttercream", value: "#FFE699" },
        { name: "Coral Blush", value: "#FCAE7C" },
        { name: "Rosewood", value: "#FA9189" },
    ],
};

function Profile() {
    const [profile, setProfile] = useState(MOCK_PROFILE);
    const [isEditingName, setIsEditingName] = useState(false);
    const [tempName, setTempName] = useState(profile.displayName);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [tripToDelete, setTripToDelete] = useState(null);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSaveName = () => {
        setProfile((p) => ({
            ...p,
            displayName: tempName,
        }));

        setIsEditingName(false);
    };

    const handleDeleteTrip = (id) => {
        setTripToDelete(profile.trips.find((t) => t.id === id));
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (!tripToDelete) return;

        setProfile((p) => ({
            ...p,
            trips: p.trips.filter((t) => t.id !== tripToDelete.id),
        }));

        setDeleteDialogOpen(false);
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

    return (
        <Box
        // sx={{
        //     padding: { xs: 2, sm: 3 },
        //     maxWidth: { xs: "100%", md: 1200, lg: 1400 },
        //     margin: "0 auto",
        //     boxSizing: "border-box",
        // }}
        >
            <Header title="Profile" subtitle="Personalise your experience" />

            <Stack
                spacing={{ xs: 3, md: 4 }}
                sx={{ mt: 4 }}
                alignItems="center"
            >
                <ProfileInfo
                    profile={profile}
                    isEditingName={isEditingName}
                    tempName={tempName}
                    setTempName={setTempName}
                    setIsEditingName={setIsEditingName}
                    handleSaveName={handleSaveName}
                />

                <ColourPicker profile={profile} setProfile={setProfile} />

                <Trips
                    trips={profile.trips}
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
                    // for simulation purpose only
                    profile={profile}
                    setProfile={setProfile}
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
    );
}

export default Profile;
