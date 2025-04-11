import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

function GoogleLoginButton() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const { googleLogin } = useContext(AuthContext);

    useEffect(() => {
        // Log the client ID for debugging
        console.log(
            "Google Client ID:",
            process.env.REACT_APP_GOOGLE_CLIENT_ID
        );

        // Create a specific element ID for the Google button
        const buttonId = "google-signin-button";

        // Function to initialize Google Sign-In
        const initializeGoogleSignIn = () => {
            if (window.google && window.google.accounts) {
                try {
                    console.log("Initializing Google Sign-In");
                    window.google.accounts.id.initialize({
                        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                        callback: handleCredentialResponse,
                    });

                    // Make sure the element exists before rendering
                    const buttonElement = document.getElementById(buttonId);
                    if (buttonElement) {
                        window.google.accounts.id.renderButton(buttonElement, {
                            theme: "outline",
                            size: "large",
                            width: 250,
                        });

                        setLoading(false);
                        console.log("Google Sign-In initialized successfully");
                    } else {
                        console.error("Button element not found");
                    }
                } catch (error) {
                    console.error("Error initializing Google Sign-In:", error);
                }
            } else {
                // If Google API isn't fully loaded yet, check again in 500ms
                console.log("Google API not fully loaded, waiting...");
                setTimeout(initializeGoogleSignIn, 500);
            }
        };

        // Start the initialization process
        setTimeout(initializeGoogleSignIn, 1000); // Give the DOM time to render

        return () => {
            // Cleanup if needed
        };
    }, [navigate]);

    const handleCredentialResponse = async (response) => {
        console.log("Google credential response received");
        try {
            const apiResponse = await fetch(
                `${process.env.REACT_APP_BACKEND_URL || "http://localhost:5050"
                }/users/googlelogin`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ credential: response.credential }),
                    credentials: "include",
                }
            );

            if (apiResponse.ok) {
                const data = await apiResponse.json();
                await googleLogin(data.user, data.token);
                navigate("/selecttrip");
            } else {
                console.error("Google login failed");
            }
        } catch (error) {
            console.error("Error during Google login:", error);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                my: 2,
            }}
        >
            <Typography variant="body2" sx={{ mb: 1 }}>
                Register or login in with Google:
            </Typography>
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 1 }}>
                    <CircularProgress size={24} />
                </Box>
            ) : null}
            {/* Always render this div, regardless of loading state */}
            <div id="google-signin-button"></div>
        </Box>
    );
}

export default GoogleLoginButton;
