import React from 'react'
import { Box, Button, Typography } from '@mui/material';
import Header from '../MainUI/Header';

function LandingPage() {
    return (
        <Box m='20px'>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Header title={'LandingPage'} subtitle={'work in progress'} />
            </Box>
            <Typography display={'flex'} justifyContent={'center'}>(work in progress)</Typography>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Button variant='outlined' color='warning' sx={{ margin: 5 }} href='/register'>Register</Button>
                <Button variant='outlined' color='info' sx={{ margin: 5 }} href='/login'>Login</Button>
            </Box>
        </Box>
    )
}

export default LandingPage