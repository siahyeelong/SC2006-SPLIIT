import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, useTheme, Stack } from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
<<<<<<< HEAD
<<<<<<< HEAD:SPLIIT/client/src/pages/Transactions/TransactionsTable.jsx
import ToCSVButton from "../../components/common/ToCSVButton";
=======
import ToCSVButton from "./ToCSVButton";
>>>>>>> 634cedd (fixed transactions table and added geographical map):SPLIIT/client/src/components/pages/Transactions/TransactionsTable.jsx
=======
import ToCSVButton from "../../components/common/ToCSVButton";
>>>>>>> 1227d8d (Restructure folders)
import RecipientsCell from "./RecipientsCell";
import CurrencySwitch from "./CurrencySwitch";
import PerTransactionDialog from "./PerTransactionDialog";
import { ReceiptLong } from "@mui/icons-material";
<<<<<<< HEAD
<<<<<<< HEAD:SPLIIT/client/src/pages/Transactions/TransactionsTable.jsx
<<<<<<< HEAD:SPLIIT/client/src/pages/Transactions/TransactionsTable.jsx
import { AuthContext } from "../../contexts/AuthContext";
=======
>>>>>>> b6fad7a (Implemented dashboard functions, added refresh):SPLIIT/client/src/components/pages/Transactions/TransactionsTable.jsx
=======
import { AuthContext } from "../../classes/AuthContext";
>>>>>>> 634cedd (fixed transactions table and added geographical map):SPLIIT/client/src/components/pages/Transactions/TransactionsTable.jsx
=======
import { AuthContext } from "../../contexts/AuthContext";
>>>>>>> 1227d8d (Restructure folders)

function TransactionsTable() {
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);

    const [transactions, setTransactions] = useState([]);
<<<<<<< HEAD
<<<<<<< HEAD:SPLIIT/client/src/pages/Transactions/TransactionsTable.jsx
    const [people, setPeople] = useState([]);
=======
    const [people, setPeople] = useState([])
>>>>>>> 634cedd (fixed transactions table and added geographical map):SPLIIT/client/src/components/pages/Transactions/TransactionsTable.jsx
=======
    const [people, setPeople] = useState([]);
>>>>>>> 1227d8d (Restructure folders)
    const [pageSize, setPageSize] = useState(10);
    const [showLocalCurrency, setShowLocalCurrency] = useState(false);
    const [showTransactionDialog, setShowTransactionDialog] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState([]);
    const [error, setError] = useState(null);
<<<<<<< HEAD
<<<<<<< HEAD:SPLIIT/client/src/pages/Transactions/TransactionsTable.jsx
    const [loading, setLoading] = useState(true);
    const { trip } = useContext(AuthContext);

    // function to get trip transactions
    async function fetchTransactions() {
        setLoading(true);
        try {
            const t = await trip.getTransactions();
            setTransactions(t);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
=======
    const [loading, setLoading] = useState(true)
    const { trip } = useContext(AuthContext)
=======
    const [loading, setLoading] = useState(true);
    const { trip } = useContext(AuthContext);
>>>>>>> 1227d8d (Restructure folders)

    // function to get trip transactions
    async function fetchTransactions() {
        setLoading(true);
        try {
            const t = await trip.getTransactions();
            setTransactions(t);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    // function to get all trip participants
    const getPeople = async () => {
        setLoading(true);
        try {
            const p = await trip.getParticipants();
            function mapPeopleByUsername(people) {
                return people.reduce((acc, person) => {
                    acc[person.username] = person;
                    return acc;
                }, {});
            }
            setPeople(mapPeopleByUsername(p));
        } catch (error) {
            console.log("error getting people");
        } finally {
<<<<<<< HEAD
            setLoading(false)
>>>>>>> 634cedd (fixed transactions table and added geographical map):SPLIIT/client/src/components/pages/Transactions/TransactionsTable.jsx
        }
    }
    // function to get all trip participants
    const getPeople = async () => {
        setLoading(true);
        try {
            const p = await trip.getParticipants();
            function mapPeopleByUsername(people) {
                return people.reduce((acc, person) => {
                    acc[person.username] = person;
                    return acc;
                }, {});
            }
            setPeople(mapPeopleByUsername(p));
        } catch (error) {
            console.log("error getting people");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
<<<<<<< HEAD:SPLIIT/client/src/pages/Transactions/TransactionsTable.jsx
        getPeople();
        fetchTransactions();
    }, []);

    if (loading) return <Typography>Loading...</Typography>;
=======
        getPeople()
        fetchTransactions()
    }, []);

    if (loading) return <Typography>Loading...</Typography>
>>>>>>> 634cedd (fixed transactions table and added geographical map):SPLIIT/client/src/components/pages/Transactions/TransactionsTable.jsx
=======
            setLoading(false);
        }
    };

    useEffect(() => {
        getPeople();
        fetchTransactions();
    }, []);

    if (loading) return <Typography>Loading...</Typography>;
