const express = require("express");
const helmet = require("helmet");

const ProjectRouter = require("./projects/project-router.js");
const logger = require("./middleware/logger.js");

const server = express();

server.use(helmet());
server.use(express.json());

server.use(logger);
server.use("/api/projects", ProjectRouter);

server.get("/", (req, res) => {
  res.send("<h1>Server is working!</h1>");
});

module.exports = server;
