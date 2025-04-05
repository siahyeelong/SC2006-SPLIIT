import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

function NotFound() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <Box
            sx={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
            }}
        >
            <Box
                sx={{
                    p: { xs: 4, sm: 5, md: 8 },
                    mx: { xs: 2, md: 0 },
                    maxWidth: 800,
                    width: "100%",
                    borderRadius: 4,
                    textAlign: "center",
                }}
            >
                <ErrorOutline
                    sx={{
                        fontSize: { xs: 80, sm: 100, md: 140 },
                        color: "error.main",
                    }}
                />
                <Typography
                    variant="h1"
                    sx={{
                        fontWeight: 700,
                        color: "text.primary",
                        mb: 1,
                        fontSize: { xs: "3rem", sm: "3.5rem", md: "7rem" },
                    }}
                >
                    Oops!
                </Typography>
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 700,
                        color: "text.primary",
                        mb: 2,
                        fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
                    }}
                >
                    404 - Page Not Found
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        color: "text.secondary",
                        mb: 5,
                        fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" },
                    }}
                >
                    Sorry, the page you are looking for could not be found
                </Typography>
                <Button
                    variant="contained"
                    color="error"
                    size="large"
                    onClick={handleGoBack}
                    sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        px: { xs: 4, sm: 5 },
                        py: { xs: 1.5, md: 2 },
                        fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                        borderRadius: 2,
                        boxShadow: 3,
                    }}
                >
                    GO BACK
                </Button>
            </Box>
        </Box>
    );
}

export default NotFound;
