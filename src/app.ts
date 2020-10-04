import dotenv from "dotenv";
dotenv.config();
import config from "./config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import errorHandler from "./middleware/error-handler";

const app = express();
const morganOption = config.NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.get("/", (req, res) => {
  res.send("World, Hello!");
});

app.use(errorHandler);

export default app;
