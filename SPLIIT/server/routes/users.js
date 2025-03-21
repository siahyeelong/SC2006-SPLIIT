import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const router = express.Router();
const USERS_COLLECTION = process.env.USERS_COLLECTION;
const collection = await db.collection(USERS_COLLECTION);

const generateAccessToken = (user) =>
    jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "12m" });

const generateRefreshToken = (user) =>
    jwt.sign(user, process.env.REFRESH_SECRET, { expiresIn: "34d" });

router.post("/createuser", async (req, res) => {
    const { email, username, password, displayName, favColour } = req.body;

    const existingUser = await collection.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "Username already exists" });

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

    res.json({ accessToken, user: username });
});

router.get("/refresh", async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: "Not authenticated: No refresh token." });
        }

        jwt.verify(refreshToken, process.env.REFRESH_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid refresh token." });
            }

            const { username } = decoded;
            const collection = await db.collection(USERS_COLLECTION);
            const user = await collection.findOne({ username });

            if (!user) {
                return res.status(403).json({ message: "User not found." });
            }

            // Generate a new access token
            const accessToken = generateAccessToken({ username });

            res.json({ accessToken, user: username });
        });
    } catch (error) {
        console.error("Error in /refresh:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});



router.post("/logout", (req, res) => {
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
});

// Test API
router.get("/test", async (req, res) => {
    res.status(200).send("Hello from the users API");
});

export default router;
