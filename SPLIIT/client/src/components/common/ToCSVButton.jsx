import React from 'react'
import { Button } from '@mui/material';

function ToCSVButton({ data, colours, tripName }) {

    const handleExport = () => {
        const escapeCSV = (value) => {
            if (typeof value === "string") {
                // Escape double quotes by doubling them
                const escaped = value.replace(/"/g, '""');
                // Wrap in double quotes if contains comma, newline, or quote
                if (escaped.search(/("|,|\n)/g) >= 0) {
                    return `"${escaped}"`;
                }
                return escaped;
            }
            return value;
        };

        const csvContent = [
            ['Index', 'Date', 'Time', 'Price', 'Category', 'Recipients', 'Description', 'Payer'],
            ...data.map((transaction, index) => [
                index + 1,
                new Date(transaction.timestamp).toLocaleDateString(),
                new Date(transaction.timestamp).toLocaleTimeString(),
                transaction.price,
                transaction.category,
                (transaction.recipients || []).join('; '),
                escapeCSV(transaction.description || ''),
                escapeCSV(transaction.payer || '')
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `${tripName}.csv`);
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