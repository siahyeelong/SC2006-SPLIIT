import React from 'react'
import { Box, Button } from '@mui/material';
import Header from '../MainUI/Header';
import LoginForm from './LoginForm';

function Login() {
    return (
        <Box m='20px'>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Header title={'Login'} subtitle={'work in progress'} />
            </Box>
            <LoginForm />
        </Box>
    )
}

export default Login