import React from "react";
import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../../../theme";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselCard from "./CarouselCard";
import { People } from "../../classes/People";

function Carousel({ debtMatrix_R, debtMatrix_S }) {
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);

    if (!debtMatrix_R || !debtMatrix_S) {
        return (
            <Typography color="error" variant="h6">
                Unable to load debt data.
            </Typography>
        );
    }

    return (
        <Box
            className="carousel"
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            sx={{ width: "100%", maxWidth: "1500px" }}
        >
            {Object.keys(People).map((key) => {
                const personData = People[key]; // Get the person object
                return (
                    <CarouselCard
                        key={personData.identifier}
                        ower={personData}
                        matrix={debtMatrix_R[personData.identifier]}
                    />
                );
            })}
        </Box>
    );
}

export default Carousel;
