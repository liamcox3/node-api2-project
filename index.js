const express = require("express");

const postsRouter = require("./resources/postsRouter");
// const commentsRouter = require("./resources/commentsRouter");

const server = express();

server.use(express.json());

server.use("/api/posts", postsRouter);

server.listen(8000, () => {});
