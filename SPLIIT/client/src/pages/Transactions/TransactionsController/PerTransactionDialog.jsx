import {
    Dialog,
    DialogActions,
    DialogContent,
    Box,
    Typography,
    Button,
    Chip,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { Categories } from "../../../constants/Categories";
import { useExchangeRates } from "../../../contexts/ExchangeRates";
import DeleteTransactionConfirmationDialog from "./DelTransactionConfirmDialog";
import SnackbarNotifs from "../../../components/common/SnackbarNotifs";
import { AuthContext } from "../../../contexts/AuthContext";
import MapPreview from "../../../components/common/MapPreview";
import { validateGeolocation } from "../../../utils/validators";

function TransactionCard({ transaction, people }) {
    const { exchangeRates } = useExchangeRates();
    const { trip } = useContext(AuthContext);

    const price = parseFloat(transaction.price).toLocaleString("en-SG", {
        style: "currency",
        currency: transaction.isLocalCurrency
            ? trip.localCurrency
            : trip.foreignCurrency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });

    if (!people) return <></>;

    return (
        <>
            <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignContent={"center"}
            >
                <Box display={"flex"} alignItems={"center"}>
                    <Box p={"10px"}>
                        {/* Display category icon in the same line */}
                        {Categories[transaction.category].icon}
                    </Box>
                    <Box p={"10px"}>
                        {/* Display price large */}
                        <Typography variant="h1">{price}</Typography>
                    </Box>
                </Box>
                <Box textAlign={"center"} p={"10px"}>
                    <Typography
                        variant="h6"
                        sx={{ display: "block" }}
                        p={"5px"}
                    >
                        Paid by:
                    </Typography>
                    {/* display payer */}
                    <Chip
                        key={transaction.payer}
                        label={people[transaction.payer]?.displayName}
                        sx={{
                            backgroundColor:
                                people[transaction.payer]?.favColour ||
                                "#CCCCCC",
                            color: "#000",
                            fontWeight: "bold",
                        }}
                    />
                </Box>
            </Box>

            {/* Display Category in text */}
            <Box display={"flex"} alignContent={"center"}>
                <Box
                    display={"flex"}
                    justifyContent={"flex-end"}
                    alignContent={"center"}
                    p={"10px"}
                    width={"110px"}
                >
                    <Typography fontWeight={"bold"}>Category: </Typography>
                </Box>
                <Box
                    display={"flex"}
                    justifyContent={"flex-start"}
                    alignContent={"center"}
                    p={"10px"}
                >
                    <Typography>{transaction.category}</Typography>
                </Box>
            </Box>
            {/* Display Description */}
            <Box display={"flex"} alignContent={"center"}>
                <Box
                    display={"flex"}
                    justifyContent={"flex-end"}
                    alignContent={"center"}
                    p={"10px"}
                    width={"110px"}
                >
                    <Typography fontWeight={"bold"}>Description: </Typography>
                </Box>
                <Box
                    display={"flex"}
                    justifyContent={"flex-start"}
                    alignContent={"center"}
                    p={"10px"}
                >
                    <Typography>{transaction.description}</Typography>
                </Box>
            </Box>
            {/* Display amount in SGD if not in original currency */}
            <Box
                display={"flex"}
                alignContent={"center"}
                visibility={transaction.isLocalCurrency ? "hidden" : "visible"}
            >
                <Box
                    display={"flex"}
                    justifyContent={"flex-end"}
                    alignContent={"center"}
                    p={"10px"}
                    width={"110px"}
                >
                    <Typography fontWeight={"bold"}>
                        Price ({trip.localCurrency}):{" "}
                    </Typography>
                </Box>
                <Box
                    display={"flex"}
                    justifyContent={"flex-start"}
                    alignContent={"center"}
                    p={"10px"}
                >
                    <Typography>
                        {parseFloat(
                            transaction.price / transaction.exchangeRate
                        ).toLocaleString("en-SG", {
                            style: "currency",
                            currency: trip.localCurrency,
                            minimumFractionDigits: 0, // Show no decimal places if not needed
                            maximumFractionDigits: 2,
                        })}
                    </Typography>
                </Box>
            </Box>
            {/* Display exchange rate */}
            <Box
                display={"flex"}
                alignContent={"center"}
                visibility={transaction.isLocalCurrency ? "hidden" : "visible"}
            >
                <Box
                    display={"flex"}
                    justifyContent={"flex-end"}
                    alignContent={"center"}
                    p={"10px"}
                    width={"110px"}
                >
                    <Typography fontWeight={"bold"}>Exchange rate: </Typography>
                </Box>
                <Box
                    display={"flex"}
                    justifyContent={"flex-start"}
                    alignContent={"center"}
                    p={"10px"}
                >
                    <Typography>
                        {trip.localCurrency} 1 = {trip.foreignCurrency}{" "}
                        {parseFloat(transaction.exchangeRate).toFixed(2)}
                    </Typography>
                </Box>
            </Box>
            {/* Display recipients */}
            <Box display={"flex"} alignContent={"center"} width={400}>
                <Box
                    display={"flex"}
                    justifyContent={"flex-end"}
                    alignContent={"center"}
                    p={"10px"}
                    width={"110px"}
                >
                    <Typography fontWeight={"bold"}>Recipients: </Typography>
                </Box>
                <Box
                    display={"flex"}
                    justifyContent={"flex-start"}
                    alignContent={"center"}
                    p={"10px"}
                    flexWrap={"wrap"}
                    gap={1}
                >
                    {transaction.recipients.map((recipient) => (
                        <Chip
                            key={recipient}
                            label={people[recipient]?.displayName}
                            sx={{
                                backgroundColor:
                                    people[recipient]?.favColour || "#CCCCCC",
                                color: "#000",
                                fontWeight: "bold",
                            }}
                        />
                    ))}
                </Box>
            </Box>
            {/* Display location */}
            <Box display={"flex"} justifyContent={"center"} m={2}>
                {validateGeolocation(transaction.geolocation) &&
                    <MapPreview
                        lat={transaction.geolocation.lat}
                        lng={transaction.geolocation.long}
                    />
                }
            </Box>

            {/* Display timestamp as a grey footer */}
        </>
    );
}

function PerTransactionDialog({ showDialog, transaction, people, onClose }) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: "",
        severity: "",
        key: 0,
    });

    const showSnackbar = (message, severity) => {
        setSnackbarState((s) => ({
            open: true,
            message,
            severity,
            key: s.key + 1,
        }));
    };

    const handleCloseSnackbar = () => {
        setSnackbarState((s) => ({ ...s, open: false }));
    };

    const handleConfirmDelete = () => {
        deleteTransaction(transaction).then(onClose);
        setDialogOpen(false);
        showSnackbar("Transaction Deleted", "info");
    };

    async function deleteTransaction(transaction) {
        try {
            let response = "";
            const backendURL = process.env.REACT_APP_BACKEND_URL;

            response = await fetch(
                `${backendURL}/transactions/${transaction._id}`,
                { method: "DELETE" }
            );

            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);

            console.log("Transaction deleted successfully!");
        } catch (error) {
            console.error(
                "something went wrong with updating a record: ",
                error
            );
            alert("Something went wrong!");
        }
    }

    return (
        <>
            <Dialog
                open={showDialog}
                onClose={onClose}
                fullWidth={false}
                maxWidth={false}
            >
                <DialogContent>
                    <TransactionCard
                        transaction={transaction}
                        people={people}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => setDialogOpen(true)}
                    >
                        DELETE
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={onClose}
                    >
                        CLOSE
                    </Button>
                </DialogActions>
            </Dialog>

            <DeleteTransactionConfirmationDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onConfirm={handleConfirmDelete}
                transaction={transaction}
            />

            <SnackbarNotifs
                open={snackbarState.open}
                message={snackbarState.message}
                onClose={handleCloseSnackbar}
                severity={snackbarState.severity}
            />
        </>
    );
}

export default PerTransactionDialog;
