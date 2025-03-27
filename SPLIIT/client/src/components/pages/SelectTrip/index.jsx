import React from 'react'
import { Box, Button } from '@mui/material';
import Header from '../MainUI/Header';
import TripSelection from './TripSelection';

function SelectTrip() {
    return (
        <Box m='20px'>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Header title={'Select Trip'} subtitle={'Select a trip to start tracking expenses'} />
            </Box>
            <TripSelection />
        </Box>
    )
}

export default SelectTrip