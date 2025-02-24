import Sidebar from "./components/pages/MainUI/Sidebar";
import Topbar from "./components/pages/MainUI/Topbar";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import SelectTrip from "./components/pages/SelectTrip";
import CreateTrip from "./components/pages/CreateTrip";
import Profile from "./components/pages/Profile";
import TripInfo from "./components/pages/TripInfo";
import LogTransaction from "./components/pages/LogTransaction";
import Dashboard from "./components/pages/Dashboard";
import Transactions from "./components/pages/Transactions"
import AItinerary from "./components/pages/AItinirary";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path='/home' element={<LandingPage />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/selecttrip' element={<SelectTrip />} />
              <Route path='/createtrip' element={<CreateTrip />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/tripinfo' element={<TripInfo />} />
              <Route path='/' element={<LogTransaction />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/transactions' element={<Transactions />} />
              <Route path='/aitinerary' element={<AItinerary />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
