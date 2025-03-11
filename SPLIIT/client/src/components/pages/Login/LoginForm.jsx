import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../classes/AuthContext';
import { useNavigate } from "react-router-dom";

function LoginForm() {

    const { login, user } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate("/selecttrip"); // Redirect if already logged in
        }
    }, [user, navigate]); // Runs whenever user state changes

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                await login(formData.username, formData.password)
                navigate("/selecttrip")
            } catch (error) {
                setErrors({ "auth": "Invalid username or password" });
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
            <TextField label="Username" required variant="filled" name="username" value={formData.username} onChange={handleChange} />
            {/* TODO: on handleChange, make the password encrypted or something */}
            <TextField label="Password" required variant="filled" name="password" value={formData.password} onChange={handleChange} />
            {errors && <Typography color='error'>
                {errors.auth}</Typography>}
            <Button type="submit" variant="contained" color="secondary">
                Submit
            </Button>
        </Box>
    )
}

export default LoginForm