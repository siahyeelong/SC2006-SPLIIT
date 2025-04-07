import React from "react";
import defaultImage from "../../assets/defaultTripBackground.png";
import { SwapHoriz } from "@mui/icons-material";
import { Box, Card, CardMedia, Fade, Typography } from "@mui/material";

const ShowCurTrip = ({ displayCondition, curTrip, onClick }) => {
    return (
        <Fade in={displayCondition} timeout={{ enter: 300, exit: 300 }}>
            <Card
                onClick={onClick}
                sx={{
                    mx: 2,
                    mb: { md: 0.5, xl: 4 },
                    borderRadius: 4,
                    boxShadow: 3,
                    position: "relative",
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: 6,
                        cursor: "pointer",
                    },
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        height: { xs: 180, sm: 220, md: 250 },
                    }}
                >
                    <CardMedia
                        component="img"
                        image={
                            curTrip.tripImage ? curTrip.tripImage : defaultImage
                        }
                        alt="Trip Image"
                        sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            filter: "brightness(0.95)",
                        }}
                    />

                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: 0,
                            transition: "opacity 0.35s ease",
                            borderRadius: "inherit",
                            "&:hover": {
                                opacity: 1,
                            },
                        }}
                    >
                        <Box textAlign="center" color="white">
                            <SwapHoriz sx={{ fontSize: 60 }} />{" "}
                            <Typography variant="h6" mt={1}>
                                Change Trip
                            </Typography>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            position: "absolute",
                            bottom: 0,
                            width: "100%",
                            background:
                                "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))",
                            color: "white",
                            p: 2,
                        }}
                    >
                        <Typography variant="h5" fontWeight="bold">
                            {`${curTrip.tripName}` || "Current Trip"}
                        </Typography>
                    </Box>
                </Box>
            </Card>
        </Fade>
    );
};

export default ShowCurTrip;
