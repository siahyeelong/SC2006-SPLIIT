import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SelectTrip from "./pages/SelectTrip";
import CreateTrip from "./pages/CreateTrip";
import Profile from "./pages/Profile";
import TripInfo from "./pages/TripInfo";
import LogTransaction from "./pages/LogTransaction";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import AItinerary from "./pages/AItinerary";
import { ExchangeRatesProvider } from "./contexts/ExchangeRates";
import { AuthProvider } from "./contexts/AuthContext";
import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

function App() {
    const [theme, colorMode] = useMode();
    const location = useLocation();

    useEffect(() => {
        // Disable defualt browser scroll restoration
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }

        // Force scroll to top on every navigation
        window.scrollTo(0, 0);
    }, [location.key]);

    return (
        <AuthProvider>
            <ExchangeRatesProvider>
                <ColorModeContext.Provider value={colorMode}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <Routes>
                            <Route element={<PublicLayout />}>
                                {/* Visible without authentication */}
                                <Route
                                    path="/home"
                                    element={
                                        <LandingPage key={location.pathname} />
                                    }
                                />
                                <Route
                                    path="/register"
                                    element={
                                        <Register key={location.pathname} />
                                    }
                                />
                                <Route
                                    path="/login"
                                    element={<Login key={location.pathname} />}
                                />
                            </Route>
                            <Route element={<AuthLayout />}>
                                {/* Visible only after authentication */}
                                <Route
                                    path="/selecttrip"
                                    element={
                                        <SelectTrip key={location.pathname} />
                                    }
                                />
                                <Route
                                    path="/createtrip"
                                    element={
                                        <CreateTrip key={location.pathname} />
                                    }
                                />
                                <Route
                                    path="/profile"
                                    element={
                                        <Profile key={location.pathname} />
                                    }
                                />
                                <Route
                                    path="/tripinfo"
                                    element={
                                        <TripInfo key={location.pathname} />
                                    }
                                />
                                <Route
                                    path="/"
                                    element={
                                        <LogTransaction
                                            key={location.pathname}
                                        />
                                    }
                                />
                                <Route
                                    path="/dashboard"
                                    element={
                                        <Dashboard key={location.pathname} />
                                    }
                                />
                                <Route
                                    path="/transactions"
                                    element={
                                        <Transactions key={location.pathname} />
                                    }
                                />
                                <Route
                                    path="/aitinerary"
                                    element={
                                        <AItinerary key={location.pathname} />
                                    }
                                />
                            </Route>
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </ThemeProvider>
                </ColorModeContext.Provider>
            </ExchangeRatesProvider>
        </AuthProvider>
    );
}

export default App;
