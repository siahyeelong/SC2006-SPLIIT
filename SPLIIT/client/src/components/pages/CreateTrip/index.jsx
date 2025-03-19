import React from 'react'
import { Box, Button } from '@mui/material';
import Header from '../MainUI/Header';
import TripCreationForm from './TripCreationForm';

function CreateTrip() {
    return (
        <Box m='20px'>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Header title={'Create Trip'} subtitle={'Create / Join a trip!'} />
            </Box>
            <TripCreationForm />
        </Box>
    )
}

export default CreateTrip