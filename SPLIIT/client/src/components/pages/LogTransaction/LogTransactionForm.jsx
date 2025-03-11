import { React, useState } from 'react'
import { People } from '../../classes/People';
import { Categories } from '../../classes/Categories';
import Chip from '@mui/material/Chip';
import { useTheme, ToggleButton, ToggleButtonGroup, InputBase } from '@mui/material';
import { tokens } from '../../../theme'
import { useExchangeRates } from '../../classes/ExchangeRates';

function LogTransactionForm() {
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);
    const { exchangeRates } = useExchangeRates();

    const formResetState = {
        recipients: [],
        category: '',
        price: '',
        currency: 'SGD',
        description: '',
        payer: ''
    }

    const [formData, setFormData] = useState(formResetState);

    const [errors, setErrors] = useState({});

    // Handle chip select change: append / remove recipients from recipients array
    const handleChipSelection = (identifier) => {
        setFormData((prev) => {
            const updatedRecipients = prev.recipients.includes(identifier)
                ? prev.recipients.filter(id => id !== identifier)
                : [...prev.recipients, identifier];
            return { ...prev, recipients: updatedRecipients };
        });
    };

    // Handle currency change
    const handleCurrencyChange = (event, newCurrency) => {
        if (newCurrency) {
            setFormData((prev) => {
                return { ...prev, currency: newCurrency };
            });
        }
    };

    const handlePriceChange = (e) => {
        const rawValue = e.target.value.replace(/[^0-9.]/g, ''); // Allow only digits and a period
        if (!/^(\d+(\.\d{0,2})?)?$/.test(rawValue)) return; // Prevents invalid decimal formats

        const newCurrency = rawValue > exchangeRates['IDR'] ? 'IDR' : 'SGD';

        // Delay or blur event to format the displayed value
        const formattedValue = formatNumberWithCommas(rawValue); // Keep raw input for better typing experience

        setFormData((prev) => ({ ...prev, price: formattedValue, currency: newCurrency }));
    };

    const handlePriceBlur = (e) => {
        const numericValue = parseFloat(e.target.value.replace(/[^0-9.]/g, ''));
        const formattedPrice = !isNaN(numericValue)
            ? numericValue.toLocaleString('en-SG', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
            })
            : '';
        setFormData((prev) => ({ ...prev, price: formattedPrice }));
    };

    const formatNumberWithCommas = (value) => { // def can make this optimal but screw this shit man
        // Remove any non-numeric characters except for the decimal point
        const numberPart = value.replace(/[^0-9.]/g, '');

        // Separate the integer and decimal parts
        const [integerPart, decimalPart] = numberPart.split('.');

        // Format the integer part with commas
        const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        // If there's a decimal part, ensure it's properly formatted with up to 2 decimal places
        const formattedDecimalPart = decimalPart
            ? '.' + decimalPart.slice(0, 2)  // Limit decimal to 2 places
            : '';

        // Return the formatted number with or without decimal
        return numberPart.endsWith('.') ? formattedIntegerPart + '.' : formattedIntegerPart + formattedDecimalPart;
    };

    // Handle all other changes by updating the corresponding values
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.recipients.length) newErrors.recipients = "Please select at least one recipient.";
        if (!formData.category) newErrors.category = "Please select a category.";
        if (!formData.price || isNaN(formData.price.replace(/[^0-9.]/g, ''))) newErrors.price = "Price must be a valid number.";
        if (!formData.description) newErrors.description = "Description is required.";
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
                formData.price = formData.price.replace(/[^0-9.]/g, '')

                let response = "";
                const backendURL = process.env.REACT_APP_BACKEND_URL;

                response = await fetch(`${backendURL}/transactions`, {
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
        < form onSubmit={handleSubmit} className="container mt-4 " >
            {/* Chip select input for recipients */}
            < div className="mb-3" >
                <label className="form-label">Who is it for?</label><br />
                <div className="chip-group">
                    {Object.keys(People).map((person) => {
                        const selected = formData.recipients.includes(person);
                        return (
                            <Chip
                                key={person}
                                label={People[person].displayName}
                                sx={{
                                    color: '#000',
                                    backgroundColor: selected ? People[person].favColour : '#e0e0e0',
                                    margin: '0.25%',
                                    '&:hover': { backgroundColor: People[person].favColour }
                                }}
                                clickable
                                onClick={() => handleChipSelection(person)}
                                onDelete={selected ? () => handleChipSelection(person) : undefined}
                                className={`chip ${selected ? 'chip-selected' : ''}`}
                            />
                        );
                    })}
                </div>

                {errors.recipients && <div className="text-danger">{errors.recipients}</div>}
            </div >
            {/* Dropdown input for category selection */}
            < div className="mb-3" >
                <label htmlFor="category" key="categoryselection" className="form-label">Category</label>
                <select id="category" className="form-select" value={formData.category} onChange={handleChange}>
                    <option key="default" value="">Select Category</option>
                    {Object.keys(Categories).map((cat) => (
                        <option value={cat} key={cat}>{cat}</option>
                    ))}
                </select>
                {errors.category && <div className="text-danger">{errors.category}</div>}
            </div >
            {/* Text input for price input */}
            < div className="mb-3" >
                <label className="form-label">Price</label>
                <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', borderRadius: '8px' }}>
                    <ToggleButtonGroup
                        value={formData.currency}
                        exclusive
                        id='currency'
                        onChange={handleCurrencyChange}
                        aria-label="Currency"
                        sx={{
                            '& .MuiToggleButton-root': {
                                background: '#fcfcfc',
                                color: 'black',
                                '&.Mui-selected': {
                                    backgroundColor: colours.greenAccent[600], // Darker green for selected
                                    color: colours.grey[100],
                                },
                            },
                        }}
                    >
                        <ToggleButton value="SGD" aria-label="SGD" key="SGD">
                            SGD
                        </ToggleButton>
                        <ToggleButton value="IDR" aria-label="IDR" key="IDR">
                            IDR
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <InputBase
                        required
                        id='price'
                        type='text'
                        value={formData.price}
                        onChange={handlePriceChange}
                        onBlur={handlePriceBlur}
                        placeholder="Enter price"
                        variant="outlined"
                        style={{ flexGrow: 1, marginLeft: '8px', color: 'black' }}
                    />
                </div>
                {errors.price && <div className="text-danger">{errors.price}</div>}
            </div >
            {/* Text input for description input */}
            < div className="mb-3" >
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                    name="description"
                    id="description"
                    className="form-control"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                ></textarea>
                {errors.description && <div className="text-danger">{errors.description}</div>}
            </div >
            {/* Dropdown input for who paid */}
            < div className="mb-3" >
                <label htmlFor="payer" className="form-label">Who Paid?</label>
                <select name="payer" id="payer" className="form-select" value={formData.payer} onChange={handleChange}>
                    <option key="default" value="">Select Payer</option>
                    {Object.keys(People).map((person) => (
                        <option value={person} key={person}>{People[person].displayName}</option>
                    ))}
                </select>
                {errors.payer && <div className="text-danger">{errors.payer}</div>}
            </div >

            <button type="submit" className="btn btn-primary">Submit</button>
        </form >
    )
}

export default LogTransactionForm