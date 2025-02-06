import { React, useState, useEffect, createContext } from 'react'
import { Box } from '@mui/material';
import Header from '../../Header';
import Carousel from './Carousel';

export const TransactionsContext = createContext([]);

function Dashboard() {
    const [transactions, setTransactions] = useState([])
    const [error, setError] = useState('')

    function fetchTransactions() {
        const backendURL = process.env.REACT_APP_BACKEND_URL;
        fetch(`${backendURL}/record/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setTransactions(data || []);
            })
            .catch(error => {
                setError('Failed to fetch transactions. Please try again later.');
                console.error('Error fetching data:', error);
            });
    }

    useEffect(() => fetchTransactions(), []);

    return (
        <Box m='20px'>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Header title={'Dashboard'} subtitle={'view analytics'} />
            </Box>
            <TransactionsContext.Provider value={transactions}>
                <Box display={'flex'} justifyContent={'center'} alignContent={'center'}>
                    <Carousel />
                </Box>
            </TransactionsContext.Provider>
        </Box >
    )
}

export default Dashboard