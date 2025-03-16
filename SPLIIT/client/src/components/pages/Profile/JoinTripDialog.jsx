import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    TextField,
    useTheme,
    useMediaQuery,
} from "@mui/material";

const JoinTripDialog = ({ open, onClose, tripId, setTripId, onJoin }) => {
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle
                sx={{
                    textAlign: "center",
                    fontWeight: 600,
                    fontSize: isMediumScreen ? "1.75rem" : "1.5rem",
                    py: 3,
                    px: 4,
                }}
            >
                Join Trip
            </DialogTitle>

            <DialogContent sx={{ px: 4, py: 2 }}>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                        mb: 3,
                        fontSize: isMediumScreen ? "1rem" : "0.875rem",
                    }}
                >
                    Enter the Trip ID of the trip you want to join
                </Typography>

                <TextField
                    fullWidth
                    required
                    variant="outlined"
                    label="Trip ID"
                    value={tripId}
                    onChange={(e) => setTripId(e.target.value)}
                    sx={{
                        "& .MuiInputBase-input": {
                            fontSize: isMediumScreen ? "1rem" : "0.875rem",
                            py: isMediumScreen ? 1.5 : 1,
                        },
                        "& .MuiInputLabel-root": {
                            fontSize: isMediumScreen ? "1rem" : "0.875rem",
                        },
                    }}
                />
            </DialogContent>

            <DialogActions
                sx={{
                    px: 4,
                    py: 3,
                    justifyContent: "space-between",
                    flexDirection: { xs: "column-reverse", sm: "row" },
                    gap: 2,
                }}
            >
                <Button
                    onClick={onClose}
                    sx={{
                        width: { sm: "auto", xs: "100%" },
                        px: 4,
                        py: 1.5,
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={onJoin}
                    disabled={!tripId}
                    sx={{
                        width: { sm: "auto", xs: "100%" },
                        px: 4,
                        py: 1.5,
                        fontSize: isMediumScreen ? "1rem" : "0.875rem",
                        "&:hover": {
                            transform: "translateY(-1px)",
                            boxShadow: 2,
                        },
                    }}
                >
                    Join Trip
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default JoinTripDialog;
