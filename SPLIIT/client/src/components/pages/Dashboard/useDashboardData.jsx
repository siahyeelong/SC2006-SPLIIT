// useDashboardData.js
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../classes/AuthContext";

export function useDashboardData() {
    const { trip } = useContext(AuthContext);

    const [transactions, setTransactions] = useState([]);
    const [debtMatrix_R, setDebtMatrix_R] = useState({});
    const [debtMatrix_S, setDebtMatrix_S] = useState({});
    const [people, setPeople] = useState([])
    const [error, setError] = useState("");

    useEffect(() => {
        const backendURL = process.env.REACT_APP_BACKEND_URL;

        // Fetch transactions
        async function loadTransactions() {
            setTransactions(await trip.getTransactions());
        }

        // Fetch debt matrices 
        async function loadDebtMatrices() {
            const matrices = await trip.getDebtMatrices();
            setDebtMatrix_R(matrices[1]);
            setDebtMatrix_S(matrices[2]);
        }

        async function loadPeople() {
            setPeople(await trip.getParticipants());
            function mapPeopleByUsername(people) {
                return people.reduce((acc, person) => {
                    acc[person.username] = person;
                    return acc;
                }, {});
            };
            mapPeopleByUsername(people)
        }

        loadTransactions()
        loadDebtMatrices()
        loadPeople()
    }, []);

    return { transactions, debtMatrix_R, debtMatrix_S, people, error };
}
