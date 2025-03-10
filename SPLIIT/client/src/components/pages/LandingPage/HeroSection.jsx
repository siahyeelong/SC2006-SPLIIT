import { Box, Typography } from "@mui/material";
import ActionButton from "./ActionButton";
import landingBackground from "../../assets/landingBackground.jpg";

const HeroSection = () => {
    return (
        <Box
            sx={{
                backgroundImage: `url(${landingBackground})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                color: "white",
                padding: "80px 40px",
                height: "100vh",
                position: "relative",
            }}
        >
            <Typography
                sx={{
                    fontSize: "6rem",
                    fontWeight: "bold",
                    textAlign: "left",
                    margin: "20px",
                    maxWidth: "1100px",
                }}
            >
                Settle Group Expenses With Ease
            </Typography>
            <Typography
                sx={{
                    fontSize: "1.2rem",
                    margin: "20px",
                    color: "#cbd5e1",
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "flex-start",
                }}
            >
                Track, split, and settle group expenses fairly.
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    gap: "20px",
                    marginLeft: "20px",
                }}
            >
                <ActionButton text="Register" />
                <ActionButton text="Login" />
            </Box>
        </Box>
    );
};

export default HeroSection;
