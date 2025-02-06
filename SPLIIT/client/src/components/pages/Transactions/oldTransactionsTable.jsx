/**
 * [Deprecated] This is the outdated version of this component. The new component can be found under the name TransactionsTable.jsx which uses DataGrid instead.
 */

import { React, useState, useEffect } from 'react'
import { TablePagination, useTheme } from '@mui/material';
import { tokens } from '../../../theme'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

import 'bootstrap/dist/css/bootstrap.min.css';
import ToCSVButton from './ToCSVButton';

function oldTransactionsTable() {
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const backendURL = process.env.REACT_APP_BACKEND_URL;
        console.log(backendURL)
        fetch(`${backendURL}/record/`, { method: "GET" })
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
    }, []);

    const columns = [
        {
            field: 'timestamp', headerName: 'Date', width: 90,
            format: (val) => {
                const d = new Date(val);
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
            field: 'price', headerName: 'Price', width: 150,
            format: (val) => {
                return parseFloat(val).toLocaleString('en-SG', {
                    style: 'currency', currency: 'SGD',
                    minimumFractionDigits: 0,  // Show no decimal places if not needed
                    maximumFractionDigits: 2
                });
            }
        },
        { field: 'category', headerName: 'Category', width: 200 },
        { field: 'recipients', headerName: 'Recipients', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        { field: 'payer', headerName: 'Payer', width: 130 },
    ];

    return (

        <Box sx={{ padding: 4 }}>
            <ToCSVButton data={transactions} colours={colours} />
            {error ? (
                <Typography color="error" variant="body1">{error}</Typography>
            ) : (
                <Paper sx={{ overflow: 'hidden', width: '100%', borderRadius: 4, boxShadow: 4 }}>
                    <TableContainer sx={{ maxHeight: 550 }}>
                        <Table stickyHeader aria-label='sticky table'>
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            style={{ minWidth: columns.width, backgroundColor: colours.grey[900] }}
                                        >
                                            {column.headerName}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((transaction, index) => {
                                        return (
                                            <TableRow key={index}>
                                                {columns.map((column) => {
                                                    const value = transaction[column.field];
                                                    return (
                                                        <TableCell key={column.field}>
                                                            {column.format
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    )
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={transactions.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            )
            }
        </Box >
    );
};

export default oldTransactionsTable;