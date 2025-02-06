import { Dialog, DialogActions, DialogContent, Box, Typography, Button, Chip } from '@mui/material'
import React from 'react'
import { Categories } from '../../settings/Categories';
import { ExchangeRates } from '../../settings/ExchangeRates';
import { Person, People } from '../../settings/People';

function TransactionCard({ transaction }) {

    const price = parseFloat(transaction.price).toLocaleString('en-SG', {
        style: 'currency', currency: (transaction.currency === 'SGD') ? 'SGD' : (transaction.currency || 'SGD'),
        minimumFractionDigits: 0,  // Show no decimal places if not needed
        maximumFractionDigits: 2
    })

    return (
        <>
            <Box display={'flex'} justifyContent={'space-between'} alignContent={'center'}>
                <Box display={'flex'} alignItems={'center'}>
                    <Box p={'10px'}>
                        {/* Display category icon in the same line */}
                        {Categories.getCategoryIcon(transaction.category)}
                    </Box>
                    <Box p={'10px'}>
                        {/* Display price large */}
                        <Typography variant='h1'>{price}</Typography>
                    </Box>
                </Box>
                <Box textAlign={'center'} p={'10px'}>
                    <Typography variant="h6" sx={{ display: 'block' }} p={'5px'}>
                        Paid by:
                    </Typography>
                    {/* display payer */}
                    <Chip
                        key={transaction.payer}
                        label={Person.findDisplayName(transaction.payer, People)}
                        sx={{
                            backgroundColor: Person.findFavColour(transaction.payer, People) || '#CCCCCC',
                            color: '#000',
                            fontWeight: 'bold',
                        }} />
                </Box>
            </Box >

            {/* Display Category in text */}
            < Box display={'flex'} alignContent={'center'} >
                <Box display={'flex'} justifyContent={'flex-end'} alignContent={'center'} p={'10px'} width={'110px'}>
                    <Typography fontWeight={'bold'}>Category: </Typography>
                </Box>
                <Box display={'flex'} justifyContent={'flex-start'} alignContent={'center'} p={'10px'}>
                    <Typography>{transaction.category}</Typography>
                </Box>
            </Box >
            {/* Display Description */}
            < Box display={'flex'} alignContent={'center'} >
                <Box display={'flex'} justifyContent={'flex-end'} alignContent={'center'} p={'10px'} width={'110px'}>
                    <Typography fontWeight={'bold'}>Description: </Typography>
                </Box>
                <Box display={'flex'} justifyContent={'flex-start'} alignContent={'center'} p={'10px'}>
                    <Typography>{transaction.description}</Typography>
                </Box>
            </Box >
            {/* Display amount in SGD if not in original currency */}
            < Box display={'flex'} alignContent={'center'} visibility={transaction.currency === 'SGD' ? 'hidden' : 'visible'} >
                <Box display={'flex'} justifyContent={'flex-end'} alignContent={'center'} p={'10px'} width={'110px'}>
                    <Typography fontWeight={'bold'}>Price (SGD): </Typography>
                </Box>
                <Box display={'flex'} justifyContent={'flex-start'} alignContent={'center'} p={'10px'}>
                    <Typography>
                        {parseFloat(transaction.SGD).toLocaleString('en-SG', {
                            style: 'currency', currency: 'SGD',
                            minimumFractionDigits: 0,  // Show no decimal places if not needed
                            maximumFractionDigits: 2
                        })}
                    </Typography>
                </Box>
            </Box >
            {/* Display exchange rate */}
            < Box display={'flex'} alignContent={'center'} visibility={transaction.currency === 'SGD' ? 'hidden' : 'visible'} >
                <Box display={'flex'} justifyContent={'flex-end'} alignContent={'center'} p={'10px'} width={'110px'}>
                    <Typography fontWeight={'bold'}>Exchange rate: </Typography>
                </Box>
                <Box display={'flex'} justifyContent={'flex-start'} alignContent={'center'} p={'10px'}>
                    <Typography>{ExchangeRates.getRate('IDR')}</Typography>
                </Box>
            </Box >
            {/* Display recipients */}
            < Box display={'flex'} alignContent={'center'} width={400}>
                <Box display={'flex'} justifyContent={'flex-end'} alignContent={'center'} p={'10px'} width={'110px'}>
                    <Typography fontWeight={'bold'}>Recipients: </Typography>
                </Box>
                <Box display={'flex'} justifyContent={'flex-start'} alignContent={'center'} p={'10px'} flexWrap={'wrap'} gap={1}>
                    {transaction.recipients.map((recipient) => (
                        <Chip
                            key={recipient}
                            label={Person.findDisplayName(recipient, People)}
                            sx={{
                                backgroundColor: Person.findFavColour(recipient, People) || '#CCCCCC',
                                color: '#000',
                                fontWeight: 'bold',
                            }}
                        />
                    ))}
                </Box>
            </Box >

            {/* Display timestamp as a grey footer */}
        </>
    )
}

function PerTransactionDialog({ showDialog, transaction, onClose }) {
    async function deleteTransaction(transaction) {
        try {
            let response = "";
            const backendURL = process.env.REACT_APP_BACKEND_URL;

            response = await fetch(`${backendURL}/record/${transaction._id}`, { method: "DELETE" });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            console.log('Transaction deleted successfully!');

        } catch (error) {
            console.error("something went wrong with updating a record: ", error);
            alert("Something went wrong!");
        }

    }

    return (
        <Dialog open={showDialog} onClose={onClose} fullWidth={false} maxWidth={false}>
            <DialogContent><TransactionCard transaction={transaction} /></DialogContent>
            <DialogActions>
                <Button variant='outlined' color='error' onClick={() => { deleteTransaction(transaction).then(onClose); }}>
                    DELETE
                </Button>
                <Button variant='contained' color='secondary' onClick={onClose}>
                    CLOSE
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default PerTransactionDialog