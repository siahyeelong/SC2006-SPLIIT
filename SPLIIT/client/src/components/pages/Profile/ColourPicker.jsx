import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Box,
    Tooltip,
    useTheme,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { Check } from "@mui/icons-material";

const ColourPicker = ({ profile, setProfile }) => {
    const theme = useTheme();

    return (
        <Card
            // variant="outlined"
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
                    Favourite Colour
                </Typography>
                <Box display="flex" justifyContent="center">
                    <Grid2
                        container
                        spacing={{ xs: 1, sm: 2 }}
                        justifyContent="center"
                    >
                        {profile.colorOptions.map((color) => (
                            <Grid2 key={color.value}>
                                <Tooltip title={color.name}>
                                    <Box
                                        sx={{
                                            width: {
                                                xs: 40,
                                                sm: 48,
                                                lg: 56,
                                            },
                                            height: {
                                                xs: 40,
                                                sm: 48,
                                                lg: 56,
                                            },
                                            borderRadius: "50%",
                                            bgcolor: color.value,
                                            cursor: "pointer",
                                            border:
                                                profile.favoriteColor ===
                                                color.value
                                                    ? "3px solid"
                                                    : "2px solid transparent",
                                            borderColor: (theme) =>
                                                profile.favoriteColor ===
                                                color.value
                                                    ? theme.palette.primary.main
                                                    : "transparent",
                                            transition: "all 0.2s",
                                            boxShadow: 1,
                                            position: "relative",
                                            "&:hover": {
                                                transform: "scale(1.1)",
                                                boxShadow: 2,
                                            },
                                        }}
                                        onClick={() =>
                                            setProfile((p) => ({
                                                ...p,
                                                favoriteColor: color.value,
                                            }))
                                        }
                                    >
                                        {profile.favoriteColor ===
                                            color.value && (
                                            <Check
                                                sx={{
                                                    position: "absolute",
                                                    top: "50%",
                                                    left: "50%",
                                                    transform:
                                                        "translate(-50%, -50%)",
                                                    color: "black",
                                                    fontSize: "1.5rem",
                                                    filter: "drop-shadow(0 0 2px rgba(0, 0, 0, 0.5))",
                                                }}
                                            />
                                        )}
                                    </Box>
                                </Tooltip>
                            </Grid2>
                        ))}
                    </Grid2>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ColourPicker;
