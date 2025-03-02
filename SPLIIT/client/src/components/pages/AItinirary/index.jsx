import React from 'react'
import { Box, Button } from '@mui/material';
import Header from '../MainUI/Header';
import { useExchangeRates } from '../../classes/ExchangeRates';

function AItinerary() {

    const { exchangeRates } = useExchangeRates();

    return (
        <Box m='20px'>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Header title={'AItinerary'} subtitle={'work in progress'} />
            </Box>
            <div>(work in progress)</div>
            <Button onClick={async () => {
                console.log(typeof (exchangeRates['USD']))
            }} color='secondary' variant='outlined' style={{ margin: 20 }}> Test Exchange Rates button </Button>
        </Box>
    )
}

export default AItinerary