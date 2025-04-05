import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, useTheme, Stack } from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import ToCSVButton from "../../components/common/ToCSVButton";
import RecipientsCell from "./RecipientsCell";
import CurrencySwitch from "./CurrencySwitch";
import PerTransactionDialog from "./PerTransactionDialog";
import { ReceiptLong } from "@mui/icons-material";
import { AuthContext } from "../../contexts/AuthContext";

function TransactionsTable() {
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);

    const [transactions, setTransactions] = useState([]);
    const [people, setPeople] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [showLocalCurrency, setShowLocalCurrency] = useState(false);
    const [showTransactionDialog, setShowTransactionDialog] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState([]);
    const [error, setError] = useState(null);
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
        getPeople();
        fetchTransactions();
    }, []);

    if (loading) return <Typography>Loading...</Typography>;

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
                        style: "currency",
                        currency: trip.localCurrency,
                        minimumFractionDigits: 0, // Show no decimal places if not needed
                        maximumFractionDigits: 2,
                    });
                } else {
                    return parseFloat(priceAmt).toLocaleString("en-SG", {
                        // format amount accordingly
                        style: "currency",
                        currency: trip.foreignCurrency,
                        minimumFractionDigits: 0, // Show no decimal places if not needed
                        maximumFractionDigits: 2,
                    });
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
                <RecipientsCell
                    recipients={params.value || []}
                    people={people}
                />
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
            valueGetter: (params) => people[params.value]?.displayName,
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
