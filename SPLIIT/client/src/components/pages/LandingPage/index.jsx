import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ActionButton from "./ActionButton";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import logo from "../../assets/SPLIIT_logo.jpg";

const LandingPage = () => {
    const [scrolled, setScrolled] = useState(false);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            setShowButton(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <Box sx={{ fontFamily: "Poppins, sans-serif" }}>
            <Box
                sx={{
                    top: "0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    padding: {
                        xs: "10px 20px",
                        sm: "15px 30px",
                        md: "20px 40px",
                        lg: "20px 40px",
                    },
                    zIndex: "1000",
                    position: "fixed",
                    backgroundColor: scrolled ? "#141b2d" : "transparent",
                    transition: "background-color 0.3s ease",
                    width: "100%",
                }}
            >
                <a href="/home">
                    <img
                        src={logo}
                        alt="SPLIIT Logo"
                        style={{ height: "clamp(80px, 6vw, 120px)" }}
                    />
                </a>
                {showButton && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            gap: "20px",
                            backgroundColor: "transparent",
                        }}
                    >
                        <ActionButton text="Register" />
                        <ActionButton text="Login" />
                    </Box>
                )}
            </Box>
            <HeroSection />
            <AboutSection />
        </Box>
    );
};

export default LandingPage;
