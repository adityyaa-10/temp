import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";


import routes from "./router.js";
import cors from "cors"



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // allows us to send json data in the request body


app.use("/api/employees", routes);

// temp route
// app.get("/", (req, res) => {
//     res.send("Server is working")
// })

// connecting db and starting server

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Db connected");
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on PORT ${process.env.PORT}`);

        })
    } catch (error) {
        console.log("DB connection error", error);
    }
}

startServer();