import { React, useState } from "react";
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

function Sidebar() {
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [selected, setSelected] = useState("logtransaction");
    const isVertical = useMediaQuery("(max-aspect-ratio: 1/1)");

    return isVertical ? (
        <></>
    ) : (
        // if display is horizontal
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colours.primary[400]} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
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
                                    alignContent={"center"}
                                >
                                    <a href="/home">
                                        <img
                                            src={logo}
                                            height={50}
                                            alt="SPLLIT-Logo"
                                        />
                                    </a>
                                </Box>
                                <IconButton
                                    onClick={() => setIsCollapsed(!isCollapsed)}
                                >
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>
                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        {MenuItems.map((item) =>
                            item.icon === null ? undefined : (
                                <Item
                                    key={item.title}
                                    title={item.title}
                                    to={item.to}
                                    icon={item.icon}
                                    selected={selected}
                                    setSelected={setSelected}
                                ></Item>
                            )
                        )}
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
}

export default Sidebar;
