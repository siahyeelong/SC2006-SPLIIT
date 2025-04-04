import React, { useContext } from "react";
import {
    Box,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
} from "@mui/material";
import { useDashboardData } from "./useDashboardData";
import { AuthContext } from "../../classes/AuthContext";

function DebtTable({ matrix, ower, formatPrice }) {
    const { people } = useDashboardData()
    const { trip } = useContext(AuthContext)

    // Only show the table if there is any debt to display
    if (!matrix || !Object.values(matrix).some((amount) => amount > 0.01)) {
        return null;
    }


    return (
        <Box>
            <Divider
                variant="middle"
                sx={{
                    "&::before, &::after": {
                        borderColor: "#363636",
                    },
                    py: 1,
                }}
            >
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    To pay:
                </Typography>
            </Divider>
            <Box sx={{ mt: 1 }}>
                <Table sx={{ minWidth: 100 }} aria-label="simple table">
                    <TableBody>
                        {Object.entries(matrix)
                            .filter(
                                ([owedKey, amount]) =>
                                    amount > 0 &&
                                    people[owedKey] &&
                                    owedKey !== ower.username
                            )
                            .map(([owedKey, amount]) => {
                                const owedPerson = people[owedKey];
                                return (
                                    <TableRow
                                        key={`${ower.username}-${owedKey}`}
                                        sx={{ maxHeight: "10px" }}
                                    >
                                        <TableCell
                                            align="left"
                                            sx={{
                                                padding: 0.5,
                                                border: 0,
                                                color: "#36332b",
                                                fontSize: "0.85rem",
                                            }}
                                        >
                                            {owedPerson.displayName}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            sx={{
                                                padding: 0.5,
                                                border: 0,
                                                color: "#36332b",
                                                fontSize: "0.85rem",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {formatPrice(amount, trip.localCurrency)}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                    </TableBody>
                </Table>
            </Box>
        </Box>
    );
}

export default DebtTable;
