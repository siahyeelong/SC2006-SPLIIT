import {
    Box,
    Button,
    FilledInput,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    TextField,
    Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../classes/AuthContext";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function LoginForm() {
    const { login, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (user) {
            navigate("/selecttrip"); // Redirect if already logged in
        }
    }, [user, navigate]); // Runs whenever user state changes

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleTogglePassword = () => {
        setShowPassword((s) => !s);
    };

    const validate = () => {
        const newErrors = {};
        const passwordLength = 8;

        if (!formData.username.length)
            newErrors.username = "Please enter a username.";
        else if (/\s/.test(formData.username))
            newErrors.username = "Username should not contain whitespaces";

        if (!formData.password.length)
            newErrors.password = "Please enter a password.";
        else if (formData.password.length < passwordLength)
            newErrors.password = `Password should contain at least ${passwordLength} characters.`;
        else if (/\s/.test(formData.password))
            newErrors.password = "Password should not contain whitespaces.";
        // validation logic to verify user and password matches

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                await login(formData.username, formData.password);
                navigate("/selecttrip");
            } catch (error) {
                setErrors({ auth: "Invalid username or password" });
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
            <TextField
                label="Username"
                required
                variant="filled"
                name="username"
                value={formData.username}
                onChange={handleChange}
                error={Boolean(errors.username)}
                helperText={errors.username}
            />

            <FormControl
                variant="filled"
                required
                error={Boolean(errors.password)}
            >
                <InputLabel>Password</InputLabel>
                <FilledInput
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleTogglePassword}
                                edge="end"
                            >
                                {showPassword ? (
                                    <VisibilityOff />
                                ) : (
                                    <Visibility />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                {errors.password && (
                    <FormHelperText>{errors.password}</FormHelperText>
                )}
            </FormControl>

            {errors && <Typography color="error">{errors.auth}</Typography>}
            <Button type="submit" variant="contained" color="secondary">
                Submit
            </Button>
        </Box>
    );
}

export default LoginForm;
