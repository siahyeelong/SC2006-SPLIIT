import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb"; // This help convert the id from string to ObjectId for the _id.
import { settle_debt } from "./algorithm/settle_debt.js";
import { get_rates } from "./exchange_rates/get_rates.js";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();
let collection = await db.collection(process.env.TRANSACTIONS_COLLECTION);
let users_collection = await db.collection(process.env.USERS_COLLECTION);
let trips_collection = await db.collection(process.env.TRIPS_COLLECTION);

// This section will help you get a list of all the records.
router.get("/tripTransactions/:tripID", async (req, res) => {
    try {
        let results = await collection.find({ tripID: req.params.tripID }).toArray();
        res.send(results).status(200);
    } catch (error) {
        console.log(`get error:\n${error}`.red);
    }
});


router.get("/owe/:tripID", async (req, res) => {
    try {
        const tripID = req.params.tripID;
        // get all transactions relating to the trip
        let transactions = await collection.find({ tripID: tripID }).toArray();
        // get all users of the trip
        const tripInfo = await trips_collection.findOne({ tripID: tripID });
        // get all user's information 
        const usernames = tripInfo?.users;
        // Find all information about the user
        let people = await Promise.all(
            usernames?.map(async (username) => {
                let person = await users_collection.findOne({ username: username });
                // remove sensitive information
                delete person.password;
                delete person._id;
                delete person.email;
                delete person.trips
                return person;
            })
        );
        function mapPeopleByUsername(people) {
            return people.reduce((acc, person) => {
                acc[person.username] = person;
                return acc;
            }, {});
        };
        let debts = settle_debt(transactions, mapPeopleByUsername(people));
        res.status(200).send(debts);
    } catch (error) {
        console.log(`get error:\n${error}`.red);
    }
});

// This section will get the exchange rates
router.get("/rates", async (req, res) => {
    try {
        const result = await get_rates();
        res.send(result).status(200);
    } catch (error) {
        console.log(`exchange rates error:\n${error}`.red);
        res.send("Not found").status(404);
    }
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
    try {

        let query = { _id: new ObjectId(req.params.id) };
        let result = await collection.findOne(query);

        if (!result) res.send("Not found").status(404);
        else res.send(result).status(200);
    } catch (error) {
        console.log(`get id error:\n${error}`.red);
        res.send("Not found").status(404);
    }
});

// This section will help you create a new record.
/** example body structure:
{
    "recipients": ["person1", "person2", "person4"],
    "category": "Category",
    "price": 13.45,
    "description": "text",
    "payer": "person",
}
 */
router.post("/newtransaction", async (req, res) => {
    // TODO
    // active version
    try {
        let newRecord = {
            recipients: req.body.recipients,
            category: req.body.category,
            price: req.body.price,
            currency: req.body.currency,
            isLocalCurrency: req.body.isLocalCurrency,
            exchangeRate: req.body.exchangeRate,
            description: req.body.description,
            payer: req.body.payer,
            timestamp: new Date(),
            tripID: req.body.tripID,
            geolocation: req.body.geolocation,
        };

        let result = await collection.insertOne(newRecord);
        res.send(result).status(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record");
    }
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        const updates = {
            $set: {
                recipients: req.body.recipients,
                category: req.body.category,
                price: req.body.price,
                description: req.body.description,
                payer: req.body.payer,
                timestamp: new Date(),
            },
        };


        let result = await collection.updateOne(query, updates);
        res.status(200).send(result);
    } catch (err) {
        console.error(err.red);
        res.status(500).send("Error updating record");
    }
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };

        const collection = db.collection(process.env.TRANSACTIONS_COLLECTION);
        let result = await collection.deleteOne(query);

        res.send(result).status(200);
    } catch (err) {
        console.error(err.red);
        res.status(500).send("Error deleting record");
    }
});


export default router;