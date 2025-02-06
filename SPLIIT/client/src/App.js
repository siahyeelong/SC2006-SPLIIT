import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import LogTransaction from "./components/pages/LogTransaction";
import Dashboard from "./components/pages/Dashboard";
import Transactions from "./components/pages/Transactions"
import Settings from "./components/pages/Settings"

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
              <Route path='/' element={<LogTransaction />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/transactions' element={<Transactions />} />
              <Route path='/settings' element={<Settings />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
