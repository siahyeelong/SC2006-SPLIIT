import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Header from "../MainUI/Header";
import RegisterForm from "./RegisterForm";

function Register() {
    const theme = useTheme();
    return (
        <Box
            sx={{
                minHeight: "100vh", // Full viewport height
                // background: "linear-gradient(145deg, #1e1e1e, #121212)", // Gradient background
                bgcolor: theme.palette.background.default,
                color: "white", // White text for contrast
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start", // Align content to the top
                pt: 4, // Reduced padding top to shift content up
                pb: 4, // Padding bottom to ensure footer is visible
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    textAlign: "center",
                    mb: 2, // Reduced margin bottom to bring form closer
                }}
            >
                <Header
                    title={"Create an Account"}
                    subtitle={"Register to get started"}
                    sx={{
                        "& .MuiTypography-h1": {
                            fontSize: "2.5rem", // Larger title
                            fontWeight: "bold",
                        },
                        "& .MuiTypography-h5": {
                            fontSize: "1.2rem", // Larger subtitle
                            color: "text.secondary",
                        },
                    }}
                />
            </Box>

            {/* Registration Form */}
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 800, // Increased form width
                    // bgcolor: "background.paper", // Form background
                    bgcolor: theme.palette.background.default,
                    p: 4, // Padding
                    borderRadius: 4, // Rounded corners
                    // boxShadow: 6, // Shadow for depth
                    transition:
                        "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    "&:hover": {
                        transform: "translateY(-5px)", // Lift effect on hover
                        // boxShadow: 8,
                    },
                }}
            >
                <RegisterForm />
            </Box>

            {/* Footer */}
            <Box
                sx={{
                    mt: 4, // Margin top
                    textAlign: "center",
                    color: "text.secondary",
                }}
            >
                <Typography variant="body2" sx={{ mt: 1 }}>
                    Already have an account?{" "}
                    <a
                        href="/login"
                        style={{ color: "#2196f3", textDecoration: "none" }}
                    >
                        Login
                    </a>
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                    &copy; 2023 Your Company. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
}

export default Register;
