////////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 3000
// pull MONGODB_URL from .env
const { PORT = 3000, URI } = process.env;
// import express
import express, { json } from "express";
// create application object
const app = express();
// import mongoose
import { connect, connection, Schema, model } from "mongoose";
// import middlware
import cors from "cors";
import morgan from "morgan";

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////

// Establish Connection
connect(URI);

// Connection Events
connection
    .on("open", () => console.log("Your are connected to mongoose"))
    .on("close", () => console.log("Your are disconnected from mongoose"))
    .on("error", (error) => console.log(error));


///////////////////////////////
// MODELS
////////////////////////////////
const TodosSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    id: {type: String, required: true},
    completed: {type: Boolean, required: true},
});

const Todos = model("Todos", TodosSchema);

///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(json()); // parse json bodies


///////////////////////////////
// ROUTES
////////////////////////////////

// create a test route
app.get("/", (req, res) => {
    res.send("Todos...");
});

// INDEX ROUTE
app.get("/todos", async (req, res) => {
    try {
        // send all people
        res.json(await Todos.find({}));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

// Update ROUTE
app.put("/todos/:id", async (req, res) => {
    try {
        res.json(
            await Todos.findByIdAndUpdate(req.params.id, req.body, { new: true })
        );
    } catch (error) {
        res.status(400).json(error);
    }
});

// Delete ROUTE
app.delete("/todos/:id", async (req, res) => {
    try {
        res.json(await Todos.findByIdAndRemove(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
});

// CREATE ROUTE
app.post("/todos", async (req, res) => {
    try {
        // send all people
        res.json(await Todos.create(req.body));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

// SHOW ROUTE
app.get("/todos/:id", async (req, res) => {
    try {
        res.json(await Todos.findById(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
});

///////////////////////////////
// LISTENER
////////////////////////////////

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));