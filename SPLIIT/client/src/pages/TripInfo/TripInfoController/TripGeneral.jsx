import React, { useRef, useState } from "react";
import {
    Box,
    Typography,
    Chip,
    IconButton,
    CardMedia,
    Tooltip,
    Stack,
} from "@mui/material";
import { ContentCopy, PhotoCamera } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import SnackbarNotifs from "../../../components/common/SnackbarNotifs";
import defaultImage from "../../../assets/defaultTripBackground.png";
import { processImageFile } from "../../../utils/imageUtils";

const TripGeneral = ({ trip, setTrip }) => {
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: "",
        severity: "",
    });
    const fileInputRef = useRef(null);
    const theme = useTheme();

    const showSnackbar = (message, severity) => {
        setSnackbarState(() => ({
            open: true,
            message,
            severity,
        }));
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(trip.tripID).then(() => {
            showSnackbar("Trip ID Copied!", "success");
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbarState((s) => ({ ...s, open: false }));
    };

    const handleClickEditImage = () => {
        fileInputRef.current.click();
    };

    // Updated handleUploadImage using the utility function
    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const base64String = await processImageFile(file);
            // Update trip state with the new image
            setTrip((prev) => ({ ...prev, tripImage: base64String }));
            showSnackbar("Image uploaded!", "success");
            setTimeout(() => {
                window.location.reload();
            }, 2200);

            // Optionally update the backend with the new image
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_BACKEND_URL}/trips/edittrip/${trip.tripID}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            updateField: "tripImage",
                            value: base64String,
                        }),
                    }
                );
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(
                        `Failed to update trip image: ${response.status} ${errorText}`
                    );
                }
            } catch (error) {
                console.error("Error updating trip image:", error);
                showSnackbar("Failed to save image", "error");
            }
        } catch (error) {
            console.error("Error processing image:", error);
            showSnackbar("Error processing image", "error");
        }
    };

    return (
        <>
            <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                alignItems="center"
                spacing={3}
            >
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h1" fontWeight="bold" gutterBottom>
                        {trip.tripName}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="body1" fontWeight={500}>
                            Trip ID:
                        </Typography>
                        <Chip
                            label={trip.tripID}
                            variant="filled"
                            sx={{ borderRadius: 2, border: "1px solid" }}
                        />
                        <Tooltip title="Copy Trip ID" arrow>
                            <IconButton
                                onClick={handleCopy}
                                size="small"
                                sx={{ color: theme.palette.text.secondary }}
                            >
                                <ContentCopy fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    {trip?.tripDescription?.trim() && (
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ marginTop: 2 }}
                        >
                            {trip.tripDescription.trim()}
                        </Typography>
                    )}
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        position: "relative",
                        width: "100%",
                        maxWidth: { xs: "100%", sm: 280, md: 300 },
                        display: "flex",
                        justifyContent: { xs: "center", md: "flex-end" },
                    }}
                >
                    <CardMedia
                        component="img"
                        image={trip.tripImage ? trip.tripImage : defaultImage}
                        alt="Trip Image"
                        sx={{
                            borderRadius: 2,
                            objectFit: "cover",
                            border: `1px solid ${theme.palette.divider}`,
                            width: "100%",
                            height: { xs: 180, sm: 200, md: 220 },
                        }}
                    />
                    <Tooltip title="Edit Image" arrow>
                        <IconButton
                            onClick={handleClickEditImage}
                            sx={{
                                position: "absolute",
                                bottom: 10,
                                right: 10,
                                bgcolor: "rgba(0, 0, 0, 0.6)",
                                color: "white",
                                "&:hover": { bgcolor: "rgba(0, 0, 0, 0.8)" },
                            }}
                        >
                            <PhotoCamera />
                        </IconButton>
                    </Tooltip>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleUploadImage}
                        style={{ display: "none" }}
                    />
                </Box>
            </Stack>

            <SnackbarNotifs
                open={snackbarState.open}
                message={snackbarState.message}
                onClose={handleCloseSnackbar}
                severity={snackbarState.severity}
            />
        </>
    );
};

export default TripGeneral;
