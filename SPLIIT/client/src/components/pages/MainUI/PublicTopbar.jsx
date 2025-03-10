import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import logo from "../../assets/SPLIIT_logo.jpg";

function PublicTopbar() {
    return (
        <Box display={"flex"} justifyContent={"center"} p={3}>
            <a href="/home">
                <img src={logo} height={50} />
            </a>
        </Box>
    );
}

export default PublicTopbar;
