import { useEffect, useState } from "react";
import { Card, CardContent, Typography, IconButton, Box, Button, Stack, Paper } from "@mui/material";
import { Delete, Add } from "@mui/icons-material";
import Grid2 from "@mui/material/Grid2";
import { useTheme } from "@mui/material/styles";

const Trips = ({ trips, onDeleteTrip, onAddTrip }) => {
    const theme = useTheme();
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    const [tripDetails, setTripDetails] = useState({});

    // Function to fetch trip information
    async function fetchTripInfo(tripID) {
        try {
            const response = await fetch(`${backendURL}/trips/tripinfo/${tripID}`);
            if (!response.ok) throw new Error("Network response was not ok");

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching trip info:", error);
            return null;
        }
    }

    // Fetch all trip details when trips change
    useEffect(() => {
        async function loadTrips() {
            const tripData = await Promise.all(
                trips.map(async (tripID) => {
                    const data = await fetchTripInfo(tripID);
                    return { id: tripID, ...data };
                })
            );

            // Convert array to object for easier lookup
            const tripMap = tripData.reduce((acc, trip) => {
                if (trip) acc[trip.id] = trip;
                return acc;
            }, {});

            setTripDetails(tripMap);
        }

        if (trips.length > 0) {
            loadTrips();
        }
    }, [trips]);

    return (
        <Card sx={{ bgcolor: theme.palette.background.default, width: "100%", maxWidth: "1500px" }}>
            <CardContent>
                <Typography variant="h5" gutterBottom textAlign="center" fontWeight={600} sx={{ marginBottom: { xs: 2, sm: 3 } }}>
                    Your Trips
                </Typography>
                <Grid2 container spacing={{ xs: 2, sm: 3, lg: 4 }} justifyContent="center">
                    {trips.map((tripID) => {
                        const trip = tripDetails[tripID];
                        return trip ? (
                            <Grid2 xs={12} sm={6} md={4} lg={3} key={tripID} sx={{ display: "flex", justifyContent: "center" }}>
                                <Paper
                                    elevation={3}
                                    sx={{
                                        position: "relative",
                                        width: { xs: "100%", sm: 280, lg: 300 },
                                        height: { xs: 180, sm: 200, lg: 220 },
                                        borderRadius: 2,
                                        overflow: "hidden",
                                        transition: "all 0.3s",
                                        "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
                                    }}
                                >
                                    {trip.tripImage && (
                                        <Box
                                            component="img"
                                            src={trip.tripImage}
                                            alt={trip.tripName}
                                            sx={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7)" }}
                                        />
                                    )}
                                    <IconButton
                                        size="small"
                                        onClick={() => onDeleteTrip(tripID)}
                                        color="error"
                                        sx={{ position: "absolute", right: 8, top: 8, bgcolor: "background.paper", boxShadow: 1, zIndex: 2 }}
                                    >
                                        <Delete fontSize="small" />
                                    </IconButton>
                                    <Stack spacing={0.5} alignItems="center" sx={{ position: "absolute", bottom: 8, left: 0, right: 0, zIndex: 2, px: 1 }}>
                                        <Typography variant="h6" textAlign="center" fontWeight={"bold"}>
                                            {trip.tripName}
                                        </Typography>
                                        <Typography variant="body2" fontWeight={"bold"}>
                                            {new Date(trip.startDate).toLocaleDateString()}
                                        </Typography>
                                    </Stack>
                                </Paper>
                            </Grid2>
                        ) : null;
                    })}

                    <Grid2 xs={12} sm={6} md={4} lg={3} sx={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            variant="outlined"
                            onClick={onAddTrip}
                            sx={{
                                width: { xs: "100%", sm: 280, lg: 300 },
                                height: { xs: 180, sm: 200, lg: 220 },
                                borderStyle: "dashed",
                                color: "text.secondary",
                                flexDirection: "column",
                                gap: 1,
                                "&:hover": { borderStyle: "solid", backgroundColor: "action.hover" },
                            }}
                        >
                            <Add fontSize="large" />
                            <Typography variant="body1" fontWeight={500}>Add Trip</Typography>
                        </Button>
                    </Grid2>
                </Grid2>
            </CardContent>
        </Card>
    );
};

export default Trips;
