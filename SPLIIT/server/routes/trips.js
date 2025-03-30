import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb"; // This help convert the id from string to ObjectId for the _id.

const router = express.Router();
const collection = db.collection(process.env.TRIPS_COLLECTION);
const users_collection = db.collection(process.env.USERS_COLLECTION);

router.get("/getAllTrips/:user", async (req, res) => {
    try {
        let user = req.params.user;

        // Find trips where the 'users' array contains the given user
        let results = await collection.find({ users: user }).toArray();

        res.status(200).send(results);
    } catch (error) {
        console.error(`Error fetching trips:\n${error}`);
        res.status(500).send("Error retrieving trips");
    }
});


const generateUniqueTripID = async (collection) => {
    const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";
    let allTripIDs = [];
    // get all trip IDs
    try {
        let trips = await collection.find({}, { projection: { tripID: 1, _id: 0 } }).toArray();
        allTripIDs = trips.map(trip => trip.tripID);
    } catch (error) {
        console.log(`Error fetching trip IDs:\n${error}`);
        return null;
    }
    // generate a new trip ID
    let newTripID;
    do {
        newTripID = Array.from({ length: 6 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join("");
    } while (allTripIDs.includes(newTripID));

    return newTripID;
};


router.post("/createtrip", async (req, res) => {
    try {
        // generate a unique trip ID
        const tripID = await generateUniqueTripID(collection)

        const newRecord = {
            tripID: tripID,
            tripName: req.body.tripName,
            tripDescription: req.body.tripDescription,
            foreignCurrency: req.body.foreignCurrency,
            localCurrency: req.body.localCurrency,
            tripImage: req.body.tripImage,
            cities: req.body.cities,
            budget: req.body.budget,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            users: req.body.users,
        };

        const tripresult = await collection.insertOne(newRecord);
        // append the tripID to the user too
        const userresult = await users_collection.updateOne({ username: req.body.users[0] }, { $push: { trips: tripID } });

        res.send({ "generatedTripID": tripID }).status(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record");
    }
});

router.patch("/jointrip/:username", async (req, res) => {
    const { username } = req.params;
    const { tripID } = req.body;

    if (!tripID) {
        return res.status(400).json({ error: "Trip ID is required" });
    }

    try {

        // Fetch user and trip from database
        const user = await users_collection.findOne({ username });
        const trip = await collection.findOne({ tripID });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        // Check if the user is already in the trip
        const userInTrip = trip.users.includes(username);
        const tripInUser = user.trips.includes(tripID);

        if (userInTrip && tripInUser) {
            return res.status(200).json({ message: "You are already in this trip" });
        }

        // Update both user and trip
        await users_collection.updateOne(
            { username },
            { $addToSet: { trips: tripID } }
        );

        await collection.updateOne(
            { tripID },
            { $addToSet: { users: username } }
        );

        return res.status(200).json({ message: "Successfully joined the trip" });
    } catch (error) {
        console.error("Error joining trip:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// returns all trip information
router.get("/tripinfo/:tripID", async (req, res) => {
    try {
        const trip = await collection.findOne({ tripID: req.params.tripID });
        if (!trip) res.send("Not found").status(404);
        else res.send(trip).status(200);
    } catch (error) {
        console.log(`get id error:\n${error}`.red);
        res.send("Not found").status(404);
    }
})

router.patch("/edittrip/:tripID", async (req, res) => {
    try {
        const updateField = req.body.updateField;
        if (updateField === "tripID")
            throw new Error("SOMEONE TRYNA CHANGE SENSITIVE TRIP PARAMS!!")
        const query = { tripID: req.params.tripID };
        const updates = {
            $set: {
                [req.body.updateField]: req.body.value
            },
        };

        let result = await collection.updateOne(query, updates);
    } catch (err) {
        console.error(err.red);
        res.status(500).send("Error updating record");
    }
})

router.get("/test", async (req, res) => {
    res.send("hello from the trips api").status(200);
})

export default router;