import React from 'react'

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import TocOutlinedIcon from '@mui/icons-material/TocOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const MenuItems = [
    { title: 'Log Transaction', to: '/', icon: <AddCircleOutlineOutlinedIcon /> },
    { title: 'Dashboard', to: '/dashboard', icon: <SpaceDashboardOutlinedIcon /> },
    { title: 'View All Transactions', to: '/transactions', icon: <TocOutlinedIcon /> },
    { title: 'AItinerary', to: '/aitinerary', icon: <AutoAwesomeOutlinedIcon /> },
    { title: 'LandingPage', to: '/home', icon: null },
    { title: 'Register', to: '/register', icon: null },
    { title: 'Login', to: '/login', icon: null },
    { title: 'SelectTrip', to: '/selecttrip', icon: null },
    { title: 'CreateTrip', to: '/createtrip', icon: null },
    { title: 'Profile', to: '/profile', icon: null },
    { title: 'TripInfo', to: '/tripinfo', icon: <InfoOutlinedIcon /> },
];

export default MenuItems