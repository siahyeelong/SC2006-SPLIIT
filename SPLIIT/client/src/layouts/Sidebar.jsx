import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import {
    Box,
    IconButton,
    Typography,
    useTheme,
} from "@mui/material";
import { tokens } from "../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MenuItems from "../constants/MenuItems";
import logo from "../assets/SPLIIT_logo.jpg";
import { useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import ShowCurTrip from "../components/common/ShowCurTrip";

function Sidebar({ isCollapsed, setIsCollapsed, onCloseDrawer = () => { }, isMobile = false }) {
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);
    const [selected, setSelected] = useState("logtransaction");
    const navigate = useNavigate();
    const { trip } = useContext(AuthContext);

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colours.primary[400]} !important`,
                    height: "100vh !important",
                },
                "& .pro-sidebar": {
                    height: "100vh !important",
                    width: "100% !important",
                    position: isMobile
                        ? "fixed !important"
                        : "static !important",
                    top: 0,
                    left: 0,
                    zIndex: isMobile ? 1200 : "auto",
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                    "&:hover": {
                        color: "#868dfb !important",
                    },
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
            }}
        >
            {/* if trip does not exist, sidebar does not show */}
            {trip?.tripID && (
                <ProSidebar collapsed={isCollapsed}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            height: "100%",
                        }}
                    >
                        <Menu iconShape="square">
                            <MenuItem
                                onClick={() => {
                                    setIsCollapsed(!isCollapsed)
                                    onCloseDrawer()
                                }}
                                icon={
                                    isCollapsed ? (
                                        <MenuOutlinedIcon />
                                    ) : undefined
                                }
                                style={{
                                    margin: "10px 0 20px 0",
                                    color: colours.grey[100],
                                }}
                            >
                                {!isCollapsed && (
                                    <Box
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                        alignItems={"center"}
                                        ml={"30px"}
                                    >
                                        <Box
                                            display={"flex"}
                                            justifyContent={"center"}
                                            sx={{
                                                "& img": {
                                                    height: { xs: 40, sm: 50 },
                                                },
                                            }}
                                        >
                                            <a href="/home">
                                                <img
                                                    src={logo}
                                                    alt="SPLIIT-Logo"
                                                />
                                            </a>
                                        </Box>
                                        <IconButton
                                            onClick={() => {
                                                setIsCollapsed(!isCollapsed)
                                            }
                                            }
                                            sx={{
                                                display: {
                                                    xs: "flex", // Always show on mobile
                                                    sm: isCollapsed ? "none" : "flex", // Show on desktop only when not collapsed
                                                },
                                            }}
                                        >
                                            <MenuOutlinedIcon />
                                        </IconButton>
                                    </Box>
                                )}
                            </MenuItem>
                            <Box
                                paddingLeft={isCollapsed ? undefined : "10%"}
                                sx={{
                                    "& .pro-item-content": {
                                        fontSize: { xs: "0.9rem", sm: "1rem" },
                                    },
                                }}
                            >
                                {MenuItems.map((item) =>
                                    item.icon === null ||
                                        item.title === "Trip Info" ? undefined : (
                                        <MenuItem
                                            active={selected === item.title}
                                            style={{ color: colours.grey[100] }}
                                            onClick={() => {
                                                setSelected(item.title)
                                                onCloseDrawer()
                                            }}
                                            icon={item.icon}
                                            key={item.title}
                                        >
                                            <Typography>{item.title}</Typography>
                                            <Link to={item.to} />
                                        </MenuItem>
                                    )
                                )}
                            </Box>
                        </Menu>
                        <Menu iconShape="square">
                            <ShowCurTrip
                                displayCondition={!isCollapsed}
                                curTrip={trip}
                                onClick={() => {
                                    navigate("/selecttrip")
                                    onCloseDrawer()
                                }}
                            />
                            {MenuItems.map((item) => {
                                if (item.title === "Trip Info") {
                                    return (
                                        <Box
                                            key={item.title}
                                            paddingLeft={
                                                isCollapsed ? undefined : "10%"
                                            }
                                            sx={{
                                                mb: 2,
                                                "& .pro-item-content": {
                                                    fontSize: {
                                                        xs: "0.9rem",
                                                        sm: "1rem",
                                                    },
                                                },
                                            }}
                                        >
                                            <MenuItem
                                                active={selected === item.title}
                                                style={{ color: colours.grey[100] }}
                                                onClick={() => {
                                                    setSelected(item.title)
                                                    onCloseDrawer()
                                                }}
                                                icon={item.icon}
                                            >
                                                <Typography>{item.title}</Typography>
                                                <Link to={item.to} />
                                            </MenuItem>
                                        </Box>
                                    );
                                }
                                return null;
                            })}
                        </Menu>
                    </Box>
                </ProSidebar>
            )
            }
        </Box >
    );
}

export default Sidebar;