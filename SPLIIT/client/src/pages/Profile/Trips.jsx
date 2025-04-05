import { useContext, useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    IconButton,
    Box,
    Button,
    Stack,
    Paper,
} from "@mui/material";
import { Delete, Add } from "@mui/icons-material";
import Grid2 from "@mui/material/Grid2";
import { useTheme } from "@mui/material/styles";
import { AuthContext } from "../../contexts/AuthContext";
import defaultImage from "../../assets/defaultTripBackground.png";

const Trips = ({ trips, onDeleteTrip, onAddTrip }) => {
    const theme = useTheme();
    const { user } = useContext(AuthContext);
    const [tripDetails, setTripDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const data = await user.getAllTripInfo();
                if (data) {
                    const tripMap = data.reduce((acc, trip) => {
                        acc[trip.tripID] = trip;
                        return acc;
                    }, {});
                    setTripDetails(tripMap);
                }
            } catch (error) {
                console.error("Error fetching trips:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();
    }, [user]);

    if (loading) return <Typography>Loading...</Typography>;

    return (
        <Card
            sx={{
                bgcolor: theme.palette.background.default,
                width: "100%",
                maxWidth: "1500px",
            }}
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
                    {tripDetails &&
                        trips.map((tripID) => {
                            const trip = tripDetails[tripID];
                            return trip ? (
                                <Grid2
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                    key={tripID}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Paper
                                        elevation={3}
                                        sx={{
                                            position: "relative",
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
                                            borderRadius: 2,
                                            overflow: "hidden",
                                            transition: "all 0.3s",
                                            "&:hover": {
                                                transform: "translateY(-4px)",
                                                boxShadow: 6,
                                            },
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={
                                                trip.tripImage
                                                    ? trip.tripImage
                                                    : defaultImage
                                            }
                                            alt={trip.tripName}
                                            sx={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                filter: "brightness(0.7)",
                                            }}
                                        />
                                        <IconButton
                                            size="small"
                                            onClick={() =>
                                                onDeleteTrip(
                                                    tripID,
                                                    trip.tripName
                                                )
                                            }
                                            color="error"
                                            sx={{
                                                position: "absolute",
                                                right: 8,
                                                top: 8,
                                                bgcolor: "background.paper",
                                                boxShadow: 1,
                                                zIndex: 2,
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
                                            >
                                                {trip.tripName}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                fontWeight={"bold"}
                                            >
                                                {new Date(
                                                    trip.startDate
                                                ).toLocaleDateString()}
                                            </Typography>
                                        </Stack>
                                    </Paper>
                                </Grid2>
                            ) : null;
                        })}

                    <Grid2
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        sx={{ display: "flex", justifyContent: "center" }}
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
