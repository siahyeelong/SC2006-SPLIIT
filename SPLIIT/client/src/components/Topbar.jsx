import { Box, IconButton, InputBase, useTheme } from "@mui/material"
import { ColorModeContext, tokens } from "../theme";
import { useContext } from "react";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import DropdownMenu from "./DropdownMenu";

function Topbar() {

    const theme = useTheme();
    const colours = tokens(theme.palette.mode);
    const colourMode = useContext(ColorModeContext);

    return (
        <Box display='flex' justifyContent='space-between' p={2}>
            <DropdownMenu />
            <Box display='flex'>
                <IconButton onClick={colourMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ?
                        <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />
                    }
                </IconButton>
                <IconButton>
                    <AccountCircleRoundedIcon />
                </IconButton>
            </Box>
        </Box >
    )
}

export default Topbar