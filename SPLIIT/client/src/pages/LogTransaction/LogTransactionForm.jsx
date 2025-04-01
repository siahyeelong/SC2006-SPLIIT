import { React, useContext, useEffect, useState } from "react";
<<<<<<< HEAD:SPLIIT/client/src/pages/LogTransaction/LogTransactionForm.jsx
import { Categories } from "../../constants/Categories";
=======
import { Categories } from "../../classes/Categories";
>>>>>>> f8836b5 (fixed log transaction part. yet to fix dashboard and transactions page):SPLIIT/client/src/components/pages/LogTransaction/LogTransactionForm.jsx
import Chip from "@mui/material/Chip";
import {
    useTheme,
    ToggleButton,
    ToggleButtonGroup,
    InputBase,
    Typography,
} from "@mui/material";
<<<<<<< HEAD:SPLIIT/client/src/pages/LogTransaction/LogTransactionForm.jsx
import { tokens } from "../../theme";
import { useExchangeRates } from "../../contexts/ExchangeRates";
import { AuthContext } from "../../contexts/AuthContext";
=======
import { tokens } from "../../../theme";
import { useExchangeRates } from "../../classes/ExchangeRates";
import { AuthContext } from "../../classes/AuthContext";
>>>>>>> f8836b5 (fixed log transaction part. yet to fix dashboard and transactions page):SPLIIT/client/src/components/pages/LogTransaction/LogTransactionForm.jsx
import { Transaction } from "../../entities/Transaction";

function LogTransactionForm({ onAdd }) {
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);
    const { exchangeRates } = useExchangeRates();
<<<<<<< HEAD:SPLIIT/client/src/pages/LogTransaction/LogTransactionForm.jsx
    const { trip } = useContext(AuthContext);
=======
    const { trip } = useContext(AuthContext)
>>>>>>> f8836b5 (fixed log transaction part. yet to fix dashboard and transactions page):SPLIIT/client/src/components/pages/LogTransaction/LogTransactionForm.jsx
    const [locationStatus, setLocationStatus] = useState("");
    const [people, setPeople] = useState(null);
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
<<<<<<< HEAD:SPLIIT/client/src/pages/LogTransaction/LogTransactionForm.jsx
                setLocationStatus({
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                });
=======
                setLocationStatus({ lat: position.coords.latitude, long: position.coords.longitude });
>>>>>>> f8836b5 (fixed log transaction part. yet to fix dashboard and transactions page):SPLIIT/client/src/components/pages/LogTransaction/LogTransactionForm.jsx
            },
            (error) => {
                if (error.code === error.PERMISSION_DENIED) {
                    console.log("User denied the request for Geolocation.");
                    setLocationStatus("denied");
                } else {
                    console.log("Error getting location:", error.message);
                    setLocationStatus("error");
                }
            }
        );
    };

    const getPeople = async () => {
        try {
<<<<<<< HEAD:SPLIIT/client/src/pages/LogTransaction/LogTransactionForm.jsx
            const p = await trip.getParticipants();
            setPeople(p);
        } catch (error) {
            console.log("error getting people");
        } finally {
            setLoading(false);
        }
    };
=======
            const p = await trip.getParticipants()
            setPeople(p)
        } catch (error) {
            console.log("error getting people")
        } finally {
            setLoading(false)
        }
    }
>>>>>>> f8836b5 (fixed log transaction part. yet to fix dashboard and transactions page):SPLIIT/client/src/components/pages/LogTransaction/LogTransactionForm.jsx

    useEffect(() => {
        getLocation();
        getPeople();
<<<<<<< HEAD:SPLIIT/client/src/pages/LogTransaction/LogTransactionForm.jsx
    }, []);
=======
    }, [])
