import Sidebar from "./components/pages/MainUI/Sidebar";
import Topbar from "./components/pages/MainUI/Topbar";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import SelectTrip from "./components/pages/SelectTrip";
import CreateTrip from "./components/pages/CreateTrip";
import Profile from "./components/pages/Profile";
import TripInfo from "./components/pages/TripInfo";
import LogTransaction from "./components/pages/LogTransaction";
import Dashboard from "./components/pages/Dashboard";
import Transactions from "./components/pages/Transactions";
import AItinerary from "./components/pages/AItinirary";
import { ExchangeRatesProvider } from "./components/classes/ExchangeRates";
import { AuthProvider } from "./components/classes/AuthContext";
import PublicLayout from "./components/pages/MainUI/PublicLayout";
import AuthLayout from "./components/pages/MainUI/AuthLayout";
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
                <Route path="/home" element={<LandingPage />} />
                <Route
                  path="/register"
                  element={<Register />}
                />
                <Route path="/login" element={<Login />} />
              </Route>
              <Route element={<AuthLayout />}>
                {/* Visible only after authentication */}
                <Route
                  path="/selecttrip"
                  element={<SelectTrip />}
                />
                <Route
                  path="/createtrip"
                  element={<CreateTrip />}
                />
                <Route path="/profile" element={<Profile />} />
                <Route
                  path="/tripinfo"
                  element={<TripInfo />}
                />
                <Route path="/" element={<LogTransaction />} />
                <Route
                  path="/dashboard"
                  element={<Dashboard />}
                />
                <Route
                  path="/transactions"
                  element={<Transactions />}
                />
                <Route
                  path="/aitinerary"
                  element={<AItinerary />}
                />
              </Route>
            </Routes>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </ExchangeRatesProvider>
    </AuthProvider>
  );
}

export default App;
