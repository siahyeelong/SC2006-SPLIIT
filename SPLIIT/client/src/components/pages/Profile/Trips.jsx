import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Paper,
    Button,
    IconButton,
    Stack,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { Delete, Add } from "@mui/icons-material";

const Trips = ({ trips, onDeleteTrip, onAddTrip }) => {
    return (
        <Card variant="outlined" sx={{ width: "100%", maxWidth: "1500px" }}>
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
                    {trips.map((trip) => (
                        <Grid2
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
                                elevation={3}
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
                                    onClick={() => onDeleteTrip(trip.id)}
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
                                    <Typography variant="h2" sx={{ mb: 1 }}>
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
                            onClick={onAddTrip}
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
                            <Typography variant="body1" fontWeight={500}>
                                Add Trip
                            </Typography>
                        </Button>
                    </Grid2>
                </Grid2>
            </CardContent>
        </Card>
    );
};

export default Trips;