>>>>>>> f8836b5 (fixed log transaction part. yet to fix dashboard and transactions page):SPLIIT/client/src/components/pages/LogTransaction/LogTransactionForm.jsx

    // default form state
    const formResetState = {
        recipients: [],
        category: "",
        price: "",
        currency: trip.foreignCurrency,
        isLocalCurrency: false,
<<<<<<< HEAD:SPLIIT/client/src/pages/LogTransaction/LogTransactionForm.jsx
        exchangeRate: parseFloat(
            exchangeRates[trip.foreignCurrency] /
                exchangeRates[trip.localCurrency]
        ), // foreign : local exchange rate
        description: "",
        payer: "",
        tripID: trip.tripID,
        geolocation: "",
=======
        description: "",
        payer: "",
        tripID: trip.tripID,
        geolocation: locationStatus,
>>>>>>> f8836b5 (fixed log transaction part. yet to fix dashboard and transactions page):SPLIIT/client/src/components/pages/LogTransaction/LogTransactionForm.jsx
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
<<<<<<< HEAD:SPLIIT/client/src/pages/LogTransaction/LogTransactionForm.jsx
                return {
                    ...prev,
                    currency: newCurrency,
                    isLocalCurrency: newCurrency === trip.localCurrency,
                };
=======
                return { ...prev, currency: newCurrency, isLocalCurrency: (newCurrency === trip.localCurrency) };
>>>>>>> f8836b5 (fixed log transaction part. yet to fix dashboard and transactions page):SPLIIT/client/src/components/pages/LogTransaction/LogTransactionForm.jsx
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

    const formatNumberWithCommas = (value) => {
        // def can make this optimal but screw this shit man
        // Remove any non-numeric characters except for the decimal point
        const numberPart = value.replace(/[^0-9.]/g, "");

        // Separate the integer and decimal parts
        const [integerPart, decimalPart] = numberPart.split(".");

        // Format the integer part with commas
        const formattedIntegerPart = integerPart.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ","
        );

        // If there's a decimal part, ensure it's properly formatted with up to 2 decimal places
        const formattedDecimalPart = decimalPart
            ? "." + decimalPart.slice(0, 2) // Limit decimal to 2 places
            : "";

        // Return the formatted number with or without decimal
        return numberPart.endsWith(".")
            ? formattedIntegerPart + "."
            : formattedIntegerPart + formattedDecimalPart;
    };

    // Handle exchange rate hint
    const exchangeRateHint = () => {
        const lc = exchangeRates[trip.localCurrency];
        const fc = exchangeRates[trip.foreignCurrency];

<<<<<<< HEAD:SPLIIT/client/src/pages/LogTransaction/LogTransactionForm.jsx
        return lc > fc
            ? `${trip.localCurrency} ${parseFloat(lc / fc).toFixed(2)} = ${
                  trip.foreignCurrency
              } 1`
            : `${trip.localCurrency} 1 = ${trip.foreignCurrency} ${parseFloat(
                  fc / lc
              ).toFixed(2)}`;
    };
=======
        return lc > fc ?
            `${trip.localCurrency} ${parseFloat(lc / fc).toFixed(2)} = ${trip.foreignCurrency} 1}`
            :
            `${trip.localCurrency} 1 = ${trip.foreignCurrency} ${parseFloat(fc / lc).toFixed(2)}`
    }
>>>>>>> f8836b5 (fixed log transaction part. yet to fix dashboard and transactions page):SPLIIT/client/src/components/pages/LogTransaction/LogTransactionForm.jsx

    // Handle all other changes by updating the corresponding values
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.recipients.length)
            newErrors.recipients = "Please select at least one recipient.";
        if (!formData.category)
            newErrors.category = "Please select a category.";
        if (!formData.price || isNaN(formData.price.replace(/[^0-9.]/g, "")))
            newErrors.price = "Price must be a valid number.";
        if (!formData.description)
            newErrors.description = "Description is required.";
        if (!formData.payer) newErrors.payer = "Please select who paid.";

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
<<<<<<< HEAD:SPLIIT/client/src/pages/LogTransaction/LogTransactionForm.jsx
                formData.geolocation = locationStatus;
