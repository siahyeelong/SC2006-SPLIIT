// TripDetails.jsx
import React, { useContext, useState } from "react";
import {
    Box,
    Paper,
    Divider,
    Stack,
    useTheme,
    Typography,
} from "@mui/material";
import Header from "../../layouts/Header";
import TripGeneral from "./TripGeneral";
import TripMembersDestination from "./TripMembersDestination";
import TripDateBudget from "./TripDateBudget";
import { AuthContext } from "../../contexts/AuthContext";

const TripDetails = () => {
    const theme = useTheme();
    const { trip } = useContext(AuthContext);
    const [temptrip, setTrip] = useState(trip);

    return (
        <>
            <Header title="Trip Information" />
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "800px",
                    mx: "auto",
                    minHeight: "100vh",
                    bgcolor: "background.default",
                }}
            >
                <Paper
                    // variant="outlined"
                    sx={{
                        bgcolor: theme.palette.background.default,
                        padding: { xs: 2, sm: 3, md: 4 },
                        borderRadius: 4,
                    }}
                >
                    {/* General Info and Trip Image */}
                    <TripGeneral trip={temptrip} setTrip={setTrip} />

                    <Divider
                        sx={{ my: { xs: 3, md: 4 }, border: "0.5px solid" }}
                    />

                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={{ xs: 3, md: 4 }}
                    >
                        {/* Group Members and Cities/States */}
                        <TripMembersDestination trip={temptrip} />

                        {/* Travel Dates and Financial Details */}
                        <TripDateBudget trip={temptrip} />
                    </Stack>
                </Paper>
            </Box>
        </>
    );
};

export default TripDetails;
