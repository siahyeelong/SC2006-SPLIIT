import React, { useContext, useState } from "react";
import {
    TextField,
    MenuItem,
    Button,
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    useTheme,
} from "@mui/material";
import { useExchangeRates } from "../../classes/ExchangeRates";
import { AuthContext } from "../../classes/AuthContext";
import { useNavigate } from "react-router-dom";

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
        users: [localStorage.getItem("user")],
    };

    const [tripID, setTripID] = useState("");
    const { setSessionTrip } = useContext(AuthContext);
    const [formData, setFormData] = useState(formResetState);
    const [errors, setErrors] = useState({});
    const { exchangeRates } = useExchangeRates();
    const navigate = useNavigate();
    const theme = useTheme();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUploadImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setFormData({ ...formData, tripImage: reader.result });
        };
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.tripName.trim())
            newErrors.tripName = "Please enter a trip name.";
        if (!formData.foreignCurrency)
            newErrors.foreignCurrency = "Please select a foreign currency.";
        if (!formData.localCurrency)
            newErrors.localCurrency = "Please select a local currency.";
        if (formData.foreignCurrency === formData.localCurrency)
            newErrors.currency =
                "Foreign and local currency cannot be the same.";
        if (formData.budget && isNaN(formData.budget.replace(/[^0-9.]/g, "")))
            newErrors.budget = "Budget must be a valid number.";
        if (
            formData.startDate &&
            formData.endDate &&
            formData.startDate > formData.endDate
        )
            newErrors.date = "End date must be later than start date.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const backendURL = process.env.REACT_APP_BACKEND_URL;
            const response = await fetch(`${backendURL}/trips/createtrip`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);

            alert("Trip created successfully!");
            const { generatedTripID } = await response.json();
            setTripID(generatedTripID);
            setSessionTrip(generatedTripID);
            navigate("/");
        } catch (error) {
            console.error("Error creating trip:", error);
            alert("Something went wrong!");
        } finally {
            setFormData(formResetState);
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Card
                sx={{
                    bgcolor: theme.palette.background.default,
                    width: "90vw",
                    p: 3,
                    boxShadow: 5,
                }}
            >
                <CardContent>
                    <Grid container spacing={3}>
                        {/* Left Section */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Enter a Trip ID (Optional)"
                                variant="outlined"
                                name="tripID"
                                value={tripID}
                                onChange={(e) => setTripID(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                            />

                            <TextField
                                fullWidth
                                label="Trip Name"
                                variant="outlined"
                                name="tripName"
                                value={formData.tripName}
                                onChange={handleChange}
                                error={!!errors.tripName}
                                helperText={errors.tripName}
                                required
                                sx={{ mt: 2 }}
                            />

                            <TextField
                                fullWidth
                                label="Trip Description"
                                variant="outlined"
                                name="tripDescription"
                                value={formData.tripDescription}
                                onChange={handleChange}
                                multiline
                                rows={3}
                                sx={{ mt: 2 }}
                            />

                            <Grid container spacing={2} sx={{ mt: 2 }}>
                                <Grid item xs={6}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Foreign Currency"
                                        variant="outlined"
                                        name="foreignCurrency"
                                        value={formData.foreignCurrency}
                                        onChange={handleChange}
                                        error={!!errors.foreignCurrency}
                                        helperText={errors.foreignCurrency}
                                        required
                                    >
                                        {Object.keys(exchangeRates).map(
                                            (currency) => (
                                                <MenuItem
                                                    key={currency}
                                                    value={currency}
                                                >
                                                    {currency}
                                                </MenuItem>
                                            )
                                        )}
                                    </TextField>
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Local Currency"
                                        variant="outlined"
                                        name="localCurrency"
                                        value={formData.localCurrency}
                                        onChange={handleChange}
                                        error={!!errors.currency}
                                        helperText={errors.currency}
                                        required
                                    >
                                        {Object.keys(exchangeRates).map(
                                            (currency) => (
                                                <MenuItem
                                                    key={currency}
                                                    value={currency}
                                                >
                                                    {currency}
                                                </MenuItem>
                                            )
                                        )}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Right Section */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Cities/States"
                                variant="outlined"
                                name="cities"
                                value={formData.cities}
                                onChange={handleChange}
                            />

                            <TextField
                                fullWidth
                                label="Budget"
                                variant="outlined"
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                sx={{ mt: 2 }}
                            />

                            <TextField
                                fullWidth
                                type="date"
                                label="Start Date"
                                variant="outlined"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                sx={{ mt: 2 }}
                                InputLabelProps={{ shrink: true }}
                            />

                            <TextField
                                fullWidth
                                type="date"
                                label="End Date"
                                variant="outlined"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                sx={{ mt: 2 }}
                                InputLabelProps={{ shrink: true }}
                            />

                            {/* Upload Image Section */}
                            <Box mt={3}>
                                <Typography variant="body1">
                                    Upload Trip Image
                                </Typography>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleUploadImage}
                                />
                                {formData.tripImage && (
                                    <Box mt={2}>
                                        <img
                                            src={formData.tripImage}
                                            alt="Trip Preview"
                                            style={{
                                                width: "100%",
                                                maxHeight: "200px",
                                                objectFit: "cover",
                                                borderRadius: "8px",
                                            }}
                                        />
                                    </Box>
                                )}
                            </Box>
                        </Grid>
                    </Grid>

                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        sx={{ mt: 3 }}
                        onClick={handleSubmit}
                    >
                        Create Trip
                    </Button>

                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        sx={{ mt: 2 }}
                        href="/selecttrip"
                    >
                        Select Existing Trips
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
}

export default TripCreationForm;
