import React from "react";
import { Box, useTheme } from "@mui/material";
import Header from "../../layouts/Header";
import LoginForm from "./LoginController/LoginForm";

function Login() {
    const theme = useTheme();

    return (
        <Box
            sx={{
                minHeight: "90vh", // Full viewport height
                // background: "linear-gradient(145deg, #1e1e1e, #121212)", // Gradient background
                bgcolor: theme.palette.background.default,
                color: "white", // White text for contrast
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
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
                    title={"Welcome"}
                    subtitle={"Login to access your account"}
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

            {/* Login Form */}
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 400, // Limit form width
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
                <LoginForm />
            </Box>
        </Box>
    );
}

export default Login;
