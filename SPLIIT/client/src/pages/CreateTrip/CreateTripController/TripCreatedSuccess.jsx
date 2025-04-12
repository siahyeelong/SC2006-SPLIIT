import React, { useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    Tooltip,
    Typography,
    useTheme,
    Divider,
    Chip,
} from "@mui/material";
import {
    WhatsApp,
    Telegram,
    Instagram,
    Email,
    ContentCopy,
} from "@mui/icons-material";
import SnackbarNotifs from "../../../components/common/SnackbarNotifs";

function TripCreatedSuccess({ open, handleClose, trip }) {
    const theme = useTheme();
    const sharingText = `Join my SPLIIT trip "${trip?.tripName}" using ID: ${trip?.tripID}. Haven't used SPLIIT before? Try it out at https://sc2006-spliit.vercel.app today!`;

    const shareLinks = {
        whatsapp: `https://wa.me/?text=${sharingText}`,
        telegram: `https://t.me/share/url?url=${sharingText}`,
        instagram: `https://www.instagram.com/direct/new/?text=${sharingText}`,
        email: `mailto:?subject=Join%20Me!&body=${sharingText}`,
    };

    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const showSnackbar = (message, severity) => {
        setSnackbarState((s) => ({
            open: true,
            message,
            severity,
        }));
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(trip?.tripID).then(() => {
            showSnackbar("Trip ID Copied!", "success");
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbarState((s) => ({ ...s, open: false }));
    };

    return (
        <Box display="flex" justifyContent="center">
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
                sx={{ borderRadius: 2 }}
            >
                <DialogTitle
                    sx={{
                        textAlign: "center",
                        pt: 4,
                        pb: 2,
                        position: "relative",
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: { xs: "1.25rem", md: "2.5rem" },
                            fontWeight: 600,
                            mb: 0.5,
                        }}
                    >
                        Trip Created!
                    </Typography>
                    <Typography variant="h5" color="text.primary">
                        "{trip?.tripName}"
                    </Typography>
                </DialogTitle>

                <DialogContent sx={{ px: 4, py: 3 }}>
                    <Stack spacing={3} alignItems="center">
                        <Typography
                            variant="body1"
                            textAlign="center"
                            color="text.secondary"
                        >
                            Share this ID with your travel companions
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 1.5,
                                p: 1,
                                borderRadius: 3,
                                width: "100%",
                                maxWidth: 400,
                            }}
                        >
                            <Chip
                                label={trip?.tripID}
                                variant="filled"
                                sx={{
                                    fontWeight: 600,
                                    px: 2,
                                    py: 1,
                                    borderRadius: 2,
                                    border: `1px solid ${theme.palette.divider}`,
                                }}
                            />
                            <Tooltip title={"Copy Trip ID"}>
                                <IconButton
                                    onClick={handleCopy}
                                    sx={{
                                        bgcolor: theme.palette.action.hover,
                                        "&:hover": {
                                            bgcolor:
                                                theme.palette.action.selected,
                                        },
                                    }}
                                >
                                    <ContentCopy fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Box>

                        <Divider sx={{ width: "100%", my: 1 }}>
                            Or share via
                        </Divider>

                        <Stack direction="row" spacing={2}>
                            {[
                                {
                                    icon: <WhatsApp />,
                                    label: "WhatsApp",
                                    color: "#25D366",
                                },
                                {
                                    icon: <Telegram />,
                                    label: "Telegram",
                                    color: "#0088CC",
                                },
                                {
                                    icon: <Instagram />,
                                    label: "Instagram",
                                    color: "#E1306C",
                                },
                                {
                                    icon: <Email />,
                                    label: "Email",
                                    color: theme.palette.text.primary,
                                },
                            ].map((platform, index) => (
                                <Tooltip
                                    key={platform.label}
                                    title={platform.label}
                                >
                                    <IconButton
                                        href={
                                            shareLinks[
                                                Object.keys(shareLinks)[index]
                                            ]
                                        }
                                        target="_blank"
                                        sx={{
                                            bgcolor: platform.color + "15",
                                            color: platform.color,
                                            "&:hover": {
                                                bgcolor: platform.color + "25",
                                                transform: "scale(1.1)",
                                            },
                                            transition: "all 0.2s ease",
                                        }}
                                    >
                                        {platform.icon}
                                    </IconButton>
                                </Tooltip>
                            ))}
                        </Stack>
                    </Stack>
                </DialogContent>

                <Box sx={{ px: 4, pb: 4, textAlign: "center" }}>
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        color="success"
                        size="large"
                        sx={{
                            px: 6,
                            borderRadius: 3,
                            fontWeight: 700,
                            textTransform: "none",
                            "&:hover": {
                                transform: "translateY(-1px)",
                            },
                            transition: "all 0.2s ease",
                        }}
                    >
                        Start Logging Expenses
                    </Button>
                </Box>
            </Dialog>

            <SnackbarNotifs
                open={snackbarState.open}
                message={snackbarState.message}
                onClose={handleCloseSnackbar}
                severity={snackbarState.severity}
            />
        </Box>
    );
}

export default TripCreatedSuccess;
