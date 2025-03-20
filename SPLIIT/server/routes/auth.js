import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import db from '../db/connection.js';
import { ObjectId } from 'mongodb';

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google OAuth login
router.post('/google', async (req, res) => {
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
    const usersCollection = await db.collection(process.env.USERS_COLLECTION);
    let user = await usersCollection.findOne({ email });
    
    if (!user) {
      // Create new user
      const newUser = {
        email,
        username: email,
        displayName: name,
        favoriteColor: "#3498db", // Default color
        googleId,
        picture,
        createdAt: new Date(),
      };
      
      const result = await usersCollection.insertOne(newUser);
      user = newUser;
      user._id = result.insertedId;
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Return user data and token
    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        displayName: user.displayName,
        picture: user.picture,
      },
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ message: 'Authentication failed', error: error.message });
  }
});

export default router;