import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import transactions from "../routes/transactions.js";
import trips from "../routes/trips.js"
import users from "../routes/users.js"
import colors from "colors";

import auth from "../routes/auth.js";
import dotenv from "dotenv";
import bodyParser from "body-parser"

dotenv.config();
const app = express();
const frontEndURL = process.env.FRONT_END_URL
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
    origin: `http://${frontEndURL}`,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use("/auth", auth);
app.use("/transactions", transactions);
app.use("/trips", trips);
app.use("/users", users);

// start the Express server only if in dev mode
const PORT = process.env.PORT || 5050;
if (process.env.NODE_ENV === 'dev') {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`.green.bold);
    });
}

export default app