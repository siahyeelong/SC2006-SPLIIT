// DebtTable.jsx
import React from "react";
import {
    Box,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
} from "@mui/material";
import { People } from "../../classes/People";

function DebtTable({ matrix, ower, formatPrice }) {
    // Only show the table if there is any debt to display
    if (!matrix || !Object.values(matrix).some((amount) => amount > 0)) {
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
                                    People[owedKey] &&
                                    owedKey !== ower.identifier
                            )
                            .map(([owedKey, amount]) => {
                                const owedPerson = People[owedKey];
                                return (
                                    <TableRow
                                        key={`${ower.identifier}-${owedKey}`}
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
                                            {formatPrice(amount)}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </Box>
        </Box>
    );
}

export default DebtTable;
