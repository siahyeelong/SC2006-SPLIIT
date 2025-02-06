import React, { useState } from 'react';
import { Box, Menu, MenuItem, IconButton, Typography, useTheme, useMediaQuery } from '@mui/material';
import { tokens } from '../theme'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import TocOutlinedIcon from '@mui/icons-material/TocOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Link } from 'react-router-dom';

function DropdownMenu() {
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);
    const isVertical = useMediaQuery('(max-aspect-ratio: 1/1)');

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const [selected, setSelected] = useState('logtransaction');

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuItems = [
        { title: 'Log Transaction', to: '/', icon: <AddCircleOutlineOutlinedIcon /> },
        { title: 'Dashboard', to: '/dashboard', icon: <SpaceDashboardOutlinedIcon /> },
        { title: 'View All Transactions', to: '/transactions', icon: <TocOutlinedIcon /> },
        { title: 'Settings', to: '/settings', icon: <SettingsOutlinedIcon /> },
    ];

    return isVertical ? (
        <Box sx={{ backgroundColor: colours.primary[400] }}>
            <IconButton onClick={handleMenuClick} color="inherit">
                <MenuOutlinedIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleMenuClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                sx={{
                    '& .MuiPaper-root': {
                        backgroundColor: colours.primary[400], // Yellow background for menu options
                    },
                }}
            >
                {menuItems.map((item) => (
                    <MenuItem
                        key={item.title}
                        component={Link}
                        to={item.to}
                        onClick={() => {
                            setSelected(item.title.toLowerCase().replace(/\s+/g, ''));
                            handleMenuClose();
                        }}
                        selected={selected === item.title.toLowerCase().replace(/\s+/g, '')}
                    >
                        <Box display="flex" alignItems="center">
                            {item.icon}
                            <Typography ml={2}>{item.title}</Typography>
                        </Box>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    ) : <></>
}

export default DropdownMenu;
