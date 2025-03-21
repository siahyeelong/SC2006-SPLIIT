import { Box, Button, TextField, Typography, InputAdornment } from "@mui/material";
import { useState } from "react";
import { AccountCircle, Lock } from "@mui/icons-material";

function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.length) newErrors.username = "Please enter a username.";
    if (!formData.password.length) newErrors.password = "Please enter a password.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", formData);
      // Simulate successful login
      alert("Login successful!");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        maxWidth: 400,
        mx: "auto",
        mt: 8,
        p: 4,
        boxShadow: 6,
        borderRadius: 4,
        bgcolor: "#1e1e1e", // Dark background
        color: "white", // White text for contrast
        textAlign: "center",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 8,
        },
      }}
    >
      {/* Welcome Back Title */}
      <Typography variant="h3" fontWeight="bold" sx={{ color: "white", mb: 2 }}>
        Welcome Back!
      </Typography>

      {/* Username Input */}
      <TextField
        label="Username"
        required
        variant="outlined"
        name="username"
        value={formData.username}
        onChange={handleChange}
        error={!!errors.username}
        helperText={errors.username}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle sx={{ color: "white" }} /> {/* White icon */}
            </InputAdornment>
          ),
        }}
        InputLabelProps={{ shrink: true }}
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white", // White border
            },
            "&:hover fieldset": {
              borderColor: "primary.main", // Highlight on hover
            },
          },
          "& .MuiInputLabel-root": {
            color: "white", // White label
            //fontSize: "1.1rem"
          },
          "& .MuiInputBase-input": {
            color: "white", // White input text
          },
          "& .MuiFormHelperText-root": {
            color: "error.main", // Error text color
          },
        }}
      />

      {/* Password Input */}
      <TextField
        label="Password"
        required
        variant="outlined"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock sx={{ color: "white" }} /> {/* White icon */}
            </InputAdornment>
          ),
        }}
        InputLabelProps={{ shrink: true }}
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white", // White border
            },
            "&:hover fieldset": {
              borderColor: "primary.main", // Highlight on hover
            },
          },
          .
          "& .MuiInputLabel-root": {
            color: "white", // White label
            //fontSize: "1.1rem"
          },
          "& .MuiInputBase-input": {
            color: "white", // White input text
          },
          "& .MuiFormHelperText-root": {
            color: "error.main", // Error text color
          },
        }}
      />

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
        Don't have an account?  {"   "}
        <a href="/register" style={{ color: "#2196f3", textDecoration: "none" }}>
           Register
        </a>
      </Typography>
    </Box>
  );
}

export default LoginForm;