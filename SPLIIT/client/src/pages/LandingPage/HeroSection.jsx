import { Box, Typography } from "@mui/material";
import ActionButton from "../../components/common/ActionButton";
import landingBackground from "../../assets/landingBackground.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${landingBackground})`,
                    opacity: 0.6,
                    zIndex: -1,
                },
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                color: "#f5fff6ff",
                padding: {
                    xs: "60px 20px",
                    sm: "80px 40px",
                    xl: "100px 60px",
                },
                minHeight: "70vh",
                position: "relative",
            }}
        >
            <Typography
                variant="h1"
                sx={{
                    fontSize: {
                        xs: "3rem",
                        sm: "3.5rem",
                        md: "4rem",
                        lg: "5rem",
                        xl: "7rem",
                    },
                    fontWeight: "bold",
                    textAlign: "left",
                    margin: "20px",
                    maxWidth: "70%",
                    lineHeight: 1.2,
                }}
            >
                Settle Group Expenses With Ease
            </Typography>
            <Typography
                variant="subtitle1"
                sx={{
                    fontSize: {
                        xs: "1rem",
                        sm: "1.1rem",
                        md: "1.2rem",
                    },
                    margin: "20px",
                    color: "#f7fff1ff",
                    textAlign: "left",
                    maxWidth: "600px",
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
                    flexWrap: "wrap",
                }}
            >
                <ActionButton
                    text="Register"
                    onClick={() => navigate("/register")}
                />
                <ActionButton
                    text="Login"
                    onClick={() => navigate("/login")}
                />
            </Box>
        </Box>
    );
};

export default HeroSection;