=======

>>>>>>> f8836b5 (fixed log transaction part. yet to fix dashboard and transactions page):SPLIIT/client/src/components/pages/LogTransaction/LogTransactionForm.jsx
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
<<<<<<< HEAD:SPLIIT/client/src/pages/LogTransaction/LogTransactionForm.jsx
    if (loading) return <Typography>Loading...</Typography>;
=======
    if (loading) return <Typography>Loading...</Typography>
>>>>>>> f8836b5 (fixed log transaction part. yet to fix dashboard and transactions page):SPLIIT/client/src/components/pages/LogTransaction/LogTransactionForm.jsx
    return (
        <form onSubmit={handleSubmit} className="container mt-4 ">
            {/* Chip select input for recipients */}
            <div className="mb-3">
                <label className="form-label">Who is it for?</label>
                <br />
                <div className="chip-group">
                    {people.map((person) => {
<<<<<<< HEAD:SPLIIT/client/src/pages/LogTransaction/LogTransactionForm.jsx
                        const selected = formData.recipients.includes(
                            person.username
                        );
                        return (
                            <Chip
                                key={person.username}
=======
                        const selected = formData.recipients.includes(person);
                        return (
                            <Chip
                                key={person}
>>>>>>> f8836b5 (fixed log transaction part. yet to fix dashboard and transactions page):SPLIIT/client/src/components/pages/LogTransaction/LogTransactionForm.jsx
                                label={person.displayName}
                                sx={{
                                    color: "#000",
                                    backgroundColor: selected
                                        ? person.favColour
                                        : "#e0e0e0",
                                    margin: "0.25%",
                                    "&:hover": {
<<<<<<< HEAD:SPLIIT/client/src/pages/LogTransaction/LogTransactionForm.jsx
                                        backgroundColor: person.favColour,
=======
                                        backgroundColor:
                                            person.favColour,
>>>>>>> f8836b5 (fixed log transaction part. yet to fix dashboard and transactions page):SPLIIT/client/src/components/pages/LogTransaction/LogTransactionForm.jsx
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
                                className={`chip ${selected ? "chip-selected" : ""
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
<<<<<<< HEAD:SPLIIT/client/src/pages/LogTransaction/LogTransactionForm.jsx
                        alignItems: "flex-start",
                    }}
                >
                    <label className="form-label">Price</label>
                    <Typography ml={2} color="grey">
                        {" "}
                        {exchangeRateHint()}{" "}
                    </Typography>
=======
                        alignItems: "flex-start"
                    }}>
                    <label className="form-label">Price</label>
                    <Typography ml={2} color="grey"> {exchangeRateHint()} </Typography>
>>>>>>> f8836b5 (fixed log transaction part. yet to fix dashboard and transactions page):SPLIIT/client/src/components/pages/LogTransaction/LogTransactionForm.jsx
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
<<<<<<< HEAD:SPLIIT/client/src/pages/LogTransaction/LogTransactionForm.jsx
                        <ToggleButton
                            value={trip.foreignCurrency}
                            key="foreign"
                        >
=======
                        <ToggleButton value={trip.foreignCurrency} key="foreign">
>>>>>>> f8836b5 (fixed log transaction part. yet to fix dashboard and transactions page):SPLIIT/client/src/components/pages/LogTransaction/LogTransactionForm.jsx
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
                    {people.map((person) => (
<<<<<<< HEAD:SPLIIT/client/src/pages/LogTransaction/LogTransactionForm.jsx
                        <option value={person.username} key={person.username}>
=======
                        <option value={person} key={person}>
>>>>>>> f8836b5 (fixed log transaction part. yet to fix dashboard and transactions page):SPLIIT/client/src/components/pages/LogTransaction/LogTransactionForm.jsx
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
