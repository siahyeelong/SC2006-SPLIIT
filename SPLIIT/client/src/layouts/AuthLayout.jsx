import {
    Drawer,
    IconButton,
    useTheme,
    useMediaQuery,
    Box,
} from "@mui/material";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const AuthLayout = () => {
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const sidebarWidth = isCollapsed ? 80 : 240;

    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/home" />;
    }

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            {/* Sidebar or Drawer */}
            {isMobile ? (
                <Drawer
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                    PaperProps={{
                        sx: {
                            width: 240,
                            backgroundColor: theme.palette.background.default,
                        },
                    }}
                >
                    <Sidebar
                        isCollapsed={false}
                        setIsCollapsed={() => { }}
                        isMobile={true}
                        onCloseDrawer={() => setDrawerOpen(false)}
                    />
                </Drawer>
            ) : (
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
                    {localStorage.getItem("trip") && (
                        <Sidebar
                            isCollapsed={isCollapsed}
                            setIsCollapsed={setIsCollapsed}
                        />
                    )}
                </Box>
            )}

            {/* Main Content Area */}
            <Box
                sx={{
                    flexGrow: 1,
                    marginLeft: isMobile ? 0 : `${sidebarWidth + 30}px`,
                    width: isMobile ? "100%" : `calc(100% - ${sidebarWidth + 30}px)`,
                    transition: "margin-left 0.3s ease, width 0.3s ease",
                }}
            >
                {/* Topbar */}
                <Box
                    sx={{
                        position: "fixed",
                        top: 0,
                        right: 0,
                        left: isMobile ? 0 : `${sidebarWidth}px`,
                        zIndex: 1100,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        padding: 1,
                        backgroundColor: theme.palette.background.default,
                    }}
                >
                    {isMobile && (
                        <Box sx={{ flexGrow: 1 }}>
                            <IconButton onClick={() => setDrawerOpen(true)}>
                                <MenuOutlinedIcon />
                            </IconButton>
                        </Box>
                    )}
                    <Topbar />
                </Box>

                {/* Scrollable Content */}
                <Box
                    sx={{
                        marginTop: 8,
                        padding: 3,
                        maxWidth: { xs: "100%", md: 1200, lg: 1400 },
                        mx: "auto",
                        boxSizing: "border-box",
                        position: "relative",
                        zIndex: 1000,
                    }}
                >
                    <Outlet key={location.pathname} />
                </Box>
            </Box>
        </Box>
    );
};

export default AuthLayout;
