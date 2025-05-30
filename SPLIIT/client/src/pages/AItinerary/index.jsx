import React, { useState } from "react";
import {
    Box,
    Button,
    Paper,
    Typography,
    CircularProgress,
    Container,
    useTheme,
} from "@mui/material";
import Header from "../../layouts/Header";
import ChatInterface from "./AItineraryController/ChatInterface";
import { tokens } from "../../theme";

function AItinerary() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === "dark";
    const colors = tokens(theme.palette.mode);

    const subtitleColor = colors.greenAccent[400];

    const [loading, setLoading] = useState(false);
    const [showChat, setShowChat] = useState(false);

    // Toolhouse configuration
    const chatId = "d252512d-1818-4209-aa07-705f27cd1102";

    const handleStartPlanning = () => {
        setShowChat(true);
    };

    return (
        <Box m="20px">
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Header
                    title="AItinerary"
                    subtitle="AI-powered travel planning"
                />
            </Box>

            {loading ? (
                <Box display="flex" justifyContent="center" my={4}>
                    <CircularProgress />
                </Box>
            ) : (
                <Container maxWidth="lg">
                    {!showChat ? (
                        <Paper
                            elevation={3}
                            sx={{
                                mt: 4,
                                p: 3,
                                textAlign: "center",
                                bgcolor: isDarkMode
                                    ? colors.primary[600]
                                    : "background.paper",
                            }}
                        >
                            <Typography variant="h5" gutterBottom>
                                Plan your perfect trip with AI assistance
                            </Typography>
                            <Typography paragraph>
                                Our AI travel assistant can help you create
                                personalised itineraries based on your
                                interests, budget, and preferences.
                            </Typography>
                            <Typography paragraph>
                                Start a conversation with our AI to get
                                recommendations for attractions, restaurants,
                                activities, and a day-by-day schedule for your
                                trip.
                            </Typography>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={handleStartPlanning}
                                sx={{
                                    mt: 2,
                                    bgcolor: subtitleColor,
                                    "&:hover": {
                                        bgcolor: isDarkMode
                                            ? `${subtitleColor}CC`
                                            : `${subtitleColor}DD`,
                                    },
                                }}
                            >
                                Start Planning
                            </Button>
                        </Paper>
                    ) : (
                        <Box mt={4}>
                            <ChatInterface
                                chatId={chatId}
                                subtitleColor={subtitleColor}
                            />
                            <Box display="flex" justifyContent="center" mt={2}>
                                <Button
                                    variant="outlined"
                                    onClick={() => setShowChat(false)}
                                    sx={{
                                        borderColor: subtitleColor,
                                        color: subtitleColor,
                                        "&:hover": {
                                            borderColor: isDarkMode
                                                ? `${subtitleColor}CC`
                                                : `${subtitleColor}DD`,
                                            bgcolor: isDarkMode
                                                ? `${subtitleColor}22`
                                                : `${subtitleColor}11`,
                                        },
                                    }}
                                >
                                    End Chat
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Container>
            )}
        </Box>
    );
}

export default AItinerary;
