import React from 'react'
import { Box, Button } from '@mui/material';
import Header from '../MainUI/Header';

function Login() {
    return (
        <Box m='20px'>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Header title={'Login'} subtitle={'work in progress'} />
            </Box>
            <div>(work in progress)</div>
            <Box display={'flex'} justifyContent={'center'}>
                <Button variant='outlined' color='success' sx={{ margin: 5 }} href='/selecttrip'>(simulate successful login)</Button>
            </Box>
        </Box>
    )
}

export default Login