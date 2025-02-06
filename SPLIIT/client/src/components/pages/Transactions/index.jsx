import React from 'react'
import { Box } from '@mui/material';
import Header from '../../Header';
import TransactionsTable from './TransactionsTable';

function Transactions() {
    return (
        <Box m='20px'>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Header title={'Transactions'} subtitle={'View all transactions here'} />
            </Box>
            <TransactionsTable />
        </Box>
    )
}

export default Transactions