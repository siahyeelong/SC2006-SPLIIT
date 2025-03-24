// components/TripGeneral.jsx
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
import SnackbarNotifs from "./SnackbarNotifs";

const TripGeneral = ({ trip, setTrip }) => {
    const [copySuccess, setCopySuccess] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const fileInputRef = useRef(null);
    const theme = useTheme();

    const handleCopy = () => {
        navigator.clipboard.writeText(trip.id).then(() => {
            setCopySuccess(true);
        });
    };

    const handleCloseSnackbar = () => {
        setCopySuccess(false);
        setUploadSuccess(false);
    };

    const handleClickEditImage = () => {
        fileInputRef.current.click();
    };

    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Read the image file as a Data URL
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                // Determine the square crop size (smallest dimension)
                const size = Math.min(img.width, img.height);
                const sx = (img.width - size) / 2; // Crop start X
                const sy = (img.height - size) / 2; // Crop start Y

                // Set canvas size to 512x512
                canvas.width = 512;
                canvas.height = 512;

                // Draw cropped and resized image
                ctx.drawImage(img, sx, sy, size, size, 0, 0, 512, 512);

                // Convert canvas to Base64 with JPEG compression (quality: 0.8)
                const base64String = canvas.toDataURL("image/jpeg", 0.8);

                // Update trip state with the new image
                setTrip((t) => ({ ...t, image: base64String }));

                setUploadSuccess(true);
            };
        };
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
                        {trip.name}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="body1" fontWeight={500}>
                            Trip ID:
                        </Typography>
                        <Chip
                            label={trip.id}
                            variant="filled"
                            sx={{
                                borderRadius: 2,
                                border: "1px solid",
                            }}
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
                    {trip.description.trim() && (
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ marginTop: 2 }}
                        >
                            {trip.description.trim()}
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
                        image={trip.image}
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
                open={copySuccess}
                message="Trip ID Copied!"
                onClose={handleCloseSnackbar}
            />

            <SnackbarNotifs
                open={uploadSuccess}
                message="Image Uploaded!"
                onClose={handleCloseSnackbar}
            />
        </>
    );
};

export default TripGeneral;
