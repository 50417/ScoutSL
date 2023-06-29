require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const port = process.env.API_PORT || 4001;
var mainRoute = "/v1/project";
//API sercurity
app.use(helmet());

//handles CORS error
app.use(cors());

//MongoDB Connection
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);

if (process.env.NODE_ENV !== "production") {
  const mdB = mongoose.connection;
  mdB.on("open", () => {
    console.log("MOngoDB is connected");
  });

  mdB.on("error", (error) => {
    console.log(error);
  });
  //Logger
  app.use(morgan("tiny"));
} else {
  mainRoute = "/api/v1/project";
}
//Set body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Load routers
const projectRouter = require("./src/routers/project.router");

// use routers
app.use(mainRoute, projectRouter);

//Error Handler
const handleError = require("./src/utils/errorHandler");

//middleware Routers
app.use((req, res, next) => {
  const error = new Error("Resource not found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  handleError(error, res);
});

app.listen(port, () => {
  console.log(`API is ready on https://localhost:${port}`);
});
