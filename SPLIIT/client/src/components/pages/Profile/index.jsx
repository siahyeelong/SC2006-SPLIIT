import React, { useState } from "react";
import {
    Box,
    Paper,
    Typography,
    TextField,
    IconButton,
    Avatar,
    Grid2,
    Card,
    CardContent,
    Stack,
    Button,
    Tooltip,
} from "@mui/material";
import { Edit, Delete, Add, Check } from "@mui/icons-material";
import Header from "../MainUI/Header";

// placeholder until connect with backend
const MOCK_PROFILE = {
    displayName: "Boris",
    favoriteColor: "#D1BDFF",
    trips: [
        { id: 1, name: "USA'25", flag: "🇺🇸", date: "2025-06-01" },
        { id: 2, name: "Japan'23", flag: "🇯🇵", date: "2023-11-15" },
        { id: 3, name: "South Korea'22", flag: "🇰🇷", date: "2022-09-01" },
        { id: 4, name: "Germany'20", flag: "🇩🇪", date: "2020-07-10" },
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

    const handleDeleteTrip = (id) => {
        setProfile((prev) => ({
            ...prev,
            trips: prev.trips.filter((trip) => trip.id !== id),
        }));
    };

    const handleAddTrip = () => {
        const newTrip = {
            id: Date.now(),
            name: `New Trip ${profile.trips.length + 1}`,
            flag: "🌍",
            date: new Date().toISOString().split("T")[0],
        };
        setProfile((prev) => ({ ...prev, trips: [...prev.trips, newTrip] }));
    };

    return (
        <Box
            sx={{
                padding: { xs: 2, sm: 3 },
                maxWidth: { xs: "100%", md: 1200, lg: 1400 },
                margin: "0 auto",
                boxSizing: "border-box",
            }}
        >
            <Header title="Profile" subtitle="Personalize your experience" />

            <Stack
                spacing={{ xs: 3, md: 4 }}
                sx={{ mt: 4 }}
                alignItems="center"
            >
                {/* User Info Section */}
                <Card
                    variant="outlined"
                    sx={{ width: "100%", maxWidth: "1500px" }}
                >
                    <CardContent>
                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            alignItems="center"
                            spacing={{ xs: 2, sm: 3 }}
                            justifyContent="center"
                        >
                            <Avatar
                                sx={{
                                    bgcolor: profile.favoriteColor,
                                    width: { xs: 80, sm: 100 },
                                    height: { xs: 80, sm: 100 },
                                    fontSize: { xs: "2rem", sm: "2.5rem" },
                                    border: "3px solid",
                                    borderColor: "divider",
                                    transition: "all 0.3s ease",
                                }}
                            >
                                {profile.displayName
                                    .trim()
                                    .charAt(0)
                                    .toUpperCase() || "?"}
                            </Avatar>

                            <Stack
                                spacing={1}
                                sx={{
                                    maxWidth: 400,
                                    width: { xs: "100%", sm: "auto" },
                                }}
                            >
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={1}
                                >
                                    {isEditingName ? (
                                        <TextField
                                            value={profile.displayName}
                                            onChange={(e) =>
                                                setProfile((p) => ({
                                                    ...p,
                                                    displayName: e.target.value,
                                                }))
                                            }
                                            variant="outlined"
                                            size="small"
                                            autoFocus
                                            fullWidth
                                        />
                                    ) : (
                                        <Typography
                                            variant="h4"
                                            fontWeight={600}
                                        >
                                            {profile.displayName}
                                        </Typography>
                                    )}
                                    <IconButton
                                        onClick={() =>
                                            setIsEditingName(!isEditingName)
                                        }
                                    >
                                        <Edit fontSize="small" />
                                    </IconButton>
                                </Stack>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    textAlign="left"
                                >
                                    {`✈️ Travel Enthusiast\u00A0\u00A0•\u00A0\u00A0${profile.trips.length} Trips`}
                                </Typography>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>

                {/* Color Picker Section */}
                <Card
                    variant="outlined"
                    sx={{ width: "100%", maxWidth: "1500px" }}
                >
                    <CardContent>
                        <Typography
                            variant="h5"
                            gutterBottom
                            textAlign="center"
                            fontWeight={600}
                            sx={{ marginBottom: { xs: 2, sm: 3 } }}
                        >
                            Favourite Colour
                        </Typography>
                        <Box display="flex" justifyContent="center">
                            <Grid2
                                container
                                spacing={{ xs: 1, sm: 2 }}
                                justifyContent="center"
                            >
                                {profile.colorOptions.map((color) => (
                                    <Grid2 item key={color.value}>
                                        <Tooltip title={color.name}>
                                            <Box
                                                sx={{
                                                    width: {
                                                        xs: 40,
                                                        sm: 48,
                                                        lg: 56,
                                                    },
                                                    height: {
                                                        xs: 40,
                                                        sm: 48,
                                                        lg: 56,
                                                    },
                                                    borderRadius: "50%",
                                                    bgcolor: color.value,
                                                    cursor: "pointer",
                                                    border:
                                                        profile.favoriteColor ===
                                                        color.value
                                                            ? "3px solid"
                                                            : "2px solid transparent",
                                                    borderColor: (theme) =>
                                                        profile.favoriteColor ===
                                                        color.value
                                                            ? theme.palette
                                                                  .primary.main
                                                            : "transparent",
                                                    transition: "all 0.2s",
                                                    boxShadow: 1,
                                                    position: "relative",
                                                    "&:hover": {
                                                        transform: "scale(1.1)",
                                                        boxShadow: 2,
                                                    },
                                                }}
                                                onClick={() =>
                                                    setProfile((p) => ({
                                                        ...p,
                                                        favoriteColor:
                                                            color.value,
                                                    }))
                                                }
                                            >
                                                {profile.favoriteColor ===
                                                    color.value && (
                                                    <Check
                                                        sx={{
                                                            position:
                                                                "absolute",
                                                            top: "50%",
                                                            left: "50%",
                                                            transform:
                                                                "translate(-50%, -50%)",
                                                            color: "black",
                                                            fontSize: "1.5rem",
                                                            filter: "drop-shadow(0 0 2px rgba(0, 0, 0, 0.5))",
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                        </Tooltip>
                                    </Grid2>
                                ))}
                            </Grid2>
                        </Box>
                    </CardContent>
                </Card>

                {/* Trips Section */}
                <Card
                    variant="outlined"
                    sx={{ width: "100%", maxWidth: "1500px" }}
                >
                    <CardContent>
                        <Typography
                            variant="h5"
                            gutterBottom
                            textAlign="center"
                            fontWeight={600}
                            sx={{ marginBottom: { xs: 2, sm: 3 } }}
                        >
                            Your Trips
                        </Typography>
                        <Grid2
                            container
                            spacing={{ xs: 2, sm: 3, lg: 4 }}
                            justifyContent="center"
                        >
                            {profile.trips.map((trip) => (
                                <Grid2
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                    key={trip.id}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Paper
                                        sx={{
                                            padding: 2,
                                            width: {
                                                xs: "100%",
                                                sm: 280,
                                                lg: 300,
                                            },
                                            height: {
                                                xs: 180,
                                                sm: 200,
                                                lg: 220,
                                            },
                                            position: "relative",
                                            transition: "all 0.3s",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            "&:hover": {
                                                transform: {
                                                    xs: "none",
                                                    sm: "translateY(-4px)",
                                                },
                                                boxShadow: 3,
                                            },
                                        }}
                                    >
                                        <IconButton
                                            size="small"
                                            onClick={() =>
                                                handleDeleteTrip(trip.id)
                                            }
                                            color="error"
                                            sx={{
                                                position: "absolute",
                                                right: 8,
                                                top: 8,
                                                bgcolor: "background.paper",
                                                boxShadow: 1,
                                            }}
                                        >
                                            <Delete fontSize="small" />
                                        </IconButton>
                                        <Stack spacing={1} alignItems="center">
                                            <Typography
                                                variant="h2"
                                                sx={{ mb: 1 }}
                                            >
                                                {trip.flag}
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                textAlign="center"
                                                fontWeight={500}
                                            >
                                                {trip.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {new Date(
                                                    trip.date
                                                ).toLocaleDateString()}
                                            </Typography>
                                        </Stack>
                                    </Paper>
                                </Grid2>
                            ))}
                            <Grid2
                                item
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
                                    onClick={handleAddTrip}
                                    sx={{
                                        width: { xs: "100%", sm: 280, lg: 300 },
                                        height: { xs: 180, sm: 200, lg: 220 },
                                        borderStyle: "dashed",
                                        color: "text.secondary",
                                        flexDirection: "column",
                                        gap: 1,
                                        "&:hover": {
                                            borderStyle: "solid",
                                            backgroundColor: "action.hover",
                                        },
                                    }}
                                >
                                    <Add fontSize="large" />
                                    <Typography
                                        variant="body1"
                                        fontWeight={500}
                                    >
                                        Add Trip
                                    </Typography>
                                </Button>
                            </Grid2>
                        </Grid2>
                    </CardContent>
                </Card>
            </Stack>
        </Box>
    );
}

export default Profile;
