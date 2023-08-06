import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import r_user from "./routes/user";
import r_decision from "./routes/decision";
import bodyParser from "body-parser";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const cors = require("cors");

const NODE_CORS_ALLOWED = process.env.NODE_CORS_ALLOWED;
const ARRAY_NODE_CORS_ALLOWED = NODE_CORS_ALLOWED?.split(",");

const corsOptions = {
  origin: ARRAY_NODE_CORS_ALLOWED,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/user", r_user);
app.use("/decision", r_decision);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
