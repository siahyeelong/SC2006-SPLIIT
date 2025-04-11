import { Box, IconButton, useTheme } from "@mui/material";
import { ColorModeContext } from "../theme";
import { useContext } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Refresh } from "@mui/icons-material";

function Topbar() {
    const theme = useTheme();
    const colourMode = useContext(ColorModeContext);

    return (
        <Box display="flex" justifyContent="flex-end" p={2}>
            <Box display="flex" justifyContent="flex-end">
                <IconButton onClick={() => window.location.reload()}>
                    <Refresh />
                </IconButton>
                <IconButton onClick={colourMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>
                <IconButton href="/profile">
                    <AccountCircleRoundedIcon />
                </IconButton>
            </Box>
        </Box>
    );
}

export default Topbar;
