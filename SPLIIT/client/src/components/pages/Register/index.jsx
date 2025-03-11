import React from 'react'
import { Box, Button } from '@mui/material';
import Header from '../MainUI/Header';
import RegisterForm from './RegisterForm';

function Register() {
    return (
        <Box m='20px'>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Header title={'Register'} subtitle={'work in progress'} />
            </Box>
            <RegisterForm />
            <Box display={'flex'} justifyContent={'center'}>
                <Button variant='outlined' color='info' sx={{ margin: 5 }} href='/login'>Login instead</Button>
            </Box>
        </Box>
    )
}

export default Register