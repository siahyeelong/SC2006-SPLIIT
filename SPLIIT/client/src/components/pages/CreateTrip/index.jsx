import React from 'react'
import { Box, Button } from '@mui/material';
import Header from '../MainUI/Header';
import TripCreationForm from './TripCreationForm';

function CreateTrip() {
    return (
        <Box m='20px'>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Header title={'CreateTrip'} subtitle={'work in progress'} />
            </Box>
            <TripCreationForm />
            <Box display={'flex'} justifyContent={'center'}>
                <Button variant='outlined' color='success' sx={{ margin: 5 }} href='/'>(simulate successful trip creation)</Button>
            </Box>
        </Box>
    )
}

export default CreateTrip