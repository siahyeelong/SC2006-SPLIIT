import { React, useContext, useEffect, useState } from "react";
import { Categories } from "../../../constants/Categories";
import Chip from "@mui/material/Chip";
import {
    useTheme,
    ToggleButton,
    ToggleButtonGroup,
    InputBase,
    Typography,
} from "@mui/material";
import { tokens } from "../../../theme";
import { useExchangeRates } from "../../../contexts/ExchangeRates";
import { AuthContext } from "../../../contexts/AuthContext";
import { Transaction } from "../../../entities/Transaction";
import {
    validateTransactionForm,
    validateGeolocation,
} from "../../../utils/validators";
import { formatNumberWithCommas } from "../../../utils/formatters";

function LogTransactionForm({ onAdd }) {
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);
    const { exchangeRates } = useExchangeRates();
    const { trip } = useContext(AuthContext);
    // locationStatus is either an object with (lat, long) or a string for errors/status
    const [locationStatus, setLocationStatus] = useState(null);
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);

    // function that gets user's lat and long if enabled
    const getLocation = () => {
        if (!navigator.geolocation) {
            console.log("Geolocation is not supported by this browser.");
            setLocationStatus("unsupported");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocationStatus({
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                });
            },
            (error) => {
                if (error.code === error.PERMISSION_DENIED) {
                    console.log("User denied the request for Geolocation.");
                    setLocationStatus({ error: "denied", code: error.code });
                } else {
                    console.log("Error getting location:", error.message);
                    setLocationStatus({
                        error: "error",
                        message: error.message,
                        code: error.code,
                    });
                }
            }
        );
    };

    const getPeople = async () => {
        try {
            const p = await trip.getParticipants();
            setPeople(p || []);
        } catch (error) {
            console.log("error getting people");
            setPeople([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getLocation();
        getPeople();
    }, []);

    // If the geolocation is valid, return true
    const isValidGeolocation = validateGeolocation(locationStatus);

    // default form state
    const formResetState = {
        recipients: [],
        category: "",
        price: "",
        currency: trip.foreignCurrency,
        isLocalCurrency: false,
        exchangeRate: parseFloat(
            exchangeRates[trip.foreignCurrency] /
                exchangeRates[trip.localCurrency]
        ), // foreign : local exchange rate
        description: "",
        payer: "",
        tripID: trip.tripID,
        geolocation: isValidGeolocation ? locationStatus : null,
    };

    const [formData, setFormData] = useState(formResetState);
    const [errors, setErrors] = useState({});

    // Handle chip select change: append / remove recipients from recipients array
    const handleChipSelection = (identifier) => {
        setFormData((prev) => {
            const updatedRecipients = prev.recipients.includes(identifier)
                ? prev.recipients.filter((id) => id !== identifier)
                : [...prev.recipients, identifier];
            return { ...prev, recipients: updatedRecipients };
        });
    };

    // Handle currency change
    const handleCurrencyChange = (event, newCurrency) => {
        if (newCurrency) {
            setFormData((prev) => {
                return {
                    ...prev,
                    currency: newCurrency,
                    isLocalCurrency: newCurrency === trip.localCurrency,
                };
            });
        }
    };

    const handlePriceChange = (e) => {
        const rawValue = e.target.value.replace(/[^0-9.]/g, ""); // Allow only digits and a period
        if (!/^(\d+(\.\d{0,2})?)?$/.test(rawValue)) return; // Prevents invalid decimal formats

        // Delay or blur event to format the displayed value
        const formattedValue = formatNumberWithCommas(rawValue); // Keep raw input for better typing experience

        setFormData((prev) => ({
            ...prev,
            price: formattedValue,
        }));
    };

    const handlePriceBlur = (e) => {
        const numericValue = parseFloat(e.target.value.replace(/[^0-9.]/g, ""));
        const formattedPrice = !isNaN(numericValue)
            ? numericValue.toLocaleString("en-SG", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
              })
            : "";
        setFormData((prev) => ({ ...prev, price: formattedPrice }));
    };

    // Handle exchange rate hint
    const exchangeRateHint = () => {
        const lc = exchangeRates[trip.localCurrency];
        const fc = exchangeRates[trip.foreignCurrency];

        return lc > fc
            ? `${trip.localCurrency} ${parseFloat(lc / fc).toFixed(2)} = ${
                  trip.foreignCurrency
              } 1`
            : `${trip.localCurrency} 1 = ${trip.foreignCurrency} ${parseFloat(
                  fc / lc
              ).toFixed(2)}`;
    };

    // Handle all other changes by updating the corresponding values
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const validate = () => {
        const newErrors = validateTransactionForm(formData);
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    async function handleSubmit(e) {
        e.preventDefault();
        if (validate()) {
            // Submit form logic here
            try {
                // Adjust price back to number format
                formData.price = formData.price.replace(/[^0-9.]/g, "");
                formData.geolocation = isValidGeolocation
                    ? locationStatus
                    : null; // Only set if valid
                const newTransaction = new Transaction(formData);
                const response = await newTransaction.submit(); // submit transaction record

                onAdd("Transaction logged successfully!", "success");
            } catch (error) {
                console.error(
                    "something went wrong with updating a record: ",
                    error
                );
                onAdd("Something went wrong!", "error");
            } finally {
                // Clear form
                setFormData(formResetState);
            }
        }
    }
    if (loading) return <Typography>Loading...</Typography>;
    return (
        <form onSubmit={handleSubmit} className="container mt-4 ">
            {/* Chip select input for recipients */}
            <div className="mb-3">
                <label className="form-label">Who is it for?</label>
                <br />
                <div className="chip-group">
                    {people?.map((person) => {
                        const selected = formData.recipients.includes(
                            person.username
                        );
                        return (
                            <Chip
                                key={person.username}
                                label={person.displayName}
                                sx={{
                                    color: "#000",
                                    backgroundColor: selected
                                        ? person.favColour
                                        : "#e0e0e0",
                                    margin: "0.25%",
                                    "&:hover": {
                                        backgroundColor: person.favColour,
                                    },
                                }}
                                clickable
                                onClick={() =>
                                    handleChipSelection(person.username)
                                }
                                onDelete={
                                    selected
                                        ? () =>
                                              handleChipSelection(
                                                  person.username
                                              )
                                        : undefined
                                }
                                className={`chip ${
                                    selected ? "chip-selected" : ""
                                }`}
                            />
                        );
                    })}
                </div>

                {errors.recipients && (
                    <div className="text-danger">{errors.recipients}</div>
                )}
            </div>
            {/* Dropdown input for category selection */}
            <div className="mb-3">
                <label
                    htmlFor="category"
                    key="categoryselection"
                    className="form-label"
                >
                    Category
                </label>
                <select
                    id="category"
                    className="form-select"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option key="default" value="">
                        Select Category
                    </option>
                    {Object.keys(Categories).map((cat) => (
                        <option value={cat} key={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
                {errors.category && (
                    <div className="text-danger">{errors.category}</div>
                )}
            </div>
            {/* Text input for price input */}
            <div className="mb-3">
                <div
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                    }}
                >
                    <label className="form-label">Price</label>
                    <Typography ml={2} color="grey">
                        {" "}
                        {exchangeRateHint()}{" "}
                    </Typography>
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "white",
                        borderRadius: "8px",
                    }}
                >
                    {/* Currency button toggle buttons */}
                    <ToggleButtonGroup
                        value={formData.currency}
                        exclusive
                        id="currency"
                        onChange={handleCurrencyChange}
                        aria-label="Currency"
                        sx={{
                            "& .MuiToggleButton-root": {
                                background: "#fcfcfc",
                                color: "black",
                                "&.Mui-selected": {
                                    backgroundColor: colours.greenAccent[600], // Darker green for selected
                                    color: colours.grey[100],
                                },
                            },
                        }}
                    >
                        <ToggleButton value={trip.localCurrency} key="local">
                            {trip.localCurrency}
                        </ToggleButton>
                        <ToggleButton
                            value={trip.foreignCurrency}
                            key="foreign"
                        >
                            {trip.foreignCurrency}
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <InputBase
                        required
                        id="price"
                        type="text"
                        value={formData.price}
                        onChange={handlePriceChange}
                        onBlur={handlePriceBlur}
                        placeholder="Enter price"
                        variant="outlined"
                        style={{
                            flexGrow: 1,
                            marginLeft: "8px",
                            color: "black",
                        }}
                    />
                </div>
                {errors.price && (
                    <div className="text-danger">{errors.price}</div>
                )}
            </div>
            {/* Text input for description input */}
            <div className="mb-3">
                <label htmlFor="description" className="form-label">
                    Description
                </label>
                <textarea
                    name="description"
                    id="description"
                    className="form-control"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                ></textarea>
                {errors.description && (
                    <div className="text-danger">{errors.description}</div>
                )}
            </div>
            {/* Dropdown input for who paid */}
            <div className="mb-3">
                <label htmlFor="payer" className="form-label">
                    Who Paid?
                </label>
                <select
                    name="payer"
                    id="payer"
                    className="form-select"
                    value={formData.payer}
                    onChange={handleChange}
                >
                    <option key="default" value="">
                        Select Payer
                    </option>
                    {people?.map((person) => (
                        <option value={person.username} key={person.username}>
                            {person.displayName}
                        </option>
                    ))}
                </select>
                {errors.payer && (
                    <div className="text-danger">{errors.payer}</div>
                )}
            </div>

            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>
    );
}

export default LogTransactionForm;
