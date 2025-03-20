import { Box, Button, TextField, Divider } from '@mui/material';
import React, { useState } from 'react'
import GoogleLoginButton from '../../common/GoogleLoginButton';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.username.length) newErrors.username = "Please enter a username.";
        if (!formData.password.length) newErrors.password = "Please enter a password.";
        // validation logic to verify user and password matches

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
            <TextField label="Username" required variant="filled" name="username" value={formData.username} onChange={handleChange} />
            {/* TODO: on handleChange, make the password encrypted or something */}
            <TextField label="Password" required variant="filled" name="password" value={formData.password} onChange={handleChange} />

            <Button type="submit" variant="contained" color="secondary">
                Submit
            </Button>

            <Divider sx={{ my: 2 }}>OR</Divider>
            <GoogleLoginButton />
        </Box>
    )
}

export default LoginForm