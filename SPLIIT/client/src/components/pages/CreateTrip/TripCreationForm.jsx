import React, { useState } from "react";
import { TextField, MenuItem, Button, Box } from "@mui/material";
import { useExchangeRates } from '../../classes/ExchangeRates';

function TripCreationForm() {

    const formResetState = {
        tripID: "",
        tripName: "",
        tripDescription: "",
        foreignCurrency: "",
        localCurrency: "",
        tripImage: null,
        cities: "",
        budget: "",
        startDate: "",
        endDate: "",
        users: "", // TODO: set to cookies' current user
    };

    const [formData, setFormData] = useState(formResetState);

    const [errors, setErrors] = useState({});

    const { exchangeRates } = useExchangeRates();

    // gets all trip IDs to ensure new ID created does not match any
    const getAllTripIDs = async () => {
        // TODO
    }

    // verifies if the tripID keyed in matches a record. if it does, auto submit and move on to the next page
    const handleTripIDChange = (e) => {
        // TODO
        // if e.target.value matches a record
        // file a jointrip request to join the trip
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, tripImage: e.target.files[0] });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.tripName.length) newErrors.tripName = "Please enter a trip name.";
        if (!formData.foreignCurrency) newErrors.foreignCurrency = "Please select a foreign currency.";
        if (!formData.localCurrency) newErrors.localCurrency = "Please select a local currency.";
        if (!formData.budget || isNaN(formData.price.replace(/[^0-9.]/g, ''))) newErrors.price = "Budget must be a valid number.";
        if (formData.startDate > formData.endDate) newErrors.date = "End date must be later than start date."

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // generates a new unique trip ID
    const generateTripID = async () => {
        // TODO
        return 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            // Submit form logic here
            try {
                // Adjust price back to number format
                formData.price = formData.price.replace(/[^0-9.]/g, '')

                let response = "";
                const backendURL = process.env.REACT_APP_BACKEND_URL;

                response = await fetch(`${backendURL}/trips/createtrip`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                alert('Transaction logged successfully!');

            } catch (error) {
                console.error("something went wrong with updating a record: ", error);
                alert("Something went wrong!");
            } finally {
                // Clear form
                setFormData(formResetState);
            }
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
            <TextField label="I have a Trip ID" variant="filled" name="tripID" value={formData.tripID} onChange={handleChange} />
            <TextField label="Trip Name" variant="filled" name="tripName" value={formData.tripName} onChange={handleChange} required />
            <TextField label="Trip Description" variant="filled" name="tripDescription" value={formData.tripDescription} onChange={handleChange} multiline rows={3} />

            {/* TODO: input validation for currency fields. foreign cannot be same as local currency */}
            {/* Currency Dropdowns */}
            <TextField select label="Foreign Currency" variant="filled" name="foreignCurrency" value={formData.foreignCurrency} onChange={handleChange} required>
                {Object.keys(exchangeRates).map((currency) => (
                    <MenuItem key={currency} value={currency}>{currency}</MenuItem>
                ))}
            </TextField>

            <TextField select label="Local Currency" variant="filled" name="localCurrency" value={formData.localCurrency} onChange={handleChange} required>
                {Object.keys(exchangeRates).map((currency) => (
                    <MenuItem key={currency} value={currency}>{currency}</MenuItem>
                ))}
            </TextField>

            {/* File Upload */}
            <Button variant="outlined" color="secondary" component="label">
                Upload Trip Image
                <input type="file" hidden onChange={handleFileChange} />
            </Button>

            {/* TODO: user can type a city / state and when they press enter, they can add more  */}
            <TextField label="Cities/States" variant="filled" name="cities" value={formData.cities} onChange={handleChange} />
            <TextField label="Budget" variant="filled" name="budget" value={formData.budget} onChange={handleChange} type="number" />

            {/* TODO: input validation for date fields. end date cannot be earlier than start date */}
            <TextField label="Start Date" variant="filled" name="startDate" value={formData.startDate} onChange={handleChange} type="date" />
            <TextField label="End Date" variant="filled" name="endDate" value={formData.endDate} onChange={handleChange} type="date" />

            {/* Submit Button */}
            <Button type="submit" variant="contained" color="secondary">
                Submit
            </Button>
        </Box >
    );
}

export default TripCreationForm