import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme, Stack } from '@mui/material';
import { tokens } from '../../../theme';
import { DataGrid } from '@mui/x-data-grid';
import ToCSVButton from './ToCSVButton';
import { Person, People } from '../../settings/People';
import RecipientsCell from './RecipientsCell';
import CurrencySwitch from './CurrencySwitch';
import PerTransactionDialog from './PerTransactionDialog';

function TransactionsTable() {
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);

    const [transactions, setTransactions] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [showSGD, setShowSGD] = useState(false);
    const [showTransactionDialog, setShowTransactionDialog] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState([]);
    const [error, setError] = useState(null);

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

    const columns = [
        { field: 'id', headerName: 'Index', flex: 3, sortable: true },
        {
            field: 'timestamp', headerName: 'Date', flex: 12, sortable: true, filterable: true,
            valueFormatter: (params) => {
                const d = new Date(params.value);
                return d.toLocaleString('en-SG', {
                    timeZone: "Asia/Singapore", // GMT+8
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                });
            }
        },
        {
            field: (showSGD ? 'SGD' : 'price'), headerName: 'Price', flex: 10, sortable: true, filterable: true,
            valueGetter: (params) => parseFloat(params.value),
            valueFormatter: (params) => {
                return parseFloat(params.value).toLocaleString('en-SG', {
                    style: 'currency', currency: showSGD ? 'SGD' : (transactions[params.id - 1].currency || 'SGD'),
                    minimumFractionDigits: 0,  // Show no decimal places if not needed
                    maximumFractionDigits: 2
                });
            }
        },
        { field: 'category', headerName: 'Category', flex: 10, sortable: true, filterable: true },
        {
            field: 'recipients', headerName: 'Recipients', flex: 20, sortable: true, filterable: true,
            renderCell: (params) => (
                < RecipientsCell recipients={params.value || []} />
            )
        },
        { field: 'description', headerName: 'Description', flex: 15, sortable: true, filterable: true },
        {
            field: 'payer', headerName: 'Payer', flex: 8, sortable: true, filterable: true,
            valueGetter: (params) => Person.findDisplayName(params.value, People)
        },
    ];

    const handlePageSizeChange = (size) => {
        setPageSize(size)
    }

    return (
        <Box sx={{ padding: 4 }}>
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <ToCSVButton data={transactions} colours={colours} />
                <CurrencySwitch onToggle={setShowSGD} />
            </Stack>
            {error ? (
                <Typography color="error" variant="body1">{error}</Typography>
            ) : (
                <Box sx={{ height: 550, width: '100%', overflow: 'auto' }}>
                    <Box sx={{ minWidth: 1300, height: 550 }}>
                        <DataGrid
                            rows={transactions.map((transaction, index) => ({ id: index + 1, ...transaction }))}
                            columns={columns}
                            pageSize={pageSize}
                            rowsPerPageOptions={[10, 20, 50]}
                            onPageSizeChange={handlePageSizeChange}
                            sortingOrder={['asc', 'desc']}
                            onRowClick={(params) => { setShowTransactionDialog(true); setSelectedTransaction(params.row) }}
                            sx={{
                                bgcolor: colours.primary[400], // Light gray background color for the table
                                '& .MuiDataGrid-cell': {
                                    color: colours.grey[100],   // Darker text color for cells
                                },
                                '& .MuiDataGrid-row:hover': {
                                    backgroundColor: colours.greenAccent[600], // Row highlight on hover
                                },
                                '& .MuiDataGrid-columnHeaders': {
                                    backgroundColor: colours.primary[600], // Header background color
                                    color: '#ffffff',           // Header text color
                                },
                                fontFamily: theme.typography.body1,
                                borderColor: colours.grey[400]
                            }}
                        />
                    </Box>
                    <PerTransactionDialog showDialog={showTransactionDialog} transaction={selectedTransaction} onClose={() => { fetchTransactions(); setShowTransactionDialog(false); }} />
                </Box>
            )}
        </Box>
    );
};

export default TransactionsTable;