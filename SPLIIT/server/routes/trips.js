import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb"; // This help convert the id from string to ObjectId for the _id.

const router = express.Router();

router.get("/getAllTripIDs", async (req, res) => {
    try {
        let collection = await db.collection(process.env.TRIPS_COLLECTION);
        let results = await collection.find({}).toArray();
        res.send(results).status(200);
    } catch (error) {
        console.log(`get error:\n${error}`.red);
    }
});

router.post("/createtrip", async (req, res) => {
    try {
        let newRecord = {
            tripID: req.body.tripID,
            tripName: req.body.tripName,
            tripDescription: req.body.tripDescription,
            foreignCurrency: req.body.foreignCurrency,
            localCurrency: req.body.localCurrency,
            tripImage: req.body.tripImage,
            cities: req.body.citiesStates,
            budget: req.body.budget,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            users: req.body.users,
        };
        let collection = await db.collection(process.env.TRIPS_COLLECTION);
        let result = await collection.insertOne(newRecord);
        res.send(result).status(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record");
    }
});

router.patch("/jointrip/:id", async (req, res) => {
    // TODO: append user to trip
    // TODO: append trip to user
})

router.get("/test", async (req, res) => {
    res.send("hello from the trips api").status(200);
})

export default router;