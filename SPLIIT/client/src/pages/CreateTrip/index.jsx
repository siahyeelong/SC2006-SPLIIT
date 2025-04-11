import React from "react";
import { Box, } from "@mui/material";
import Header from "../../layouts/Header";
import TripCreationForm from "./CreateTripController/TripCreationForm";
import JoinTripButton from "../../components/common/JoinTripButton";

function CreateTrip() {
    return (
        <Box m="20px">
            <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
            >
                <Header
                    title={"Create Trip"}
                    subtitle={"Create Your Trip or Join One Today!"}
                />
                <JoinTripButton />
            </Box>
            <TripCreationForm />
        </Box>
    );
}

export default CreateTrip;
