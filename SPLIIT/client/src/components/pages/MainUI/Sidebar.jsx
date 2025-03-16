import React from "react";
import { Link } from "react-router-dom";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import {
    Box,
    IconButton,
    Typography,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { tokens } from "../../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MenuItems from "../../classes/MenuItems";
import logo from "../../assets/SPLIIT_logo.jpg";
import { useState } from "react";

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{ color: colours.grey[100] }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>
    );
};

function Sidebar({ isCollapsed, setIsCollapsed }) {
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);
    const [selected, setSelected] = useState("logtransaction");
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    // Handle automatic collapse on mobile
    React.useEffect(() => {
        if (isMobile) {
            setIsCollapsed(true);
        }
    }, [isMobile, setIsCollapsed]);

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
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
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
                                        <img src={logo} alt="SPLLIT-Logo" />
                                    </a>
                                </Box>
                                {!isMobile && (
                                    <IconButton
                                        onClick={() =>
                                            setIsCollapsed(!isCollapsed)
                                        }
                                        sx={{
                                            display: { xs: "none", sm: "flex" },
                                        }}
                                    >
                                        <MenuOutlinedIcon />
                                    </IconButton>
                                )}
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
                            item.icon === null ? undefined : (
                                <Item
                                    key={item.title}
                                    title={item.title}
                                    to={item.to}
                                    icon={item.icon}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                            )
                        )}
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
}

export default Sidebar;
