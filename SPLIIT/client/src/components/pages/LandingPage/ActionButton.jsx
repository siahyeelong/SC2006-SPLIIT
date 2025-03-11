import { Button } from "@mui/material";

const ActionButton = ({ text, onClick, to }) => {
    return (
        <Button
            variant="contained"
            sx={{
                width: "100px",
                backgroundColor: "rgba(70, 129, 244, 1)",
                marginTop: "20px",
                padding: "10px 20px",
                fontSize: "1rem",
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
