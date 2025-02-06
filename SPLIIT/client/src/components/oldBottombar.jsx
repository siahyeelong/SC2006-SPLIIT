/**
 * [Deprecated] This was supposed to replace the sidebar when the viewing screen is vertical like on a mobile phone. 
 * The feature has been superceded by the DropdownMenu feature
 */

import { React, useState } from 'react';
import { Link } from 'react-router-dom'
import { tokens } from '../theme'
import { useTheme, useMediaQuery } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import TocOutlinedIcon from '@mui/icons-material/TocOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

function Bottombar() {
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);
    const [selected, setSelected] = useState('logtransaction');
    const isVertical = useMediaQuery('(max-aspect-ratio: 1/1)');

    return isVertical ?
        ( // if display is vertical
            <BottomNavigation
                showLabels
                value={selected}
                onChange={(event, newValue) => setSelected(newValue)}
                sx={{
                    backgroundColor: colours.primary[400],
                    position: 'fixed', // Fix to the bottom of the viewport
                    bottom: 0, // Place at the bottom
                    left: 0,  // Full width
                    right: 0,
                    zIndex: 10 // Ensure it stays on top of other elements
                }}
            >
                <BottomNavigationAction
                    label="Log Transaction"
                    icon={<AddCircleOutlineOutlinedIcon />}
                    component={Link}
                    to="/"
                    value="logtransaction"
                    sx={{ '&.Mui-selected': { color: colours.blueAccent[300] } }}
                />
                <BottomNavigationAction
                    label="Dashboard"
                    icon={<SpaceDashboardOutlinedIcon />}
                    component={Link}
                    to="/dashboard"
                    value="dashboard"
                    sx={{ '&.Mui-selected': { color: colours.blueAccent[300] } }}
                />
                <BottomNavigationAction
                    label="Transactions"
                    icon={<TocOutlinedIcon />}
                    component={Link}
                    to="/transactions"
                    value="transactions"
                    sx={{ '&.Mui-selected': { color: colours.blueAccent[300] } }}
                />
                <BottomNavigationAction
                    label="Settings"
                    icon={<SettingsOutlinedIcon />}
                    component={Link}
                    to="/settings"
                    value="settings"
                    sx={{ '&.Mui-selected': { color: colours.blueAccent[300] } }}
                />
            </BottomNavigation>
        ) : <></>
}

export default Bottombar