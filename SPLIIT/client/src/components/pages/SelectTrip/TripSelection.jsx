import React, { useEffect, useState } from 'react'
import { Grid2, Card, CardMedia, CardContent, Typography, useTheme, Box } from "@mui/material";
import defaultBackground from "../../assets/defaultTripBackground.png"
import { tokens } from '../../../theme';
import { Navigate, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

function TripSelection() {
    const [allTrips, setAllTrips] = useState([])
    const [error, setError] = useState(null)
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);

    function fetchAllTrips() {
        const backendURL = process.env.REACT_APP_BACKEND_URL;
        fetch(`${backendURL}/trips/getallTrips/${localStorage.getItem("user")}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setAllTrips(data || []);
            })
            .catch(error => {
                setError('Failed to fetch trip IDs. Please try again later.');
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => fetchAllTrips(), [])

    if (loading) return <Typography>Loading...</Typography>;

    {/* if user does not have a trip created or joined, they will be redirected to create / join a trip */ }
    if (!loading && allTrips.length === 0) return <Navigate to={"/createtrip"} />;

    // when the user selects a trip, it sets the session's trip and redirects user to the log transactions page
    function selectedTrip(trip) {
        localStorage.setItem("trip", trip.tripID)
        navigate("/")
    }

    return (
        <Grid2 container spacing={3} sx={{ justifyContent: 'center' }}>
            {/* if user has existing trips */}
            {allTrips.map((trip) => (
                <Grid2 item xs={12} sm={6} md={4} lg={3} xl={2} key={trip.tripID}>
                    <Card sx={{ maxWidth: 300, borderRadius: 4, boxShadow: 5, backgroundColor: colours.greenAccent[800], cursor: "pointer" }} onClick={() => selectedTrip(trip)}>
                        {/* Trip Image */}
                        <CardMedia
                            component="img"
                            height="150"
                            image={trip.tripImage || defaultBackground} // Default placeholder if no image
                            alt={trip.tripName}
                            sx={{ objectFit: "cover" }}
                        />
                        {/* Trip Name */}
                        <CardContent>
                            <Typography variant="h5" fontWeight={"bold"}>
                                {trip.tripName}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid2>
            ))}
            <Grid2 item xs={12} sm={6} md={4} lg={3} xl={2} key={"addTrip"}>
                <Card sx={{ width: 150, height: 210, borderRadius: 4, boxShadow: 5, backgroundColor: colours.greenAccent[600], cursor: "pointer" }} onClick={() => navigate("/createtrip")}>
                    <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <AddIcon fontSize='large' sx={{ margin: 3, marginTop: 6 }} />
                        <Typography variant="h5" fontWeight={"bold"}>
                            Create new trip
                        </Typography>
                    </CardContent>
                </Card>
            </Grid2>
        </Grid2>
    );
}

export default TripSelection