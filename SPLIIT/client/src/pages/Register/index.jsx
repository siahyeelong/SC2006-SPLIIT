import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Header from "../../layouts/Header";
import RegisterForm from "./RegisterForm";
import GoogleLoginButton from "../Login/GoogleLoginButton";

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
                pb: 2,
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    textAlign: "center",
                }}
            >
                <Header
                    title={"Register"}
                    subtitle={"Create an account to get started"}
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
                <Typography variant="body1" sx={{ mt: 1 }}>
                    Already have an account?{" "}
                    <a
                        href="/login"
                        style={{ color: "#2196f3", textDecoration: "none" }}
                    >
                        Login
                    </a>
                </Typography>
                <GoogleLoginButton />
            </Box>
        </Box>
    );
}

export default Register;
