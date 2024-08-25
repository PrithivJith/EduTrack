import express, { request, response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
import limiter from "./middleware/rateLimiter.js";
import { PORT } from "./config.js";
import { Event } from "./models/eventModel.js";
import eventRoute from "./routes/eventRoute.js";
import studentRoute from "./routes/studentRoute.js"
import cors from "cors";
import loginRoute from "./routes/loginRoute.js"

const app = express();
app.use(express.json());
app.use(limiter)
const mongoDBURL = process.env.mongoDBURL;

app.use(cors());
// app.use(cors({
//     origin:"http://localhost:3000",
//     methods:["GET","POST","PUT","DELETE"]
// }))

app.get("/", (request, response) => {
    console.log(request);
    return response.status(200).send("This is api home.");
});
app.use("/events", eventRoute);
app.use("/students", studentRoute);
app.use("/user", loginRoute);



mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to db.");
        app.listen(PORT, () => {
            console.log("Server is listening...");
        });
    })
    .catch((error) => {
        console.log(error);
        console.log("failed");
    });