>>>>>>> 1227d8d (Restructure folders)

    const columns = [
        { field: "id", headerName: "Index", flex: 3, sortable: true },
        {
            field: "timestamp",
            headerName: "Date",
            flex: 12,
            sortable: true,
            filterable: true,
            valueFormatter: (params) => {
                const d = new Date(params.value);
                return d.toLocaleString("en-SG", {
                    timeZone: "Asia/Singapore", // GMT+8
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                });
            },
        },
        {
            field: "price",
            headerName: "Price",
            flex: 10,
            sortable: true,
            filterable: true,
            valueGetter: (params) => parseFloat(params.value),
            valueFormatter: (params) => {
<<<<<<< HEAD
<<<<<<< HEAD:SPLIIT/client/src/pages/Transactions/TransactionsTable.jsx
=======
>>>>>>> 1227d8d (Restructure folders)
                let priceAmt = params.value;
                if (
                    transactions[params.id - 1].isLocalCurrency ||
                    showLocalCurrency
                ) {
                    // if transaction record was originally logged in localCurrency, or if user wants to see everything in localCurrency
                    if (!transactions[params.id - 1].isLocalCurrency)
                        // if the transaction wasnt a localCurrency record, convert it to equivalent localCurrency
                        priceAmt =
                            priceAmt / transactions[params.id - 1].exchangeRate;
                    return parseFloat(priceAmt).toLocaleString("en-SG", {
                        // format amount accordingly
<<<<<<< HEAD
=======
                let priceAmt = params.value
                if (transactions[params.id - 1].isLocalCurrency || showLocalCurrency) { // if transaction record was originally logged in localCurrency, or if user wants to see everything in localCurrency
                    if (!transactions[params.id - 1].isLocalCurrency) // if the transaction wasnt a localCurrency record, convert it to equivalent localCurrency
                        priceAmt = priceAmt / transactions[params.id - 1].exchangeRate;
                    return parseFloat(priceAmt).toLocaleString("en-SG", { // format amount accordingly
>>>>>>> 634cedd (fixed transactions table and added geographical map):SPLIIT/client/src/components/pages/Transactions/TransactionsTable.jsx
=======
>>>>>>> 1227d8d (Restructure folders)
                        style: "currency",
                        currency: trip.localCurrency,
                        minimumFractionDigits: 0, // Show no decimal places if not needed
                        maximumFractionDigits: 2,
<<<<<<< HEAD
<<<<<<< HEAD:SPLIIT/client/src/pages/Transactions/TransactionsTable.jsx
                    });
                } else {
                    return parseFloat(priceAmt).toLocaleString("en-SG", {
                        // format amount accordingly
=======
                    })
                } else {
                    return parseFloat(priceAmt).toLocaleString("en-SG", { // format amount accordingly
>>>>>>> 634cedd (fixed transactions table and added geographical map):SPLIIT/client/src/components/pages/Transactions/TransactionsTable.jsx
=======
                    });
                } else {
                    return parseFloat(priceAmt).toLocaleString("en-SG", {
                        // format amount accordingly
>>>>>>> 1227d8d (Restructure folders)
                        style: "currency",
                        currency: trip.foreignCurrency,
                        minimumFractionDigits: 0, // Show no decimal places if not needed
                        maximumFractionDigits: 2,
<<<<<<< HEAD
<<<<<<< HEAD:SPLIIT/client/src/pages/Transactions/TransactionsTable.jsx
                    });
=======
                    })
>>>>>>> 634cedd (fixed transactions table and added geographical map):SPLIIT/client/src/components/pages/Transactions/TransactionsTable.jsx
=======
                    });
>>>>>>> 1227d8d (Restructure folders)
                }
            },
        },
        {
            field: "category",
            headerName: "Category",
            flex: 10,
            sortable: true,
            filterable: true,
        },
        {
            field: "recipients",
            headerName: "Recipients",
            flex: 20,
            sortable: true,
            filterable: true,
            renderCell: (params) => (
<<<<<<< HEAD
<<<<<<< HEAD:SPLIIT/client/src/pages/Transactions/TransactionsTable.jsx
=======
>>>>>>> 1227d8d (Restructure folders)
                <RecipientsCell
                    recipients={params.value || []}
                    people={people}
                />
<<<<<<< HEAD
=======
                <RecipientsCell recipients={params.value || []} people={people} />
>>>>>>> 634cedd (fixed transactions table and added geographical map):SPLIIT/client/src/components/pages/Transactions/TransactionsTable.jsx
=======
>>>>>>> 1227d8d (Restructure folders)
            ),
        },
        {
            field: "description",
            headerName: "Description",
            flex: 15,
            sortable: true,
            filterable: true,
        },
        {
            field: "payer",
            headerName: "Payer",
            flex: 8,
            sortable: true,
            filterable: true,
<<<<<<< HEAD
<<<<<<< HEAD:SPLIIT/client/src/pages/Transactions/TransactionsTable.jsx
            valueGetter: (params) => people[params.value]?.displayName,
=======
            valueGetter: (params) => (
                people[params.value]?.displayName
            ),
>>>>>>> 634cedd (fixed transactions table and added geographical map):SPLIIT/client/src/components/pages/Transactions/TransactionsTable.jsx
=======
            valueGetter: (params) => people[params.value]?.displayName,
>>>>>>> 1227d8d (Restructure folders)
        },
    ];

    const handlePageSizeChange = (size) => {
        setPageSize(size);
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Stack
                direction="row"
                sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
                <ToCSVButton data={transactions} colours={colours} />
                <CurrencySwitch onToggle={setShowLocalCurrency} />
            </Stack>

            {error ? (
                <Typography color="error" variant="body1">
                    {error}
                </Typography>
            ) : transactions.length === 0 ? (
                // If no transactions are found
                <Box
                    sx={{
                        height: 400,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: colours.primary[400],
                        borderRadius: 2,
                        boxShadow: 2,
                        textAlign: "center",
                    }}
                >
                    <ReceiptLong
                        sx={{ fontSize: 60, color: colours.grey[300], mb: 2 }}
                    />
                    <Typography
                        variant="h6"
                        sx={{ color: colours.grey[100], fontWeight: 600 }}
                    >
                        No transactions found
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: colours.grey[300], mt: 1 }}
                    >
                        Try adding some transactions.
                    </Typography>
                </Box>
            ) : (
                // If transactions found
                <Box sx={{ height: 550, width: "100%", overflow: "auto" }}>
                    <Box sx={{ minWidth: 1300, height: 550 }}>
                        <DataGrid
                            rows={transactions.map((transaction, index) => ({
                                id: index + 1,
                                ...transaction,
                            }))}
                            columns={columns}
                            pageSize={pageSize}
                            rowsPerPageOptions={[10, 20, 50]}
                            onPageSizeChange={handlePageSizeChange}
                            sortingOrder={["asc", "desc"]}
                            onRowClick={(params) => {
                                setShowTransactionDialog(true);
                                setSelectedTransaction(params.row);
                            }}
                            sx={{
                                bgcolor: colours.primary[400],
                                "& .MuiDataGrid-cell": {
                                    color: colours.grey[100],
                                },
                                "& .MuiDataGrid-row:hover": {
                                    backgroundColor: colours.greenAccent[600],
                                    cursor: "pointer",
                                },
                                "& .MuiDataGrid-columnHeaders": {
                                    backgroundColor: colours.primary[600],
                                    color: "#ffffff",
                                },
                                fontFamily: theme.typography.body1,
                                borderColor: colours.grey[400],
                            }}
                        />
                    </Box>
                    <PerTransactionDialog
                        showDialog={showTransactionDialog}
                        transaction={selectedTransaction}
                        people={people}
                        onClose={() => {
                            fetchTransactions();
                            setShowTransactionDialog(false);
                        }}
                    />
                </Box>
            )}
        </Box>
    );
}

export default TransactionsTable;
