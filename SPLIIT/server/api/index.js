import express from "express";
import cors from "cors";
import records from "../routes/record.js";
import colors from "colors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);

// start the Express server only if in dev mode
const PORT = process.env.PORT || 5050;
if (process.env.NODE_ENV === 'dev') {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`.green.bold);
    });
}

export default app