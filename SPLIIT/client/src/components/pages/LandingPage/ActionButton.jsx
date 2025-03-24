import { Button } from "@mui/material";

const ActionButton = ({ text, onClick, to }) => {
    return (
        <Button
            variant="contained"
            sx={{
                width: { xs: "80px", md: "100px" },
                backgroundColor: "rgba(70, 129, 244, 1)",
                mt: { xs: "10px", md: "20px" },
                padding: { xs: "8px 16px", md: "10px 20px" },
                fontSize: { xs: "0.875rem", md: "1rem" },
                borderRadius: "10px",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "rgba(70, 129, 244, 0.8)" },
            }}
            onClick={onClick}
            href={to}
        >
            {text}
        </Button>
    );
};

export default ActionButton;
