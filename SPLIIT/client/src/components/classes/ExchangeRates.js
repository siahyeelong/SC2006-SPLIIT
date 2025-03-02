import { createContext, useEffect, useState, useContext } from "react";
/**
 * This custom hook sets the exchange rates for the current session. This is used to reduced the number of api calls made to the backend
 * The exchange rates are referenced to the Euro. e.g. the SGD listed here means 1 EUR == 1.40 SGD
*/
const ExchangeRatesContext = createContext();

export const ExchangeRatesProvider = ({ children }) => {
    const storedRates = localStorage.getItem("exchangeRates")
    const storedTimestamp = localStorage.getItem("exchangeRatesTimestamp")

    const initialRates = storedRates ? JSON.parse(storedRates) : {}
    const lastUpdated = storedTimestamp ? Number(storedTimestamp) : 0

    const [exchangeRates, setExchangeRates] = useState(initialRates)
    const [timestamp, setTimestamp] = useState(lastUpdated)

    const getRates = async () => {
        const backendURL = process.env.REACT_APP_BACKEND_URL;
        try {
            const response = await fetch(`${backendURL}/record/rates`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            if (data && data.rates) {
                setExchangeRates(data.rates)
                const now = Date.now()
                setTimestamp(now)

                sessionStorage.setItem("exchangeRates", JSON.stringify(data.rates))
                sessionStorage.setItem("exchangeRatesTimestamp", now.toString())
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
    // if exchange rate is outdated
    useEffect(() => {
        const today = new Date()
        if (today.getFullYear !== timestamp.getFullYear ||
            today.getMonth !== timestamp.getMonth ||
            today.getDate !== timestamp.getDate) {
            getRates()
        }
    }, [])
    // auto refresh every 1 hour
    useEffect(() => {
        const interval = setInterval(getRates, 60 * 60 * 1000); // 1 hour
        return () => clearInterval(interval);
    }, []);

    return (
        <ExchangeRatesContext.Provider value={{ exchangeRates }}>
            {children}
        </ExchangeRatesContext.Provider>
    );
}
export const useExchangeRates = () => useContext(ExchangeRatesContext);