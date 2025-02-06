import { React, useState } from 'react';
import { Link } from 'react-router-dom'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Box, IconButton, Typography, useTheme, useMediaQuery } from '@mui/material';
import { tokens } from '../theme'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import TocOutlinedIcon from '@mui/icons-material/TocOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';


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
            <Typography>
                {title}
            </Typography>
            <Link to={to} />
        </MenuItem >
    )
}

function Sidebar() {
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [selected, setSelected] = useState('logtransaction');
    const isVertical = useMediaQuery('(max-aspect-ratio: 1/1)');

    return isVertical ?
        <></>
        :
        ( // if display is horizontal
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
                }}>
                <ProSidebar collapsed={isCollapsed}>
                    <Menu iconShape='square'>
                        <MenuItem
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                            style={{
                                margin: "10px 0 20px 0",
                                color: colours.grey[100],
                            }}>
                            {!isCollapsed && (
                                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} ml={'15px'}>
                                    <Typography variant='h3' color={colours.grey[100]}>
                                        SOMETHING
                                    </Typography>
                                    <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                        <MenuOutlinedIcon />
                                    </IconButton>
                                </Box>
                            )}
                        </MenuItem>
                        <Box paddingLeft={isCollapsed ? undefined : '10%'}>
                            <Item
                                title='Log Transaction'
                                to='/'
                                icon={<AddCircleOutlineOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title='Dashboard'
                                to='/dashboard'
                                icon={<SpaceDashboardOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title='View all transactions'
                                to='/transactions'
                                icon={<TocOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title='Settings'
                                to='/settings'
                                icon={<SettingsOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        </Box>
                    </Menu>
                </ProSidebar>
            </Box >
        )
}

export default Sidebar