import express from "express";
import db from "../db/connection.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

const router = express.Router();
const collection = db.collection(process.env.USERS_COLLECTION);
const trips_collection = db.collection(process.env.TRIPS_COLLECTION);

const generateAccessToken = (user) =>
    jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "12m" });

const generateRefreshToken = (user) =>
    jwt.sign(user, process.env.REFRESH_SECRET, { expiresIn: "34d" });

router.post("/createuser", async (req, res) => {
    const { email, username, password, displayName, favColour } = req.body;

    const existingUser = await collection.findOne({ username });
    if (existingUser)
        return res.status(400).json({ message: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    let newRecord = {
        email: email,
        username: username,
        password: hashedPassword,
        displayName: displayName,
        favColour: favColour,
        trips: [],
    };

    let result = await collection.insertOne(newRecord);
    res.status(201).json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await collection.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password)))
        return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken({ username });
    const refreshToken = generateRefreshToken({ username });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 34 * 24 * 60 * 60 * 1000,
    });

    user.password = "";

    res.json({ accessToken, user: user });
});

import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
router.post("/googlelogin", async (req, res) => {
    try {
        const { credential } = req.body;

        // Verify Google token
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name, picture, sub: googleId } = payload;

        // Check if user exists in database
        let user = await collection.findOne({ email });

        if (!user) {
            // Create new user
            const newUser = {
                email: email,
                username: email,
                displayName: name,
                favoriteColor: "#3498db", // Default color
                googleId,
                trips: [],
            };

            const result = await usersCollection.insertOne(newUser);
            user = newUser;
            user._id = result.insertedId;
        }

        // Generate JWT token
        const username = user.username;
        const refreshToken = generateRefreshToken({ username });

        // Set cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 34 * 24 * 60 * 60 * 1000,
        });

        // Return user data and token
        res.status(200).json({
            token: refreshToken,
            user: username,
        });
    } catch (error) {
        console.error("Google auth error:", error);
        res.status(500).json({
            message: "Authentication failed",
            error: error.message,
        });
    }
});

router.get("/refresh", async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res
                .status(401)
                .json({ message: "Not authenticated: No refresh token." });
        }

        jwt.verify(
            refreshToken,
            process.env.REFRESH_SECRET,
            async (err, decoded) => {
                if (err) {
                    return res
                        .status(403)
                        .json({ message: "Invalid refresh token." });
                }

                const { username } = decoded;
                const user = await collection.findOne({ username });

                if (!user) {
                    return res.status(403).json({ message: "User not found." });
                }

                // Generate a new access token
                const accessToken = generateAccessToken({ username });

                user.password = "";
                res.json({ accessToken, user: user });
            }
        );
    } catch (error) {
        console.error("Error in /refresh:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

router.get("/userinfo/:username", async (req, res) => {
    try {
        let query = { username: req.params.username };
        let result = await collection.findOne(query);
        delete result.password;
        delete result._id;
        delete result.email;
        if (!result) res.send("Not found").status(404);
        else res.send(result).status(200);
    } catch (error) {
        console.log(`get id error:\n${error}`.red);
        res.send("Not found").status(404);
    }
});

router.get("/getParticipants/:tripID", async (req, res) => {
    try {
        let tripID = req.params.tripID;

        // Find all users that are in the trip
        const tripInfo = await trips_collection.findOne({ tripID: tripID });
        const usernames = tripInfo?.users || [];
        // Find all information about the user
        let results = await Promise.all(
            usernames?.map(async (username) => {
                let person = await collection.findOne({ username: username });
                // remove sensitive information
                delete person.password;
                delete person._id;
                delete person.email;
                return person;
            })
        );

        res.status(200).send(results);
    } catch (error) {
        console.error(`Error fetching usernames:\n${error}`);
        res.status(500).send("Error retrieving participants");
        res.status(200).send([]);
    }
});

router.patch("/edituser/:username", async (req, res) => {
    try {
        const updateField = req.body.updateField;
        if (updateField === "password" || updateField === "username")
            throw new Error("SOMEONE TRYNA CHANGE SENSITIVE USER PARAMS!!");
        const query = { username: req.params.username };
        const updates = {
            $set: {
                [req.body.updateField]: req.body.value,
            },
        };

        let result = await collection.updateOne(query, updates);
    } catch (err) {
        console.error(err.red);
        res.status(500).send("Error updating record");
    }
});

router.post("/logout", (req, res) => {
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
});

// Test API
router.get("/test", async (req, res) => {
    res.send("Hello from the users API").status(200);
});

export default router;
