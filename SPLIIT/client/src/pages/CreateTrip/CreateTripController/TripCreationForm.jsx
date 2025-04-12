import React, { useContext, useState } from "react";
import {
    TextField,
    MenuItem,
    Button,
    Box,
    Grid,
    Card,
    CardContent,
    IconButton,
    useTheme,
    Typography,
} from "@mui/material";
import { useExchangeRates } from "../../../contexts/ExchangeRates";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { tokens } from "../../../theme";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "./DayPickerStyles.css"; // Import custom styles
import TripCreatedSuccess from "./TripCreatedSuccess";
import { Trip } from "../../../entities/Trip";
import { processImageFile } from "../../../utils/imageUtils";
import { validateTripCreationForm } from "../../../utils/validators";
import { formatNumberWithCommas } from "../../../utils/formatters";

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

    const { setSessionTrip } = useContext(AuthContext);
    const [formData, setFormData] = useState(formResetState);
    const [errors, setErrors] = useState({});
    const { exchangeRates } = useExchangeRates();
    const navigate = useNavigate();
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);
    const [dateRange, setDateRange] = useState({});
    const [createdDialogOpen, setCreatedDialogOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleBudgetChange = (e) => {
        const rawValue = e.target.value.replace(/[^0-9.]/g, ""); // Allow only digits and a period
        if (!/^(\d+(\.\d{0,2})?)?$/.test(rawValue)) return;

        const formattedValue = formatNumberWithCommas(rawValue);
        setFormData((prev) => ({
            ...prev,
            budget: formattedValue,
        }));
    };

    const handleBudgetBlur = (e) => {
        const numericValue = parseFloat(e.target.value.replace(/[^0-9.]/g, ""));
        const formattedPrice = !isNaN(numericValue)
            ? numericValue.toLocaleString("en-SG", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
              })
            : "";
        setFormData((prev) => ({ ...prev, budget: formattedPrice }));
    };

    const handleDateChange = (selectedRange) => {
        setDateRange(selectedRange);
        if (selectedRange?.from && selectedRange?.to) {
            setFormData({
                ...formData,
                startDate: selectedRange.from.toLocaleDateString(),
                endDate: selectedRange.to.toLocaleDateString(),
            });
        }
    };

    // Updated handleUploadImage using the utility function
    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const base64String = await processImageFile(file);
            setFormData({ ...formData, tripImage: base64String });
        } catch (error) {
            console.error("Error processing image:", error);
        }
    };

    const validate = () => {
        const newErrors = validateTripCreationForm(formData);
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        formData.budget = formData.budget.replace(/[^0-9.]/g, "");

        try {
            const newTrip = new Trip(formData);
            const { generatedTripID } = await newTrip.createTrip();

            formData["tripID"] = generatedTripID;
            setSessionTrip(formData); // create the trip object and set it as the current session context

            // Show trip creation success page and bring user back to home when they close the dialog
            setCreatedDialogOpen(true);
        } catch (error) {
            console.error("Error creating trip:", error);
            alert("Something went wrong!");
        }
    };

    return (
        <Box
            display="flex"
            flexDirection={"column"}
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Card
                sx={{
                    width: "70vw",
                    p: 3,
                    borderRadius: 5,
                    boxShadow: 5,
                    backgroundColor: theme.palette.background.default,
                }}
            >
                <CardContent>
                    <Grid container spacing={3}>
                        {/* Left Section */}
                        <Grid item xs={12} md={6}>
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
                                sx={{
                                    mt: 2,
                                    "& .MuiOutlinedInput-root": {
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: colours.primary[100],
                                        },
                                    },
                                    "& .Mui-focused .MuiOutlinedInput-notchedOutline":
                                        {
                                            borderColor: colours.primary[100],
                                        },
                                    "& .MuiInputLabel-root": {
                                        color: colours.primary[100],
                                    },
                                    "& .Mui-focused .MuiInputLabel-root": {
                                        color: colours.primary[100],
                                    },
                                    "& .MuiInputBase-input": {
                                        color: colours.primary[100],
                                    },
                                    "& .Mui-focused .MuiInputBase-input": {
                                        color: colours.primary[100],
                                    },
                                }}
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
                                sx={{
                                    mt: 2,
                                    "& .MuiOutlinedInput-root": {
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: colours.primary[100],
                                        },
                                    },
                                    "& .Mui-focused .MuiOutlinedInput-notchedOutline":
                                        {
                                            borderColor: colours.primary[100],
                                        },
                                    "& .MuiInputLabel-root": {
                                        color: colours.primary[100],
                                    },
                                    "& .Mui-focused .MuiInputLabel-root": {
                                        color: colours.primary[100],
                                    },
                                    "& .MuiInputBase-input": {
                                        color: colours.primary[100],
                                    },
                                    "& .Mui-focused .MuiInputBase-input": {
                                        color: colours.primary[100],
                                    },
                                }}
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
                                        error={errors.foreignCurrency}
                                        helperText={errors.foreignCurrency}
                                        required
                                        sx={{
                                            mt: 2,
                                            "& .MuiOutlinedInput-root": {
                                                "& .MuiOutlinedInput-notchedOutline":
                                                    {
                                                        borderColor:
                                                            colours
                                                                .primary[100],
                                                    },
                                            },
                                            "& .Mui-focused .MuiOutlinedInput-notchedOutline":
                                                {
                                                    borderColor:
                                                        colours.primary[100],
                                                },
                                            "& .MuiInputLabel-root": {
                                                color: colours.primary[100],
                                            },
                                            "& .Mui-focused .MuiInputLabel-root":
                                                {
                                                    color: colours.primary[100],
                                                },
                                            "& .MuiInputBase-input": {
                                                color: colours.primary[100],
                                            },
                                            "& .Mui-focused .MuiInputBase-input":
                                                {
                                                    color: colours.primary[100],
                                                },
                                        }}
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
                                        error={
                                            errors.localCurrency ||
                                            errors.currency
                                        }
                                        helperText={
                                            errors.localCurrency ||
                                            errors.currency
                                        }
                                        required
                                        sx={{
                                            mt: 2,
                                            "& .MuiOutlinedInput-root": {
                                                "& .MuiOutlinedInput-notchedOutline":
                                                    {
                                                        borderColor:
                                                            colours
                                                                .primary[100],
                                                    },
                                            },
                                            "& .Mui-focused .MuiOutlinedInput-notchedOutline":
                                                {
                                                    borderColor:
                                                        colours.primary[100],
                                                },
                                            "& .MuiInputLabel-root": {
                                                color: colours.primary[100],
                                            },
                                            "& .Mui-focused .MuiInputLabel-root":
                                                {
                                                    color: colours.primary[100],
                                                },
                                            "& .MuiInputBase-input": {
                                                color: colours.primary[100],
                                            },
                                            "& .Mui-focused .MuiInputBase-input":
                                                {
                                                    color: colours.primary[100],
                                                },
                                        }}
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
                                sx={{
                                    mt: 2,
                                    "& .MuiOutlinedInput-root": {
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: colours.primary[100],
                                        },
                                    },
                                    "& .Mui-focused .MuiOutlinedInput-notchedOutline":
                                        {
                                            borderColor: colours.primary[100],
                                        },
                                    "& .MuiInputLabel-root": {
                                        color: colours.primary[100],
                                    },
                                    "& .Mui-focused .MuiInputLabel-root": {
                                        color: colours.primary[100],
                                    },
                                    "& .MuiInputBase-input": {
                                        color: colours.primary[100],
                                    },
                                    "& .Mui-focused .MuiInputBase-input": {
                                        color: colours.primary[100],
                                    },
                                }}
                            />

                            <TextField
                                fullWidth
                                label="Budget (in local currency)"
                                variant="outlined"
                                name="budget"
                                value={formData.budget}
                                onChange={handleBudgetChange}
                                onBlur={handleBudgetBlur}
                                sx={{
                                    mt: 2,
                                    "& .MuiOutlinedInput-root": {
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: colours.primary[100],
                                        },
                                    },
                                    "& .Mui-focused .MuiOutlinedInput-notchedOutline":
                                        {
                                            borderColor: colours.primary[100],
                                        },
                                    "& .MuiInputLabel-root": {
                                        color: colours.primary[100],
                                    },
                                    "& .Mui-focused .MuiInputLabel-root": {
                                        color: colours.primary[100],
                                    },
                                    "& .MuiInputBase-input": {
                                        color: colours.primary[100],
                                    },
                                    "& .Mui-focused .MuiInputBase-input": {
                                        color: colours.primary[100],
                                    },
                                }}
                            />
                            <Box p={2}>
                                <Typography variant="h5">
                                    Select departure and arrival dates
                                </Typography>
                                <DayPicker
                                    mode="range"
                                    style={{ width: "100%", padding: 5 }}
                                    onSelect={handleDateChange}
                                    selected={dateRange}
                                    modifiersClassNames={{
                                        selected: "selected-day",
                                        range_start: "range-start",
                                        range_end: "range-end",
                                        range_middle: "range-middle",
                                    }}
                                />
                            </Box>

                            {/* Upload Image Section */}
                            <Button
                                style={{ margin: 15 }}
                                variant="outlined"
                                color="secondary"
                                component="label"
                                startIcon={<FileUploadIcon />}
                            >
                                Upload Trip Image
                                <input
                                    type="file"
                                    hidden
                                    onChange={handleUploadImage}
                                />
                            </Button>
                            {formData.tripImage && (
                                <Box m={2}>
                                    <img
                                        src={formData.tripImage}
                                        alt="Trip Image Preview"
                                        style={{
                                            width: "50%",
                                            objectFit: "cover",
                                            borderRadius: 20,
                                        }}
                                    />
                                    <IconButton
                                        onClick={() =>
                                            setFormData({
                                                ...formData,
                                                tripImage: "",
                                            })
                                        }
                                        color="error"
                                        sx={{ borderRadius: 5, margin: 5 }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            )}
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
                </CardContent>
            </Card>
            <Box display={"flex"} alignItems={"center"} m={4}>
                <Typography mr={3}>Already have a trip created?</Typography>
                <Button variant="outlined" color="info" href="/selecttrip">
                    Select Existing Trips
                </Button>
            </Box>
            <TripCreatedSuccess
                open={createdDialogOpen}
                handleClose={() => {
                    setCreatedDialogOpen(false);
                    navigate("/");
                }}
                trip={formData || undefined}
            />
        </Box>
    );
}

export default TripCreationForm;
