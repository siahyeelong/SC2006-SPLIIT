const PASSWORD_LENGTH = 8; // Minimum password length

// validate register form
export const validateRegister = (formData) => {
    const errors = {};

    if (!formData.email.trim()) errors.email = "Please enter an email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        errors.email = "Please enter a valid email address.";

    if (!formData.username.trim())
        errors.username = "Please enter a unique username.";
    else if (/\s/.test(formData.username))
        errors.username = "Username should not contain whitespaces.";

    if (!formData.password.trim()) errors.password = "Please enter a password.";
    else if (formData.password.length < PASSWORD_LENGTH)
        errors.password = `Password must have at least ${PASSWORD_LENGTH} characters`;
    else if (/\s/.test(formData.password))
        errors.password = "Password should not contain whitespaces.";

    if (!formData.displayName.trim())
        errors.displayName = "Please enter a display name.";

    if (!formData.favColour.trim())
        errors.favColour = "Please select a favourite colour.";

    return errors;
};

// vaidate login form
export const validateLogin = (formData) => {
    const errors = {};

    if (!formData.username.trim()) errors.username = "Please enter a username.";
    else if (/\s/.test(formData.username))
        errors.username = "Username should not contain whitespaces";

    if (!formData.password.trim()) errors.password = "Please enter a password.";
    else if (formData.password.length < PASSWORD_LENGTH)
        errors.password = `Password should contain at least ${PASSWORD_LENGTH} characters.`;
    else if (/\s/.test(formData.password))
        errors.password = "Password should not contain whitespaces.";

    return errors;
};

// validate transaction form
export const validateTransactionForm = (formData) => {
    const newErrors = {};
    if (!formData.recipients.length)
        newErrors.recipients = "Please select at least one recipient.";
    if (!formData.category) newErrors.category = "Please select a category.";
    if (!formData.price || isNaN(formData.price.replace(/[^0-9.]/g, "")))
        newErrors.price = "Price must be a valid number.";
    if (!formData.description)
        newErrors.description = "Description is required.";
    if (!formData.payer) newErrors.payer = "Please select who paid.";

    return newErrors;
};

// validate trip creation form
export const validateTripCreationForm = (formData) => {
    const newErrors = {};
    if (!formData.tripName.trim())
        newErrors.tripName = "Please enter a trip name.";
    if (!formData.foreignCurrency)
        newErrors.foreignCurrency = "Please select a foreign currency.";
    if (!formData.localCurrency)
        newErrors.localCurrency = "Please select a local currency.";
    if (formData.foreignCurrency === formData.localCurrency)
        newErrors.currency = "Foreign and local currency cannot be the same.";
    if (formData.budget && isNaN(formData.budget.replace(/[^0-9.]/g, "")))
        newErrors.budget = "Budget must be a valid number.";
    if (
        formData.startDate &&
        formData.endDate &&
        formData.startDate > formData.endDate
    )
        newErrors.date = "End date must be later than start date.";

    return newErrors;
};
