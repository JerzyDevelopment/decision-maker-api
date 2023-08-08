"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
//routes
const user_1 = __importDefault(require("./routes/user"));
const decision_1 = __importDefault(require("./routes/decision"));
const option_1 = __importDefault(require("./routes/option"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const cors = require("cors");
const NODE_CORS_ALLOWED = process.env.NODE_CORS_ALLOWED;
const ARRAY_NODE_CORS_ALLOWED = NODE_CORS_ALLOWED === null || NODE_CORS_ALLOWED === void 0 ? void 0 : NODE_CORS_ALLOWED.split(",");
const corsOptions = {
    origin: ARRAY_NODE_CORS_ALLOWED,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use("/user", user_1.default);
app.use("/decision", decision_1.default);
app.use("/option", option_1.default);
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
