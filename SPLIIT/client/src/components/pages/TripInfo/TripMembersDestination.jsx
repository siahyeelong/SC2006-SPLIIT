// components/TripMembersCities.jsx
import React from "react";
import { Box, Typography, Stack, Chip, Button } from "@mui/material";
import { People, Place } from "@mui/icons-material";

const TripMembersDestination = ({ trip }) => {
    return (
        <Box sx={{ flex: 1 }}>
            <Stack spacing={{ xs: 2, md: 3 }}>
                {/* Current Members */}
                <Box>
                    <Typography variant="h5" fontWeight={600} marginBottom={1}>
                        <People
                            sx={{ verticalAlign: "middle", marginRight: 1 }}
                        />
                        Group Members
                    </Typography>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                        {trip.members.map((name, index) => (
                            <Chip
                                key={index}
                                label={name}
                                variant="outlined"
                                sx={{ borderRadius: 2 }}
                            />
                        ))}
                    </Stack>
                </Box>

                {/* Cities / States */}
                <Box>
                    <Typography variant="h5" fontWeight={600} marginBottom={1}>
                        <Place
                            sx={{ verticalAlign: "middle", marginRight: 1 }}
                        />
                        Cities / States
                    </Typography>
                    <Stack
                        direction="row"
                        flexWrap="wrap"
                        gap={1}
                        alignItems="center"
                    >
                        {trip.cityOrState.map((placeName, index) => (
                            <Chip
                                key={index}
                                label={placeName}
                                color="info"
                                variant="filled"
                            />
                        ))}
                    </Stack>
                </Box>
            </Stack>
        </Box>
    );
};

export default TripMembersDestination;
