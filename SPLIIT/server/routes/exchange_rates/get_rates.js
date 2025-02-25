import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
import db from "../../db/connection.js";

export async function get_rates() {
    let todaysRates = []
    try {
        let collection = await db.collection(process.env.RATES_COLLECTION);

        const now = new Date();
        const utcMidnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
        const query = {
            timestamp: {
                $gte: utcMidnight   // Greater than or equal to today at 00:00:00 UTC
            }
        };

        todaysRates = await collection.find(query).toArray();
    } catch (error) {
        console.log(`get error:\n${error}`.red);
    }
    if (todaysRates.length) {
        // data is cached
        console.log('cached!')
        return todaysRates[0]
    } else {
        // data not cached
        console.log('not cached!')
        let data = ''
        try {
            data = await call_exchange_rates_api();
        } catch (error) {
            console.error("API Call Failed:", error);
        }
        try {
            let newRecord = {
                timestamp: new Date(),
                rates: data.rates
            };
            let collection = await db.collection(process.env.RATES_COLLECTION);
            let result = await collection.insertOne(newRecord);
            return newRecord
        } catch (err) {
            console.error(err);
        }
    }
}

async function call_exchange_rates_api() {
    const exchange_rates_api_url = "https://api.exchangeratesapi.io/v1/latest";
    const params = new URLSearchParams({ access_key: process.env.EXCHANGE_RATE_API_KEY }).toString();

    try {
        const response = await fetch(`${exchange_rates_api_url}?${params}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}