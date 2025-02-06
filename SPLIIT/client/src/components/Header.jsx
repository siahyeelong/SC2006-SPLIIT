import React from 'react'
import { Typography, Box, useTheme } from '@mui/material';
import { tokens } from '../theme';


function Header({ title, subtitle }) {
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);

    return (
        <Box mb={'30px'}>
            <Typography variant='h2' color={colours.grey[100]} fontWeight={'bold'} sx={{ mb: '5px' }}>
                {title}
            </Typography>
            <Typography variant='h5' color={colours.greenAccent[400]}>
                {subtitle}
            </Typography>

        </Box >
    )
}

export default Header