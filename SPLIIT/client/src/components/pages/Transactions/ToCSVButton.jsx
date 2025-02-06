import React from 'react'
import { Button } from '@mui/material';

function ToCSVButton({ data, colours }) {

    const handleExport = () => {
        const csvContent = [
            ['Index', 'Date', 'Time', 'Price', 'Category', 'Recipients', 'Description', 'Payer'],
            ...data.map((transaction, index) => [
                index + 1,
                new Date(transaction.timestamp).toLocaleString(),
                transaction.price,
                transaction.category,
                (transaction.recipients || []).join('; '),
                (transaction.description || ''),
                (transaction.payer || '')
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'transactions.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Button variant="contained"
            onClick={handleExport}
            sx={{
                mb: 2,
                backgroundColor: colours.orangeAccent[600],
                color: 'black',
                ":hover": {
                    backgroundColor: colours.orangeAccent[700],
                    color: colours.primary[100]
                }
            }}>
            Export to CSV
        </Button>
    );
}

export default ToCSVButton