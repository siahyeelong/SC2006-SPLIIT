import {
    Button,
    FilledInput,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    Typography,
    Grid2 as Grid,
    useTheme,
    Card,
    Divider,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
    Visibility,
    VisibilityOff,
    Email,
    Person,
    Lock,
} from "@mui/icons-material";
import ColourPicker from "../../../components/common/ColourPicker";
import { validateRegister } from "../../../utils/validators";

function RegisterForm() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        displayName: "",
        favColour: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const theme = useTheme();

    const handleColourChange = (newColour) => {
        // setFormData({ ...formData, favColour: e.target.value });
        setFormData((prev) => ({ ...prev, favColour: newColour }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleTogglePassword = () => {
        setShowPassword((s) => !s);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateRegister(formData);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            try {
                const backendURL = process.env.REACT_APP_BACKEND_URL;
                const response = await fetch(`${backendURL}/users/createuser`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });
                if (response.status === 409) {
                    setErrors({ email: "This email is already registered." });
                    throw new Error("Email already in use");
                }

                if (response.status === 400) {
                    setErrors({ username: "Please enter a unique username." });
                    throw new Error("Username already exists");
                }

                if (!response.ok) {
                    throw new Error("Network error. Please try again later.");
                }
                login(formData.username, formData.password);
                setErrors({});
                navigate("/selecttrip");
            } catch (error) {
                console.log("Error encountered:", error);
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
                width: "100%",
                maxWidth: 700, // Increased form width
                mx: "auto",
                mt: 2,
                p: 4,
                boxShadow: 6,
                borderRadius: 4,
                bgcolor: theme.palette.background.default,
                color: "white", // White text for contrast
                textAlign: "center",
                transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 8,
                },
            }}
        >
            {/* Input Fields */}
            <Grid container spacing={3} direction={"column"}>
                {/* Email */}
                <Grid item xs={12} md={6}>
                    <FormControl
                        variant="filled"
                        required
                        error={Boolean(errors.email)}
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
                        <InputLabel>Email</InputLabel>
                        <FilledInput
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            startAdornment={
                                <InputAdornment position="start">
                                    <Email
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
                        {errors.email && (
                            <FormHelperText>{errors.email}</FormHelperText>
                        )}
                    </FormControl>
                </Grid>

                {/* Username */}
                <Grid item xs={12} md={6}>
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
                                    <Person
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
                </Grid>

                {/* Password */}
                <Grid item xs={12} md={6}>
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
                </Grid>

                <Divider>Personalised fields</Divider>

                {/* Display Name */}
                <Grid item xs={12} md={6}>
                    <FormControl
                        variant="filled"
                        required
                        error={Boolean(errors.displayName)}
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
                        <InputLabel>Display Name</InputLabel>
                        <FilledInput
                            name="displayName"
                            value={formData.displayName}
                            onChange={handleChange}
                            startAdornment={
                                <InputAdornment position="start">
                                    <Person
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
                        {errors.displayName && (
                            <FormHelperText>
                                {errors.displayName}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Grid>
            </Grid>
            <ColourPicker
                profile={formData}
                onColourChange={handleColourChange}
            />
            {errors.favColour && (
                <Typography color="error" sx={{ mt: 1 }}>
                    {errors.favColour}
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
                Register
            </Button>
        </Card>
    );
}

export default RegisterForm;
