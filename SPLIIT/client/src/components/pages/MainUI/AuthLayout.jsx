import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useAuth } from "../../classes/AuthContext";
import { Box } from "@mui/material";
import { useState } from "react";

const AuthLayout = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const sidebarWidth = isCollapsed ? 80 : 240;

    // const { user, loading } = useAuth();

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (!user) {
    //     return <Navigate to="/home" />;
    // }

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            {/* Fixed Sidebar */}
            <Box
                sx={{
                    width: `${sidebarWidth}px`,
                    flexShrink: 0,
                    position: "fixed",
                    left: 0,
                    top: 0,
                    height: "100vh",
                    zIndex: 1200,
                    transition: "width 0.3s ease",
                }}
            >
                <Sidebar
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed}
                />
            </Box>

            {/* Main Content Area */}
            <Box
                sx={{
                    flexGrow: 1,
                    marginLeft: `${sidebarWidth}px`,
                    width: `calc(100% - ${sidebarWidth}px)`,
                    transition: "margin-left 0.3s ease, width 0.3s ease",
                }}
            >
                {/* Fixed Topbar */}
                <Box
                    sx={{
                        position: "fixed",
                        top: 0,
                        right: 0,
                        left: `${sidebarWidth}px`,
                        zIndex: 1100,
                        transition: "left 0.3s ease",
                    }}
                >
                    <Topbar />
                </Box>

                {/* Scrollable Content */}
                <Box
                    sx={{
                        marginTop: 8, // Space for topbar
                        padding: 3,
                        maxWidth: { xs: "100%", md: 1200, lg: 1400 },
                        mx: "auto",
                        boxSizing: "border-box",
                        position: "relative",
                        zIndex: 1000,
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default AuthLayout;
