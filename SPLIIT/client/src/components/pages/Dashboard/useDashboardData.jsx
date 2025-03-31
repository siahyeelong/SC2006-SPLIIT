// useDashboardData.js
import { useState, useEffect } from "react";

export function useDashboardData() {
    const [transactions, setTransactions] = useState([]);
    const [debtMatrix_R, setDebtMatrix_R] = useState({});
    const [debtMatrix_S, setDebtMatrix_S] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        const backendURL = process.env.REACT_APP_BACKEND_URL;

        // Fetch transactions
        fetch(`${backendURL}/transactions/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setTransactions(data || []);
            })
            .catch((error) => {
                setError(
                    "Failed to fetch transactions. Please try again later."
                );
                console.error("Error fetching transactions:", error);
            });

        // Fetch debt matrices from /transactions/owe
        fetch(`${backendURL}/transactions/owe`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                // Assume data is an array where:
                // data[1] is the "to be received" matrix,
                // data[2] is the "to be paid" matrix.
                setDebtMatrix_R(data[1] || {});
                setDebtMatrix_S(data[2] || {});
            })
            .catch((error) => {
                setError(
                    "Failed to fetch debt matrices. Please try again later."
                );
                console.error("Error fetching debt matrices:", error);
            });
    }, []);

    return { transactions, debtMatrix_R, debtMatrix_S, error };
}
