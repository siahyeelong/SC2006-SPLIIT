import React from "react";
import {
    Card,
    CardContent,
    Stack,
    Avatar,
    Typography,
    TextField,
    IconButton,
    useTheme,
} from "@mui/material";
import { Edit, Check } from "@mui/icons-material";

const ProfileInfo = ({
    profile,
    isEditingName,
    tempName,
    setTempName,
    setIsEditingName,
    handleSaveName,
}) => {
    const theme = useTheme();

    return (
        <Card
            sx={{
                bgcolor: theme.palette.background.default,
                width: "100%",
                maxWidth: "1500px",
            }}
        >
            <CardContent>
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    alignItems="center"
                    spacing={{ xs: 2, sm: 3 }}
                    justifyContent="center"
                >
                    <Avatar
                        sx={{
                            bgcolor: profile.favColour,
                            width: { xs: 80, sm: 100 },
                            height: { xs: 80, sm: 100 },
                            fontSize: { xs: "2rem", sm: "2.5rem" },
                            border: "3px solid",
                            borderColor: "divider",
                            transition: "all 0.3s ease",
                            color: "black",
                        }}
                    >
                        {profile.displayName.trim().charAt(0).toUpperCase() ||
                            "?"}
                    </Avatar>

                    <Stack
                        spacing={1}
                        sx={{
                            maxWidth: 400,
                            width: { xs: "100%", sm: "auto" },
                        }}
                    >
                        <Stack direction="row" alignItems="center" spacing={1}>
                            {isEditingName ? (
                                <>
                                    <TextField
                                        value={tempName}
                                        onChange={(e) =>
                                            setTempName(e.target.value)
                                        }
                                        variant="outlined"
                                        size="small"
                                        autoFocus
                                        fullWidth
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter")
                                                handleSaveName();
                                        }}
                                        onBlur={(e) => {
                                            if (
                                                e.relatedTarget &&
                                                e.relatedTarget ===
                                                "save-button"
                                            )
                                                return;

                                            setIsEditingName(false);
                                            setTempName(profile.displayName);
                                        }}
                                    />
                                    <IconButton
                                        id="save-button"
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => handleSaveName()}
                                    >
                                        <Check fontSize="medium" />
                                    </IconButton>
                                </>
                            ) : (
                                <>
                                    <Typography
                                        variant="h4"
                                        fontWeight={"bold"}
                                    >
                                        {profile.displayName}
                                    </Typography>
                                    <IconButton
                                        onClick={() => setIsEditingName(true)}
                                    >
                                        <Edit fontSize="small" />
                                    </IconButton>
                                </>
                            )}
                        </Stack>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            textAlign="left"
                        >
                            {`@${profile.username}\u00A0\u00A0•\u00A0\u00A0${profile.trips.length} ${profile.trips.length === 1 ? "Trip" : "Trips"}`}
                        </Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default ProfileInfo;
