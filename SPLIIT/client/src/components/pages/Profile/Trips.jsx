import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Paper,
    Button,
    IconButton,
    Stack,
    Box,
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
                                    position: "relative",
                                    width: { xs: "100%", sm: 280, lg: 300 },
                                    height: { xs: 180, sm: 200, lg: 220 },
                                    borderRadius: 2,
                                    overflow: "hidden",
                                    transition: "all 0.3s",
                                    "&:hover": {
                                        transform: {
                                            xs: "none",
                                            sm: "translateY(-4px)",
                                        },
                                        boxShadow: 6,
                                    },
                                }}
                            >
                                {trip.image && (
                                    <Box
                                        component="img"
                                        src={trip.image}
                                        alt={trip.name}
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            filter: "brightness(0.7)",
                                        }}
                                    />
                                )}
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
                                        zIndex: 2,
                                        "&:hover": {
                                            transition: "all 0.3s ease",
                                        },
                                    }}
                                >
                                    <Delete fontSize="small" />
                                </IconButton>
                                <Stack
                                    spacing={0.5}
                                    alignItems="center"
                                    sx={{
                                        position: "absolute",
                                        bottom: 8,
                                        left: 0,
                                        right: 0,
                                        zIndex: 2,
                                        px: 1,
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        textAlign="center"
                                        fontWeight={"bold"}
                                        // sx={{ color: "white" }}
                                    >
                                        {trip.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        fontWeight={"bold"}
                                        // sx={{ color: "white" }}
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
