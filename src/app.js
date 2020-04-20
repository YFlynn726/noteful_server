require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const foldersRouter = require("./folders/folders-router");
const notesRouter = require("./notes/notes-router");
//const commentsRouter = require("./comments/comments-router");

const app = express();

app.use(
    morgan(NODE_ENV === "production" ? "tiny" : "common", {
        skip: () => NODE_ENV === "test",
    })
);
app.use(cors());
app.use(helmet());

app.use("/api/folders", foldersRouter);
app.use("/api/notes", notesRouter);
//app.use("/api/comments", commentsRouter);

app.get("/api/folders", foldersRouter);
app.get("/api/folders/:folder_id", foldersRouter);
app.post("/api/folders", foldersRouter);

app.get("/api/notes", notesRouter);
app.get("/api/notes/:note_id", notesRouter);
app.post("/api/notes", notesRouter);

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.use(function errorHandler(error, req, res, next) {
    let response;
    if (NODE_ENV === "production") {
        response = { error: "Server error" };
    } else {
        console.error(error);
        response = { message: error.message, error };
    }
    res.status(500).json(response);
});

module.exports = app;
