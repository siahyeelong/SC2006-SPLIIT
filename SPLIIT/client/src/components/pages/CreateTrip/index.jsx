import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Header from "../MainUI/Header";
import TripCreationForm from "./TripCreationForm";
import JoinTripButton from "./JoinTripButton";

function CreateTrip() {
  return (
    <Box m="20px">
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Header title={"Create Trip"} subtitle={"Create / Join a trip!"} />
        <JoinTripButton />
      </Box>
      <TripCreationForm />
    </Box>
  );
}

export default CreateTrip;
