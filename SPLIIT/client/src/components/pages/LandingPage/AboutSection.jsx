import { Box, Typography, Grid2 } from "@mui/material";
import {
    CheckCircleOutline,
    Payments,
    Calculate,
    People,
} from "@mui/icons-material";

const AboutSection = () => {
    return (
        <Box
            sx={{
                padding: { xs: "80px 20px", md: "100px 40px" },
                textAlign: "center",
                backgroundColor: "#f9f9f9",
                position: "relative",
                border: "1px solid #e0e0e0",
            }}
        >
            <Box sx={{ maxWidth: 1200, margin: "0 auto" }}>
                <Typography
                    variant="h2"
                    sx={{
                        fontSize: { xs: "2rem", md: "2.5rem" },
                        fontWeight: "bold",
                        marginBottom: { xs: "20px", md: "40px" },
                        color: "black",
                    }}
                >
                    Track Group Expenses. Effortlessly.
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        fontSize: { xs: "1rem", md: "1.1rem" },
                        color: "#4a4a4a",
                        maxWidth: "800px",
                        margin: "0 auto",
                        marginBottom: { xs: "40px", md: "60px" },
                        fontWeight: 500,
                        lineHeight: 1.6,
                    }}
                >
                    SPLIIT helps you track, split, and settle group expenses
                    with ease. Whether it's a trip, event, or daily costs, enjoy
                    transparent and hassle-free cost-sharing among friends,
                    family, or teammates.
                </Typography>
                <Grid2
                    container
                    spacing={6}
                    justifyContent="center"
                    alignItems="stretch"
                >
                    {[
                        {
                            title: "Expense Tracking",
                            subhead: "Never lose track of shared costs",
                            bullets: [
                                "Real-time updates across devices",
                                "Historical spending records",
                            ],
                            icon: <Payments sx={{ fontSize: "2.5rem" }} />,
                        },
                        {
                            title: "Quick Settlements",
                            subhead: "Shared expenses made simple",
                            bullets: [
                                "Automatic debt calculations",
                                "Multi-currency conversion",
                            ],
                            icon: <Calculate sx={{ fontSize: "2.5rem" }} />,
                        },
                        {
                            title: "Group Collaboration",
                            subhead: "For groups of any size, anywhere",
                            bullets: [
                                "Real-time collaboration",
                                "Export to Excel",
                            ],
                            icon: <People sx={{ fontSize: "2.5rem" }} />,
                        },
                    ].map((feature, index) => (
                        <Grid2
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            key={index}
                            sx={{ display: "flex", justifyContent: "center" }}
                        >
                            <Box
                                sx={{
                                    padding: { xs: "20px", md: "35px" },
                                    width: { xs: "300px", md: "350px" },
                                    height: { xs: "380px", md: "400px" },
                                    display: "flex",
                                    flexDirection: "column",
                                    background: "rgba(255,255,255,0.96)",
                                    borderRadius: "2px",
                                    boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
                                    transition:
                                        "all 0.3s cubic-bezier(.25,.8,.25,1)",
                                    "&:hover": {
                                        transform: "translateY(-5px)",
                                        boxShadow:
                                            "0 12px 48px rgba(0,0,0,0.1)",
                                        background: "#ffffff",
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        color: "primary.main",
                                        marginBottom: "15px",
                                        flexShrink: 0,
                                    }}
                                >
                                    {feature.icon}
                                </Box>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: "bold",
                                        marginBottom: "10px",
                                        color: "black",
                                        flexShrink: 0,
                                        fontSize: {
                                            xs: "1.25rem",
                                            md: "1.5rem",
                                        },
                                    }}
                                >
                                    {feature.title}
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        color: "#616161",
                                        marginBottom: "15px",
                                        fontWeight: "bold",
                                        fontSize: {
                                            xs: "0.85rem",
                                            md: "0.95rem",
                                        },
                                        flexShrink: 0,
                                    }}
                                >
                                    {feature.subhead}
                                </Typography>
                                <Box
                                    component="ul"
                                    sx={{
                                        padding: "10px 0",
                                        textAlign: "left",
                                        margin: "0 20px",
                                        flexGrow: 1,
                                        "& li": {
                                            listStyle: "none",
                                            display: "flex",
                                            alignItems: "center",
                                            marginBottom: "15px",
                                            fontSize: {
                                                xs: "0.8rem",
                                                md: "0.9rem",
                                            },
                                            color: "#2d2d2d",
                                            fontWeight: 500,
                                        },
                                        "& svg": {
                                            fontSize: {
                                                xs: "0.8rem",
                                                md: "1rem",
                                            },
                                            marginRight: "15px",
                                            color: "primary.main",
                                        },
                                    }}
                                >
                                    {feature.bullets.map((bullet, idx) => (
                                        <li key={idx}>
                                            <CheckCircleOutline fontSize="small" />
                                            {bullet}
                                        </li>
                                    ))}
                                </Box>
                            </Box>
                        </Grid2>
                    ))}
                </Grid2>
            </Box>
        </Box>
    );
};

export default AboutSection;
