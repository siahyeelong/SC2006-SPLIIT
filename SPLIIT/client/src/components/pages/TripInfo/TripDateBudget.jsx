// components/TripDatesFinancial.jsx
import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { DateRange, AttachMoney } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const TripDateBudget = ({ trip }) => {
    const theme = useTheme();
    return (
        <Box sx={{ flex: 1 }}>
            <Stack spacing={{ xs: 2, md: 3 }}>
                {/* Travel Dates */}
                <Box
                    sx={{
                        padding: { xs: 2, md: 3 },
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.divider}`,
                    }}
                >
                    <Typography
                        variant="h5"
                        fontWeight={600}
                        marginBottom={2}
                        display={"flex"}
                        justifyContent={"flex-start"}
                    >
                        <DateRange
                            sx={{ verticalAlign: "middle", marginRight: 1 }}
                        />
                        Travel Dates
                    </Typography>
                    <Stack direction="row" spacing={3} gap={2}>
                        <Box>
                            <Typography variant="body2" color="textSecondary">
                                From:
                            </Typography>
                            <Typography variant="h6">
                                {trip.dates[0]}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" color="textSecondary">
                                To:
                            </Typography>
                            <Typography variant="h6">
                                {trip.dates[1]}
                            </Typography>
                        </Box>
                    </Stack>
                </Box>

                {/* Financial Details */}
                <Box
                    sx={{
                        padding: { xs: 2, md: 3 },
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.divider}`,
                    }}
                >
                    <Typography
                        variant="h5"
                        fontWeight={600}
                        marginBottom={2}
                        display={"flex"}
                        justifyContent={"flex-start"}
                    >
                        <AttachMoney
                            sx={{ verticalAlign: "middle", marginRight: 1 }}
                        />
                        Financial Details
                    </Typography>
                    <Stack direction="row" spacing={3}>
                        <Box>
                            <Typography variant="body2" color="textSecondary">
                                Foreign Currency
                            </Typography>
                            <Typography variant="h6">
                                {trip.foreignCurrency}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" color="textSecondary">
                                Local Currency
                            </Typography>
                            <Typography variant="h6">
                                {trip.localCurrency}
                            </Typography>
                        </Box>
                    </Stack>
                    <Box marginTop={2}>
                        <Typography variant="body2" color="textSecondary">
                            Trip Budget
                        </Typography>
                        <Typography variant="h6">{`${trip.localCurrency} $${trip.budget} / person`}</Typography>
                    </Box>
                </Box>
            </Stack>
        </Box>
    );
};

export default TripDateBudget;
