import { Box, Button, Chip, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React, { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check';

const favColourChoices = [
    "#D1BDFF",
    "#E2CBF7",
    "#D6F6FF",
    "#B3F5BC",
    "#F9FFB5",
    "#FFE699",
    "#FCAE7C",
    "#FA9189",
]

function RegisterForm() {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        displayName: "",
        favouriteColour: "",
    })

    const [errors, setErrors] = useState({})

    const handleColourChange = (e, colour) => {
        setFormData({ ...formData, favouriteColour: colour })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.email.length) newErrors.email = "Please enter an email.";
        if (!formData.username.length) newErrors.username = "Please enter a unique username.";
        if (!formData.password.length) newErrors.password = "Please enter a password.";
        if (!formData.displayName.length) newErrors.displayName = "Please enter a display name.";
        if (!formData.favouriteColour.length) newErrors.favouriteColour = "Please select a favourite colour.";
        // validation logic to verify no duplicate usernames

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        if (validate()) {
            e.preventDefault();
            console.log("Form submitted:", formData);
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
            <Typography>
                Enter a valid email
            </Typography>
            <TextField label="Email" required variant="filled" name="email" value={formData.email} onChange={handleChange} />
            <Typography>
                Enter a unique username
            </Typography>
            <TextField label="Username" required variant="filled" name="username" value={formData.username} onChange={handleChange} />
            <Typography>
                Enter a strong password
            </Typography>
            {/* TODO: on handleChange, make the password encrypted or something */}
            <TextField label="Password" required variant="filled" name="password" value={formData.password} onChange={handleChange} />
            <Typography>
                Enter a display name (need not be unique)
            </Typography>
            <TextField label="Display name" required variant="filled" name="displayName" value={formData.displayName} onChange={handleChange} />

            <Typography>
                Select your favourite colour
            </Typography>
            <ToggleButtonGroup
                value={formData.favouriteColour}
                exclusive
                onChange={handleColourChange}
                aria-label="favourite color"
                sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                {favColourChoices.map((colour) => (
                    <ToggleButton key={colour} value={colour}
                        sx={{
                            bgcolor: colour,
                            width: 40,
                            height: 40,
                            margin: 0.5,
                            "&.Mui-selected, &:hover": { bgcolor: colour, borderColor: "gray", borderWidth: 4, borderRadius: "10%" }
                        }}>
                        {formData.favouriteColour === colour && <CheckIcon sx={{ color: "grey" }} />}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
            <Button type="submit" variant="contained" color="secondary" sx={{ margin: 4 }}>
                Submit
            </Button>
        </Box >
    )
}

export default RegisterForm