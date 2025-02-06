import { React } from 'react'
import { Box } from '@mui/material';
import Header from '../../Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogTransactionForm from './LogTransactionForm';



function LogTransaction() {
    return (
        <Box m='20px'>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Header title={'Log Transaction'} subtitle={'Log an expense here'} />
            </Box>
            <LogTransactionForm />
        </Box >
    )
}

export default LogTransaction;
