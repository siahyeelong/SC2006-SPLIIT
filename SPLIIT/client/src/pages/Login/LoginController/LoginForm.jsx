import {
    Button,
    Card,
    FilledInput,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    Typography,
    useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
    Visibility,
    VisibilityOff,
    AccountCircle,
    Lock,
} from "@mui/icons-material";
import GoogleLoginButton from "./GoogleLoginButton";
import { validateLogin } from "../../../utils/validators";

function LoginForm() {
    const { login, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const theme = useTheme();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateLogin(formData);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            try {
                await login(formData.username, formData.password);
                navigate("/selecttrip");
            } catch (error) {
                setErrors({ auth: error.message || "Login failed." });
            }
        }
    };

    return (
        <Card
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                maxWidth: 400,
                mx: "auto",
                mt: 2,
                p: 4,
                boxShadow: 6,
                borderRadius: 4,
                bgcolor: theme.palette.background.default,
                color: "primary", // White text for contrast
                textAlign: "center",
                transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 8,
                },
            }}
        >
            {/* Username Input */}
            <FormControl
                variant="filled"
                required
                error={Boolean(errors.username)}
                fullWidth
                sx={{
                    "& .MuiFilledInput-root": {
                        backgroundColor: "transparent", // Transparent background
                        border: "1px solid white", // White border
                        borderRadius: "4px",
                        "&:hover": {
                            borderColor: "primary.main", // Highlight on hover
                        },
                    },
                    "& .MuiInputLabel-root": {
                        color: "white", // White label
                    },
                    "& .MuiInputBase-input": {
                        color: "white", // White input text
                        paddingLeft: "40px", // Add space for the icon
                    },
                    "& .MuiFormHelperText-root": {
                        color: "error.main", // Error text color
                    },
                }}
            >
                <InputLabel>Username</InputLabel>
                <FilledInput
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    startAdornment={
                        <InputAdornment position="start">
                            <AccountCircle
                                sx={{
                                    color: "white",
                                    position: "absolute",
                                    left: "10px",
                                }}
                            />{" "}
                            {/* Icon */}
                        </InputAdornment>
                    }
                />
                {errors.username && (
                    <FormHelperText>{errors.username}</FormHelperText>
                )}
            </FormControl>

            {/* Password Input */}
            <FormControl
                variant="filled"
                required
                error={Boolean(errors.password)}
                fullWidth
                sx={{
                    "& .MuiFilledInput-root": {
                        backgroundColor: "transparent", // Transparent background
                        border: "1px solid white", // White border
                        borderRadius: "4px",
                        "&:hover": {
                            borderColor: "primary.main", // Highlight on hover
                        },
                    },
                    "& .MuiInputLabel-root": {
                        color: "white", // White label
                    },
                    "& .MuiInputBase-input": {
                        color: "white", // White input text
                        paddingLeft: "40px", // Add space for the icon
                    },
                    "& .MuiFormHelperText-root": {
                        color: "error.main", // Error text color
                    },
                }}
            >
                <InputLabel>Password</InputLabel>
                <FilledInput
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    startAdornment={
                        <InputAdornment position="start">
                            <Lock
                                sx={{
                                    color: "white",
                                    position: "absolute",
                                    left: "10px",
                                }}
                            />{" "}
                            {/* Icon */}
                        </InputAdornment>
                    }
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleTogglePassword}
                                edge="end"
                                sx={{ color: "white" }} // White icon
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

            {/* Authentication Error */}
            {errors?.auth && (
                <Typography color="error" sx={{ mt: 1 }}>
                    {errors.auth}
                </Typography>
            )}

            {/* Submit Button */}
            <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{
                    mt: 2,
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: "bold",
                    background: "linear-gradient(45deg, #1976d2, #2196f3)",
                    "&:hover": {
                        background: "linear-gradient(45deg, #1565c0, #1e88e5)",
                    },
                }}
            >
                Login
            </Button>

            {/* Register Link */}
            <Typography variant="body1" sx={{ mt: 2, color: "text.secondary" }}>
                Don't have an account?{" "}
                <a
                    href="/register"
                    style={{ color: "#2196f3", textDecoration: "none" }}
                >
                    Register
                </a>
            </Typography>
            <GoogleLoginButton />
        </Card>
    );
}

export default LoginForm;
