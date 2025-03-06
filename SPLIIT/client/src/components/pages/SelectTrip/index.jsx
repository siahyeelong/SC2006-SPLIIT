import React from 'react'
import { Box, Button } from '@mui/material';
import Header from '../MainUI/Header';

function SelectTrip() {
    return (
        <Box m='20px'>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Header title={'SelectTrip'} subtitle={'work in progress'} />
            </Box>
            <div>(work in progress)</div>
            <Box display={'flex'} justifyContent={'center'}>
                <Button variant='outlined' color='success' sx={{ margin: 5 }} href='/'>(simulate selected a trip)</Button>
                <Button variant='outlined' color='success' sx={{ margin: 5 }} href='/createtrip'>(simulate selected create trip)</Button>
            </Box>
        </Box>
    )
}

export default SelectTrip