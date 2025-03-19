import React, { useContext, useState } from "react";
import { TextField, MenuItem, Button, Box, Typography, IconButton } from "@mui/material";
import { useExchangeRates } from "../../classes/ExchangeRates";
import { AuthContext } from "../../classes/AuthContext";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

function TripCreationForm() {
    const formResetState = {
        tripName: "",
        tripDescription: "",
        foreignCurrency: "",
        localCurrency: "",
        tripImage: null,
        cities: "",
        budget: "",
        startDate: "",
        endDate: "",
        users: [localStorage.getItem("user")], // set to session's active user
    };

    const [tripID, setTripID] = useState();
    const { setSessionTrip } = useContext(AuthContext);
    const [formData, setFormData] = useState(formResetState);
    const [errors, setErrors] = useState({});
    const { exchangeRates } = useExchangeRates();
    const navigate = useNavigate();


    const getAllTripIDs = async () => {
        // TODO
    };

    // verifies if the tripID keyed in matches a record. if it does, auto submit and move on to the next page
    const handleTripIDChange = (e) => {
        // TODO
        // if e.target.value matches a record
        // file a jointrip request to join the trip
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Read the image file as a Data URL
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                // Determine the square crop size (smallest dimension)
                const size = Math.min(img.width, img.height);
                const sx = (img.width - size) / 2;  // Crop start X
                const sy = (img.height - size) / 2; // Crop start Y

                // Set canvas size to 512x512
                canvas.width = 512;
                canvas.height = 512;

                // Draw cropped and resized image
                ctx.drawImage(img, sx, sy, size, size, 0, 0, 512, 512);

                // Convert canvas to Base64 with JPEG compression (quality: 0.8)
                const base64String = canvas.toDataURL("image/jpeg", 0.8);

                // Store Base64 in state
                setFormData({ ...formData, tripImage: base64String });
                console.log(base64String)
            };
        };
    };


    const validate = () => {
        const newErrors = {};
        if (!formData.tripName.length)
            newErrors.tripName = "Please enter a trip name.";
        if (!formData.foreignCurrency)
            newErrors.foreignCurrency = "Please select a foreign currency.";
        if (!formData.localCurrency)
            newErrors.localCurrency = "Please select a local currency.";
        if (formData.budget && isNaN(formData.budget.replace(/[^0-9.]/g, "")))
            newErrors.budget = "Budget must be a valid number.";
        if (formData.startDate > formData.endDate)
            newErrors.date = "End date must be later than start date.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            // Submit form logic here
            try {

                const backendURL = process.env.REACT_APP_BACKEND_URL;
                const response = await fetch(`${backendURL}/trips/createtrip`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`);

                // creation success
                alert("Trip created successfully!");
                const { generatedTripID } = await response.json()
                // set current session trip as the trip ID
                setTripID(generatedTripID)
                console.log("trip ID is", generatedTripID)
                setSessionTrip(generatedTripID)
                navigate("/")
            } catch (error) {
                console.error(
                    "something went wrong with creating a trip: ",
                    error
                );
                alert("Something went wrong!");
            } finally {
                // Clear form
                setFormData(formResetState);
            }
        }
        else {
            console.log("Errors exist:", errors)
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                maxWidth: 400,
                mx: "auto",
                mt: 4,
            }}
        >
            {/* TODO: reformat the layout of the form to make UI more logical */}

            {/* TODO: once this field is filled in, all other fields should be disabled */}
            <TextField
                label="I have a Trip ID"
                variant="filled"
                name="tripID"
                value={tripID}
                onChange={handleTripIDChange}
            />
            <TextField
                label="Trip Name"
                variant="filled"
                name="tripName"
                value={formData.tripName}
                onChange={handleChange}
                required
            />
            <TextField
                label="Trip Description"
                variant="filled"
                name="tripDescription"
                value={formData.tripDescription}
                onChange={handleChange}
                multiline
                rows={3}
            />

            {/* TODO: input validation for currency fields. foreign cannot be same as local currency */}
            {/* Currency Dropdowns */}
            <TextField
                select
                label="Foreign Currency"
                variant="filled"
                name="foreignCurrency"
                value={formData.foreignCurrency}
                onChange={handleChange}
                required
            >
                {Object.keys(exchangeRates).map((currency) => (
                    <MenuItem key={currency} value={currency}>
                        {currency}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                select
                label="Local Currency"
                variant="filled"
                name="localCurrency"
                value={formData.localCurrency}
                onChange={handleChange}
                required
            >
                {Object.keys(exchangeRates).map((currency) => (
                    <MenuItem key={currency} value={currency}>
                        {currency}
                    </MenuItem>
                ))}
            </TextField>

            {/* File Upload */}
            <Button variant="outlined" color="secondary" component="label">
                Upload Trip Image
                <input type="file" hidden onChange={handleUploadImage} />
            </Button>
            {formData.tripImage && (
                <>
                    <Box display={"flex"} justifyContent={"space-between"}>
                        <Typography variant="h6" color="secondary" display="block">Preview:</Typography>
                        <img src={formData.tripImage} alt="Preview" style={{ width: "200px", borderRadius: 20 }} />
                        <IconButton onClick={() => setFormData({ ...formData, tripImage: "" })} color="error" sx={{ borderRadius: 5 }}><DeleteIcon /></IconButton>
                    </Box>
                </>
            )
            }

            {/* TODO: user can type a city / state and when they press enter, they can add more  */}
            <TextField
                label="Cities/States"
                variant="filled"
                name="cities"
                value={formData.cities}
                onChange={handleChange}
            />
            <TextField
                label="Budget"
                variant="filled"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                type="number"
            />

            {/* TODO: input validation for date fields. end date cannot be earlier than start date */}
            <TextField
                label="Start Date"
                variant="filled"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                type="date"
            />
            {errors.date && <Typography color="error">{errors.date}</Typography>}
            <TextField
                label="End Date"
                variant="filled"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                type="date"
            />

            {/* Submit Button */}
            <Button type="submit" variant="contained" color="secondary">
                Submit
            </Button>

            <Button variant='outlined' color='info' sx={{ margin: 5 }} href='/selecttrip'>Select existing trips instead</Button>
        </Box >
    );
}

export default TripCreationForm;
