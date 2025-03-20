// TripDetails.jsx
import React, { useState } from "react";
import { Box, Paper, Divider, Stack, useTheme } from "@mui/material";
import Header from "../MainUI/Header";
import TripGeneral from "./TripGeneral";
import TripMembersDestination from "./TripMembersDestination";
import TripDateBudget from "./TripDateBudget";
import tripImage from "../../assets/defaultTripBackground.png"; // adjust the path as needed

const MOCK_TRIP = {
    name: "USA 2025",
    id: "A12345678",
    description:
        "A detailed trip to the USA in 2025, including visits to multiple cities and key attractions.",
    image: tripImage,
    members: ["Antanas", "Olivia", "Lucas", "Ethan", "Sophia", "Jason"],
    cityOrState: ["Florida", "Ohio", "Los Angeles"],
    dates: ["1 Jan 2025", "15 Jan 2025"],
    foreignCurrency: "USD",
    localCurrency: "SGD",
    budget: 5000,
};

const TripDetails = () => {
    const [trip, setTrip] = useState(MOCK_TRIP);
    const theme = useTheme();

    return (
        <>
            <Header title="Trip Information" />
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "1500px",
                    mx: "auto",
                    // px: { xs: 2, sm: 3, md: 4 },
                    // py: { xs: 2, sm: 3, md: 4 },
                    minHeight: "100vh",
                    bgcolor: "background.default",
                }}
            >
                <Paper
                    variant="outlined"
                    sx={{
                        padding: { xs: 2, sm: 3, md: 4 },
                        borderRadius: 4,
                        border: `1.5px solid ${theme.palette.divider}`,
                    }}
                >
                    {/* General Info and Trip Image */}
                    <TripGeneral trip={trip} setTrip={setTrip} />

                    <Divider
                        sx={{ my: { xs: 3, md: 4 }, border: "0.5px solid" }}
                    />

                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={{ xs: 3, md: 4 }}
                    >
                        {/* Group Members and Cities/States */}
                        <TripMembersDestination trip={trip} />

                        {/* Travel Dates and Financial Details */}
                        <TripDateBudget trip={trip} />
                    </Stack>
                </Paper>
            </Box>
        </>
    );
};

export default TripDetails;
