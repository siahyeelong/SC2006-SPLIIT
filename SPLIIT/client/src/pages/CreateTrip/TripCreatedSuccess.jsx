import React, { useState } from "react";
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import { ContentCopy } from "@mui/icons-material";
import SnackbarNotifs from "../../components/common/SnackbarNotifs";

function TripCreatedSuccess({ open, handleClose, trip }) {
    const theme = useTheme();
    const sharingText = `Join my SPLIIT trip with the trip ID ${trip?.tripID}`;
    const shareLinks = {
        whatsapp: `https://wa.me/?text=${sharingText}`,
        telegram: `https://t.me/share/url?url=${sharingText}`,
        instagram: `https://www.instagram.com/direct/new/?text=${sharingText}`,
        email: `mailto:?subject=Hello%20World!&body=${sharingText}`,
    };
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: "",
        severity: "",
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
        <Box display={"flex"} justifyContent={"center"}>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle textAlign="center" variant="h3">
                    "{trip?.tripName}" created!
                </DialogTitle>
                <DialogContent>
                    <Typography textAlign="center" mb={2}>
                        Share this trip ID with your friends to get them to join
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 1,
                        }}
                    >
                        <Typography variant="body1" fontWeight={500}>
                            Trip ID:
                        </Typography>
                        <Chip
                            label={trip?.tripID}
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
                    <Stack
                        spacing={2}
                        direction="row"
                        alignItems="center"
                        justifyContent={"center"}
                    >
                        <IconButton
                            href={shareLinks.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <WhatsAppIcon />
                        </IconButton>
                        <IconButton
                            href={shareLinks.telegram}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <TelegramIcon />
                        </IconButton>
                        <IconButton
                            href={shareLinks.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <InstagramIcon />
                        </IconButton>
                        <IconButton
                            href={shareLinks.email}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <EmailIcon />
                        </IconButton>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center" }}>
                    <Button
                        onClick={handleClose}
                        color="secondary"
                        variant="contained"
                    >
                        Start logging!
                    </Button>
                </DialogActions>
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
